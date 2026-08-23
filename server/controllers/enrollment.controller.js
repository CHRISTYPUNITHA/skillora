import { prisma } from '../lib/prisma.js';

export const getMyEnrollments = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Fetch all active enrollments for the user
    const enrollments = await prisma.enrollment.findMany({
      where: { user_id: userId, status: 'ACTIVE' },
      include: {
        course: {
          include: {
            modules: {
              include: {
                lessons: true,
              },
            },
          },
        },
      },
      orderBy: {
        enrolledAt: 'desc',
      },
    });

    // Fetch all completed lessons for the user
    const completedProgress = await prisma.lesson_progress.findMany({
      where: {
        user_id: userId,
        completed: true,
      },
      include: {
        lesson: {
          include: {
            module: true,
          }
        }
      }
    });

    // We can map completed lessons by course ID to easily look them up
    const completedLessonsByCourse = {};
    completedProgress.forEach(prog => {
      const courseId = prog.lesson.module.course_id;
      if (!completedLessonsByCourse[courseId]) {
        completedLessonsByCourse[courseId] = [];
      }
      completedLessonsByCourse[courseId].push(prog);
    });

    // Format the response for the frontend
    let totalLessonsAcrossAllCourses = 0;
    let totalCompletedLessonsAcrossAllCourses = 0;
    let completedCoursesCount = 0;

    const formattedCourses = enrollments.map(enrollment => {
      const course = enrollment.course;
      
      // Calculate total lessons in this course
      const totalLessons = course.modules.reduce((acc, mod) => acc + mod.lessons.length, 0);
      
      // Get completed lessons for this course
      const completedLessons = completedLessonsByCourse[course.id]?.length || 0;
      
      // Calculate progress percentage
      const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
      
      totalLessonsAcrossAllCourses += totalLessons;
      totalCompletedLessonsAcrossAllCourses += completedLessons;
      
      if (progress === 100) {
        completedCoursesCount++;
      }

      // Determine the "last lesson" or next lesson
      // For simplicity, we'll just show the first module's first lesson, 
      // or "Completed" if progress is 100%
      let lastLessonName = "Getting Started";
      if (progress === 100) {
        lastLessonName = "Course Completed";
      } else if (course.modules.length > 0 && course.modules[0].lessons.length > 0) {
        lastLessonName = course.modules[0].lessons[0].title;
      }

      return {
        id: course.id,
        title: course.title,
        level: course.level,
        progress,
        lessonsCompleted: completedLessons,
        totalLessons,
        duration: `${Math.floor(course.duration / 60)}h ${course.duration % 60}m`,
        thumbnail: course.thumbnail,
        thumbClass: course.accent || 'bg-gray-900',
        lastLesson: lastLessonName,
        slug: course.slug,
      };
    });

    const overallProgress = totalLessonsAcrossAllCourses > 0 
      ? Math.round((totalCompletedLessonsAcrossAllCourses / totalLessonsAcrossAllCourses) * 100) 
      : 0;

    res.status(200).json({
      success: true,
      courses: formattedCourses,
      stats: {
        completedLessons: totalCompletedLessonsAcrossAllCourses,
        totalLessons: totalLessonsAcrossAllCourses,
        certificates: completedCoursesCount,
        overallProgress
      }
    });

  } catch (error) {
    console.error('Error fetching my learning:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getLearnCourse = async (req, res) => {
  try {
    const userId = req.user.id;
    const { slug } = req.params;

    // Check enrollment
    const course = await prisma.course.findFirst({
      where: { OR: [{ id: slug }, { slug }] },
      include: {
        modules: {
          orderBy: { position: 'asc' },
          include: {
            lessons: { orderBy: { position: 'asc' } },
          },
        },
      },
    });

    if (!course) return res.status(404).json({ message: 'Course not found' });

    const enrollment = await prisma.enrollment.findUnique({
      where: { user_id_course_id: { user_id: userId, course_id: course.id } },
    });

    if (!enrollment) return res.status(403).json({ message: 'Not enrolled in this course' });

    // Fetch progress for this user on this course's lessons
    const allLessonIds = course.modules.flatMap(m => m.lessons.map(l => l.id));
    const progressRecords = await prisma.lesson_progress.findMany({
      where: { user_id: userId, lesson_id: { in: allLessonIds } },
    });
    const progressMap = {};
    progressRecords.forEach(p => { progressMap[p.lesson_id] = p; });

    const modulesWithProgress = course.modules.map(mod => ({
      id: mod.id,
      title: mod.title,
      position: mod.position,
      lessons: mod.lessons.map(lesson => ({
        id: lesson.id,
        title: lesson.title,
        duration: lesson.duration,
        position: lesson.position,
        video_url: lesson.video_url,
        isPreview: lesson.isPreview,
        completed: progressMap[lesson.id]?.completed || false,
      })),
    }));

    const totalLessons = allLessonIds.length;
    const completedLessons = progressRecords.filter(p => p.completed).length;

    res.status(200).json({
      success: true,
      course: {
        id: course.id,
        title: course.title,
        slug: course.slug,
        thumbnail: course.thumbnail,
        accent: course.accent,
        modules: modulesWithProgress,
        totalLessons,
        completedLessons,
        progress: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0,
      },
    });
  } catch (error) {
    console.error('Error fetching learn course:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const markLessonComplete = async (req, res) => {
  try {
    const userId = req.user.id;
    const { lessonId, courseId } = req.body;

    if (!lessonId || !courseId) {
      return res.status(400).json({ message: 'lessonId and courseId are required' });
    }

    // Upsert the lesson_progress record
    await prisma.lesson_progress.upsert({
      where: { user_id_lesson_id: { user_id: userId, lesson_id: lessonId } },
      update: { completed: true, completedAt: new Date() },
      create: { user_id: userId, lesson_id: lessonId, completed: true, completedAt: new Date() },
    });

    // Recalculate progress for the enrollment
    const enrollment = await prisma.enrollment.findUnique({
      where: { user_id_course_id: { user_id: userId, course_id: courseId } },
      include: {
        course: {
          include: { modules: { include: { lessons: true } } }
        }
      }
    });

    if (enrollment) {
      const allLessonIds = enrollment.course.modules.flatMap(m => m.lessons.map(l => l.id));
      const completedCount = await prisma.lesson_progress.count({
        where: { user_id: userId, lesson_id: { in: allLessonIds }, completed: true }
      });
      const newProgress = allLessonIds.length > 0
        ? Math.round((completedCount / allLessonIds.length) * 100)
        : 0;

      await prisma.enrollment.update({
        where: { id: enrollment.id },
        data: {
          progressPercent: newProgress,
          status: newProgress === 100 ? 'COMPLETED' : 'ACTIVE',
          completedAt: newProgress === 100 ? new Date() : null,
        }
      });
    }

    res.status(200).json({ success: true, message: 'Lesson marked as complete' });
  } catch (error) {
    console.error('Error marking lesson complete:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
