import express from 'express';
import { registerUser, loginUser, currentUser, logoutUser } from '../controllers/auth.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', authenticateToken, currentUser);
router.post('/logout', authenticateToken, logoutUser);

export default router;