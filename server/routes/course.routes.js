import express from "express";
import {createCourse,getCourses,getCourseById} from '../controllers/course.controller.js'

const router = express.Router();

router.post('/create', createCourse);
router.get('/', getCourses);
router.get('/:id', getCourseById);


export default router;
