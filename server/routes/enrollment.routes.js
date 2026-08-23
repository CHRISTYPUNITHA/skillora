import express from 'express';
import { getMyEnrollments, getLearnCourse, markLessonComplete } from '../controllers/enrollment.controller.js';
import { authendicateToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/my-learning', authendicateToken, getMyEnrollments);
router.get('/learn/:slug', authendicateToken, getLearnCourse);
router.post('/progress', authendicateToken, markLessonComplete);

export default router;
