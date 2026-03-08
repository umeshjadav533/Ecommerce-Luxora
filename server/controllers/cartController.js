import asyncHandler from "../utils/asyncHandler.js";
import ErrorHandler from "../middlewares/errorMiddleWare.js";
import { formatCartResponse } from "../services/cartService.js";
import mongoose from "mongoose";
import Product from "../models/productModel.js";
import calculatePrice from "../utils/calculatePrice.js";
import getPopulatedUser from "../utils/getPopulatedUser.js";
import formatResponse from "../utils/formatResponse.js";

// ----------------- GET ALL CART PRODUCTS -----------------
export const getCartProducts = asyncHandler(async (req, res, next) => {
  // 1. take user from middleware
  const user = req.user;

  // 2. if user not exist or not login then throw error
  if (!user) {
    return next(new ErrorHandler("User not authenticated", 401));
  }

  // 3. get cart full data
  const populatedUser = await getPopulatedUser("cart.product", user._id);
  if (!populatedUser) {
    return next(new ErrorHandler("User not found", 404));
  }

  // 4. check wishlist isEmpty
  if (!populatedUser.cart || populatedUser.cart.length === 0) {
    return res.status(200).json({
      success: true,
      message: "cart is Empty",
    });
  }

  // 5. send response
  res.status(200).json({
    success: true,
    cart: formatResponse(populatedUser.cart || []),
  });
});

// ----------------- ADD TO CART -----------------
export const addToCart = asyncHandler(async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return next(new ErrorHandler("User not authenticated", 401));
  }

  const { id, size, variant, quantity } = req.body;

  if (!id || !quantity) {
    return next(new ErrorHandler("Please provide required fields", 400));
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Invalid product id", 400));
  }

  const product = await Product.findById(id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  let selectedVariant = null;

  if (variant) {
    selectedVariant = product.variants.find(
      (v) => v.color.toLowerCase() === variant.toLowerCase(),
    );

    if (!selectedVariant) {
      return next(new ErrorHandler("Variant not found", 404));
    }
  }

  let selectedSize = null;

  if (size) {
    selectedSize = selectedVariant?.sizes?.find(
      (s) => s.size.toLowerCase() === size.toLowerCase(),
    );

    if (!selectedSize) {
      return next(new ErrorHandler("Size not found", 404));
    }
  }

  const availableStock = selectedSize?.stock || selectedVariant?.stock || 0;

  if (quantity > availableStock) {
    return next(new ErrorHandler("No more stock available", 400));
  }

  const cartItem = user.cart.find((item) => {
    return (
      item.product.toString() === id &&
      (!variant || item.variant?.toLowerCase() === variant.toLowerCase()) &&
      (!size || item.size?.toLowerCase() === size.toLowerCase())
    );
  });

  if (cartItem) {
    if (cartItem.quantity + quantity > availableStock) {
      return next(new ErrorHandler("No more stock available", 400));
    }

    cartItem.quantity += quantity;
  } else {
    user.cart.push({
      product: product._id,
      size: size || null,
      variant: variant || null,
      quantity,
    });
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: "Product added to cart",
  });
});

