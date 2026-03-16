import asyncHandler from "../utils/asyncHandler.js";
import ErrorHandler from "../middlewares/errorMiddleWare.js";
import Order from "../models/orderModel.js";

// ----------------- GET USER ORDER -----------------
export const getUserOrders = asyncHandler(async (req, res, next) => {
  // 1. Take User from middelware and check user is authenticated or not
  const user = req.user;
  if (!user) return next(new ErrorHandler("User is not authenticated", 401));

  // 2. get all orders
  const orders = await Order.find({ user: user._id }).sort({ createdAt: -1 });

  // 3. send response
  res.status(200).json({
    success: true,
    count: orders.length,
    orders,
  });
});

// ----------------- PLACE ORDER -----------------
export const placeOrder = asyncHandler(async (req, res, next) => {
  // Take User from middelware and check user is authenticated or not
  const user = req.user;
  if (!user) return next(new ErrorHandler("User is not authenticated", 401));

  const { orderItems, shippingAddress, paymentMethod } = req.body;
  // orderItems not available then throw error
  if (!orderItems || orderItems.length === 0) {
    return next(new ErrorHandler("No Order items", 400));
  }

  // Backend price calculation (BEST PRACTICE)
  const itemsPrice = orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const tax = itemsPrice * 0.18;
  const shipping = itemsPrice > 100 ? 0 : 10;
  const total = itemsPrice + tax + shipping;

  const order = await Order.create({
    user: user._id,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    tax,
    shipping,
    total,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

// export const placeOrder = asyncHandler(async (req, res, next) => {
//   // 1. Take User from middelware and check user is authenticated or not
//   const user = req.user;
//   if (!user) return next(new ErrorHandler("User is not authenticated", 401));

//   // 2. destructure fields
//   const { orderItems, shippingAddress, paymentMethod } = req.body;

//   // 3. orderItems not available then throw error
//   if (!orderItems || orderItems.length === 0) {
//     return next(new ErrorHandler("No Order items", 400));
//   }

//   // 4. Backend price calculation (BEST PRACTICE)
//   const itemsPrice = orderItems.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0,
//   );

//   const taxPrice = itemsPrice * 0.05;
//   const shippingPrice = itemsPrice > 1000 ? 0 : 40;
//   const totalPrice = itemsPrice + taxPrice + shippingPrice;

//   // 5. create order
//   const order = await Order.create({
//     user: user._id,
//     orderItems,
//     shippingAddress,
//     paymentMethod,
//     itemsPrice,
//     taxPrice,
//     shippingPrice,
//     totalPrice,
//   });

//   // 6. send response
//   res.status(201).json({
//     success: true,
//     order,
//   });
// });

// ----------------- GET SINGLE ORDER -----------------
export const getSingleOrder = asyncHandler(async (req, res, next) => {
  // 1. Take User from middelware and check user is authenticated or not
  const user = req.user;
  if (!user) return next(new ErrorHandler("User is not authenticated", 401));

  // 2. get order with full data
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email",
  );

  // 3. if order not found hen throw error
  if (!order) return next(new ErrorHandler("Order not found", 404));

  // 4. if user id not matched then throw error
  if (order.user._id.toString() !== user._id.toString()) {
    return next(new ErrorHandler("Not authorized", 401));
  }

  // 5. send response
  res.status(200).json({
    success: true,
    order,
  });
});

// ----------------- CANCEL ORDER -----------------
export const cancelOrder = asyncHandler(async (req, res, next) => {
  // 1. Take User from middelware and check user is authenticated or not
  const user = req.user;
  if (!user) return next(new ErrorHandler("User is not authenticated", 401));

  // 2. find order with id if order not found then throw error
  const order = await Order.findById(req.params.id);
  if (!order) return next(new ErrorHandler("Order not found", 404));

  if (order.user.toString() !== user._id.toString()) {
    return next(new ErrorHandler("Not authorized", 401));
  }

  // 3. id order deliverd then then throw error
  if (order.isDelivered)
    return next(
      new ErrorHandler("Order already delivered. Cannot cncel.", 400),
    );

  // 4. if order already cancel then throw error
  if (order.isCancelled)
    return next(new ErrorHandler("Order already cancelled", 400));

  // 5. cancel order
  order.isCancelled = true;
  order.cancelledAt = Date.now();

  // 6. update orders
  const updatedOrder = await order.save();

  // 7. send response
  res.status(200).json({
    success: true,
    message: "Order cancelled successfully",
    order: updatedOrder,
  });
});
