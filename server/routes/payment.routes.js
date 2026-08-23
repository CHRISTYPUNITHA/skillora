import express from 'express';
import { createOrder, verifyPayment } from '../controllers/payment.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/create-order', authenticateToken, createOrder);
router.post('/verify', authenticateToken, verifyPayment);

export default router;
