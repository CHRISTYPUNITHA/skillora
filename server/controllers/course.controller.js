import {prisma} from '../lib/prisma.js';

export const createCourse = async (req, res) => {
    try{
        const {title,slug,short_description,description,category,level,duration,price,thumbnail,accent,isPublished} = req.body;
        const course = await prisma.course.create({
            data: {
                title,
                slug,
                short_description,
                description,
                category,
                level,
                duration,
                price,
                thumbnail,
                accent,
                isPublished
            }
        });
        res.status(201).json({ success: true, course });
    } catch (error) {
        console.error('Error creating course:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getCourses = async (req, res) => {
    try{
        const courses = await prisma.course.findMany();
        res.status(200).json({ success: true, courses });
    }catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getCourseById = async (req, res) => {
    try{
        const  {id}  = req.params
        if (!id) {
            return res.status(400).json({ message: 'Course id is required' });
        }

        const course = await prisma.course.findUnique({
            where: { id: String(id) }
        });

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(200).json({ success: true, course });
    }catch (error) {
        console.error('Error fetching course:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}