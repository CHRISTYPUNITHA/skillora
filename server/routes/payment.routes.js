import express from 'express';
import { createOrder, verifyPayment } from '../controllers/payment.controller.js';
import {authendicateToken} from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/create-order', authendicateToken, createOrder);
router.post('/verify', authendicateToken, verifyPayment);

export default router;
