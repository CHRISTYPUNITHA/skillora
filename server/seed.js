import { prisma } from './lib/prisma.js';

async function main() {
  console.log('Seeding database...');

  // 1. Create a dummy instructor
  const hashedPassword = 'password123';
  
  const instructor = await prisma.user.upsert({
    where: { email: 'instructor@skillora.com' },
    update: {},
    create: {
      email: 'instructor@skillora.com',
      name: 'Arjun Sharma',
      password: hashedPassword,
      role: 'admin',
      title: 'Senior Full-Stack Engineer · 8 years exp',
      bio: 'Arjun is a senior full-stack engineer with experience at top Indian startups. He has taught over 2,000 students and specialises in building scalable web applications. His courses focus on practical, real-world skills you can use immediately.',
    },
  });

  console.log(`Instructor created with ID: ${instructor.id}`);

  // 2. Insert Full-Stack Foundations Course
  const course1 = await prisma.course.upsert({
    where: { slug: 'full-stack-foundations' },
    update: {},
    create: {
      title: 'Full-Stack Foundations',
      slug: 'full-stack-foundations',
      short_description: 'Learn to build production-ready full-stack applications using React, Node.js, Express and PostgreSQL.',
      description: 'This comprehensive course takes you from zero to production. You\'ll build a complete full-stack application while learning industry best practices. Each module is packed with hands-on exercises and real-world projects that reinforce your learning.',
      category: 'Web Development',
      level: 'Beginner to Intermediate',
      duration: 500, // 8h 20m = 500 mins
      price: 799,
      originalPrice: 1999,
      thumbnail: '🚀',
      accent: 'bg-gradient-thumbnail',
      bestseller: true,
      certificate: true,
      isPublished: true,
      instructor_id: instructor.id,
      includes: [
        'Lifetime access',
        '32 lessons',
        '8h 20m of content',
        'Certificate of completion',
        'Access on mobile & TV',
        'Downloadable resources',
      ],
      whatYouLearn: [
        'Build full-stack applications',
        'PostgreSQL database design',
        'User authentication & authorization',
        'Payment integration',
        'RESTful API development',
        'Deployment to production',
        'React state management',
        'Testing & debugging',
      ],
      modules: {
        create: [
          {
            title: 'Getting Started',
            position: 1,
            lessons: {
              create: [
                { title: 'Introduction', duration: 18, position: 1 },
                { title: 'Project Setup', duration: 12, position: 2 },
                { title: 'React Basics', duration: 22, position: 3 },
              ]
            }
          },
          {
            title: 'Backend Mastery',
            position: 2,
            lessons: {
              create: [
                { title: 'API Development', duration: 19, position: 1 },
                { title: 'Database Design', duration: 18, position: 2 },
                { title: 'Prisma ORM', duration: 22, position: 3 },
              ]
            }
          }
        ]
      }
    }
  });
  console.log(`Course created: ${course1.title}`);

  // 3. Insert React Product Engineering
  const course2 = await prisma.course.upsert({
    where: { slug: 'react-product-engineering' },
    update: {},
    create: {
      title: 'React Product Engineering',
      slug: 'react-product-engineering',
      short_description: 'Master advanced React patterns, state management, performance and testing.',
      description: 'Go beyond the basics and learn how to build React applications at scale. This course covers advanced patterns, performance optimisation, testing strategies and the tools used by senior engineers at top tech companies.',
      category: 'Frontend Development',
      level: 'Intermediate',
      duration: 400, // 6h 40m = 400 mins
      price: 999,
      originalPrice: 2499,
      thumbnail: '⚛️',
      accent: 'bg-gradient-thumbnail-2',
      bestseller: false,
      certificate: true,
      isPublished: true,
      instructor_id: instructor.id,
      includes: [
        'Lifetime access',
        '28 lessons',
        '6h 40m of content',
        'Certificate of completion',
        'Access on mobile & TV',
        'Source code downloads',
      ],
      whatYouLearn: [
        'Advanced React patterns',
        'Custom hooks mastery',
        'Performance optimisation',
        'State management with Zustand',
        'React Query for data fetching',
        'Testing with Vitest & RTL',
        'TypeScript with React',
        'Component library design',
      ],
      modules: {
        create: [
          {
            title: 'Advanced React',
            position: 1,
            lessons: {
              create: [
                { title: 'React Patterns Deep Dive', duration: 22, position: 1 },
                { title: 'Custom Hooks', duration: 18, position: 2 },
                { title: 'State Management', duration: 25, position: 3 },
              ]
            }
          }
        ]
      }
    }
  });
  console.log(`Course created: ${course2.title}`);

  console.log('Seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