// ----------------- UPDATE CART PRODUCT -----------------
export const updateCartProduct = asyncHandler(async (req, res, next) => {
  // 1. get user
  const user = req.user;
  if (!user) {
    return next(new ErrorHandler("User not authenticated", 401));
  }

  // 2. destructure
  const { id, size, variant, type } = req.body;

  // 3. validation
  if (!id || !size || !variant || !type) {
    return next(new ErrorHandler("Please provide all fields", 400));
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Product id is not valid", 400));
  }

  if (!["increment", "decrement"].includes(type.toLowerCase())) {
    return next(new ErrorHandler("Invalid update type", 400));
  }

  // 4. find product
  const product = await Product.findById(id);
  if (!product) {
    return next(new ErrorHandler("Product not available", 404));
  }

  // 5. find cart item
  const cartItem = user.cart.find(
    (item) =>
      item.product.toString() === id &&
      item.size.toLowerCase() === size.toLowerCase() &&
      item.variant.toLowerCase() === variant.toLowerCase(),
  );

  if (!cartItem) {
    return next(new ErrorHandler("Cart item not found", 404));
  }

  // 6. find variant
  const selectedVariant = product.variants.find(
    (v) => v.color.toLowerCase() === variant.toLowerCase(),
  );

  if (!selectedVariant) {
    return next(new ErrorHandler("Variant not found", 404));
  }

  // 7. find size
  const selectedSize = selectedVariant.sizes?.find(
    (s) => s.size.toLowerCase() === size.toLowerCase(),
  );

  if (!selectedSize) {
    return next(new ErrorHandler("Size not found", 404));
  }

  const stock = selectedSize.stock || selectedVariant.stock || 0;

  // 8. increment
  if (type.toLowerCase() === "increment") {
    if (cartItem.quantity + 1 > stock) {
      return next(new ErrorHandler("Stock limit reached", 400));
    }

    cartItem.quantity += 1;
  }

  // 9. decrement
  if (type.toLowerCase() === "decrement") {
    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
    } else {
      user.cart = user.cart.filter(
        (item) =>
          !(
            item.product.toString() === id &&
            item.size.toLowerCase() === size.toLowerCase() &&
            item.variant.toLowerCase() === variant.toLowerCase()
          ),
      );
    }
  }

  // 10. save
  await user.save();

  // 11. populate cart
  const updatedUser = await getPopulatedUser("cart.product", user._id);

  // 12. response
  res.status(200).json({
    success: true,
    cart: formatResponse(updatedUser.cart),
  });
});

// ----------------- REMOVE CART PRODUCT -----------------
export const removeFromCart = asyncHandler(async (req, res, next) => {
  // 1. check user
  const user = req.user;
  if (!user) {
    return next(new ErrorHandler("User not authenticated", 401));
  }

  // 2. destructure
  const { id, size, variant } = req.body;

  // 3. validation
  if (!id) {
    return next(new ErrorHandler("Product id is required", 400));
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Invalid product id", 400));
  }

  // 4. find cart item
  const cartItem = user.cart.find(
    (item) =>
      item.product.toString() === id &&
      item?.size?.toLowerCase() === size?.toLowerCase() &&
      item?.variant?.toLowerCase() === variant?.toLowerCase(),
  );

  if (!cartItem) {
    return next(new ErrorHandler("Cart item not found", 404));
  }

  // 5. remove item
  user.cart = user.cart.filter(
    (item) =>
      !(
        item.product.toString() === id &&
        item?.size?.toLowerCase() === size?.toLowerCase() &&
        item?.variant?.toLowerCase() === variant?.toLowerCase()
      ),
  );

  // 6. save user
  await user.save();

  // 7. populate updated cart
  const updatedUser = await getPopulatedUser("cart.product", user._id);

  // 8. response
  res.status(200).json({
    success: true,
    message: "Item removed from cart",
    cart: formatResponse(updatedUser.cart),
  });
});

// ----------------- GET CART SUMMARY -----------------
export const cartSummary = asyncHandler(async (req, res, next) => {
  const user = req.user;

  if (!user) {
    return next(new ErrorHandler("User not authenticated", 401));
  }

  const populatedUser = await getPopulatedUser("cart.product", user._id);

  if (!populatedUser) {
    return next(new ErrorHandler("User not found", 404));
  }

  let subtotal = 0;
  let discountAmount = 0;
  let totalItems = 0;

  populatedUser.cart.forEach((item) => {
    if (!item.product) return;

    const product = item.product;

    // find variant (color)
    const variantObj = product.variants?.find(
      (v) => v.color.toLowerCase() === item.variant.toLowerCase()
    );

    if (!variantObj) return;

    const mrp = variantObj.mrpPrice || 0;
    const discountPercent = variantObj.discountPercentage || 0;

    const discount = (mrp * discountPercent) / 100;

    subtotal += mrp * item.quantity;
    discountAmount += discount * item.quantity;

    totalItems += item.quantity;
  });

  // shipping logic
  let shipping = 0;

  if (totalItems > 0) {
    shipping = subtotal >= 100 ? 0 : 40;
  }

  const grandTotal = subtotal - discountAmount + shipping;

  res.status(200).json({
    success: true,
    summary: {
      subtotal: Number(subtotal.toFixed(2)),
      discount: Number(discountAmount.toFixed(2)),
      shipping,
      grandTotal: Number(grandTotal.toFixed(2)),
      totalItems,
    },
  });
});
