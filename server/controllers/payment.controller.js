import Razorpay from 'razorpay';
import crypto from 'crypto';
import { prisma } from '../lib/prisma.js';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'dummy_key',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret',
});

export const createOrder = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    if (!courseId) {
      return res.status(400).json({ message: 'Course ID is required' });
    }

    // Fetch the course to get the price
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const amountInPaise = Math.round(Number(course.price) * 100);

    // Create a Razorpay order
    const options = {
      amount: amountInPaise,
      currency: 'INR',
      receipt: `receipt_order_${Date.now()}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    if (!razorpayOrder) {
      return res.status(500).json({ message: 'Error creating Razorpay order' });
    }

    // Create an order record in our database
    const order = await prisma.order.create({
      data: {
        user_id: userId,
        course_id: course.id,
        amount: course.price,
        currency: 'INR',
        status: 'PENDING',
        razorpay_order_id: razorpayOrder.id,
      },
    });

    res.status(200).json({
      success: true,
      message: 'Order created successfully',
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
    });
  } catch (error) {
    console.error('Error in createOrder:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;
    const userId = req.user.id;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ message: 'Missing payment verification details' });
    }

    // Verify the signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'dummy_secret')
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return res.status(400).json({ message: 'Payment verification failed' });
    }

    // Find the order in our database
    const order = await prisma.order.findUnique({
      where: { razorpay_order_id },
      include: { course: true }
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update order status and create payment record
    await prisma.$transaction([
      prisma.order.update({
        where: { id: order.id },
        data: { status: 'PAID' },
      }),
      prisma.payment.create({
        data: {
          order_id: order.id,
          razorpay_payment_id,
          razorpay_signature,
          amount: order.amount,
          currency: order.currency,
          status: 'SUCCESS',
        },
      }),
      // Create an active enrollment for the user
      prisma.enrollment.create({
        data: {
          user_id: userId,
          course_id: order.course_id,
          status: 'ACTIVE',
          progressPercent: 0,
        },
      }),
    ]);

    res.status(200).json({ success: true, message: 'Payment verified and enrollment successful' });
  } catch (error) {
    console.error('Error in verifyPayment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
