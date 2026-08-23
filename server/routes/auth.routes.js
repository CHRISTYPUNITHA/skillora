import express from 'express';
import { registerUser, loginUser, currentUser, logoutUser } from '../controllers/auth.controller.js';
import { authendicateToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', authendicateToken, currentUser);
router.post('/logout', authendicateToken, logoutUser);

export default router;