import razorpay from "../config/razorpay.js";
import ErrorHandler from "../middlewares/errorMiddleWare.js";
import asyncHandler from "../utils/asyncHandler.js";
import crypto from "crypto";
import Order from "../models/orderModel.js";

export const createPaymentOrder = asyncHandler(async (req, res, next) => {
  // 1. Take User from middelware and check user is authenticated or not
  const user = req.user;
  if (!user) return next(new ErrorHandler("User is not authenticated", 401));

  // 2. destructure amount
  const { amount } = req.body;

  // 3. razorpay options
  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  // 4. create razorpay order
  const order = await razorpay.orders.create(options);

  // 5. send response
  res.status(200).json({
    success: true,
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
  });
});

export const verifyPayment = asyncHandler(async (req, res, next) => {
  // 1. Take User from middelware and check user is authenticated or not
  const user = req.user;
  if (!user) return next(new ErrorHandler("User is not authenticated", 401));

  // 2. destructure all fields and check any field is not empty or space only
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    orderId,
  } = req.body;
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return next(new ErrorHandler("Payment details missing", 400));
  }

  // 3. generate signature in crypto and check signature match or not
  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");
  if (generated_signature !== razorpay_signature) {
    return next(new ErrorHandler("Invalid payment signature", 400));
  }

  // 4. find order in database iforder not available then throw error
  const order = await Order.findById(orderId);
  if (!order) return next(new ErrorHandler("Order not found", 404));

  // 5. update order
  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentInfo = {
    id: razorpay_payment_id,
    status: "Paid",
  };
  await order.save();

  // 6. send response
  res.status(200).json({
    success: true,
    message: "Payment verified successfully",
  });
});

export const paymentWebhook = asyncHandler(async (req, res, next) => {
  // 1. Take User from middelware and check user is authenticated or not
  const user = req.user;
  if (!user) return next(new ErrorHandler("User is not authenticated", 401));

  const webHookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = req.headers["x-razorpay-signature"];
  const body = JSON.stringify(req.body);

  const expectedSignature = crypto
    .createHmac("sha256", webHookSecret)
    .update(body)
    .digest("hex");

  if (signature !== expectedSignature) {
    return next(new ErrorHandler("Invalid webhook signature", 400));
  }

  const event = req.body.event;

  if (event === "payment.captured") {
    const payment = req.body.payload.payment.entity;
    const razorpayPaymentId = payment.id;
    const order = await Order.findOne({
      "paymentInfo.id": razorpayPaymentId,
    });
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentInfo.status = "Paid";
      await order.save();
    }
  }
  res.status(200).json({
    received: true,
  });
});
