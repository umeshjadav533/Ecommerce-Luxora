import express from 'express'
import isAuthenticated from '../middlewares/authMiddleware.js';
import { createPaymentOrder, verifyPayment, paymentWebhook } from '../controllers/paymentController';

const paymentRouter = express.Router();

// 1. Create Razorpay Order
paymentRouter.post("/create-order", isAuthenticated, createPaymentOrder);
// 2. Verify Payment After Success
paymentRouter.post("/verify", isAuthenticated, verifyPayment);
// 3. Razorpay Webhook (No Auth Middleware)
paymentRouter.post("/webhook", isAuthenticated, paymentWebhook);

export default paymentRouter;