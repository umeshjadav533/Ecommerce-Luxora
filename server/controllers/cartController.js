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
  // 1. take user from middleware if not authenticated user then throw error
  const user = req.user;
  if (!user) {
    return next(new ErrorHandler("User not authenticated", 401));
  }

  // 2. destructure all fields
  const { id, size, variant, quantity } = req.body;

  // 3. check any field is not empty or mongoose id is valid
  if (!id || !quantity) {
    return next(new ErrorHandler("Please provide required fields", 400));
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Invalid product id", 400));
  }

  // 4. find product in database if product not find then throw error
  const product = await Product.findById(id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // 5. if variant exist then select variant
  if (variant) {
    const variantExist = product.variants?.find(
      (v) => v?.color?.name?.toLowerCase() === variant?.toLowerCase(),
    );

    if (!variantExist) {
      return next(new ErrorHandler("Variant not found", 400));
    }
  }

  // 6. if size exist then select size
  if (size) {
    const sizeExist = product?.variants[0]?.sizes?.find(
      (s) => s?.size?.toLowerCase() === size?.toLowerCase(),
    );

    if (!sizeExist) return next(new ErrorHandler("Size not found", 404));
  }

  // 7. quantity not greater than stock
  const selectedVariant = product.variants?.find(
    (v) => v?.color?.name?.toLowerCase() === variant?.toLowerCase(),
  );

  let availableStock =
    selectedVariant?.sizes?.find(
      (s) => s?.size?.toLowerCase() === size?.toLowerCase(),
    )?.stock ||
    selectedVariant?.stock ||
    0;

  if (quantity > availableStock) {
    return next(new ErrorHandler("No more stock available", 400));
  }

  // 8. cart item exist or not
  const cartItem = user.cart.find((item) => {
    return (
      item.product.toString() === id &&
      (!variant || item.variant?.toLowerCase() === variant.toLowerCase()) &&
      (!size || item.size?.toLowerCase() === size.toLowerCase())
    );
  });

  // 9. if cart item exist then quantity +1
  if (cartItem) {
    if (cartItem.quantity + quantity > availableStock) {
      return next(new ErrorHandler("No more stock available", 400));
    }
    cartItem.quantity += quantity;
  } else {
    // 10. if cart item not exist then add to cart
    user.cart.push({
      product: product._id,
      size: size || null,
      variant: variant || null,
      quantity,
    });
  }

  // 11. save user
  await user.save();

  // 12. send response
  res.status(200).json({
    success: true,
    message: "Product added to cart",
  });
});

// ----------------- UPDATE CART PRODUCT -----------------
export const updateCartProduct = asyncHandler(async (req, res, next) => {
  // 1. take user from middleware if not authenticated user then throw error
  const user = req.user;
  if (!user) {
    return next(new ErrorHandler("User not authenticated", 401));
  }

  // 2. destructure all fields
  const { id, size, variant, type } = req.body;

  // 3. check any field is not empty
  if (!size || !variant) {
    return next(new ErrorHandler("Please provide all fields", 400));
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("product id is not valid", 400));
  }

  // 4. check type is available
  if (!["increment", "decrement"].includes(type)) {
    return next("Invalid Update type", 400);
  }

  // 5. find product
  const product = await Product.findById(id);
  if (!product) return next("product not available", 400);

  // 6. find cart item in user cart
  const cartItem = user.cart.find((item) => {
    return (
      item.product._id.toString() === id &&
      item.size.toLowerCase() === size.toLowerCase() &&
      item.variant.toLowerCase() === variant.toLowerCase()
    );
  });

  // 7. if cart item not found then throw error
  if (!cartItem) {
    return next(new ErrorHandler("Cart item not found", 404));
  }

  // 8. type === increment then +1
  if (type.toLowerCase() === "increment") {
    // quantity is not greater than stock if greter than stock then throw error
    const selectVariant = product.variants?.find(
      (v) => v.color?.name.toLowerCase() === variant.toLowerCase(),
    );

    const stock =
      selectVariant?.sizes?.find(
        (s) => s.size.toLowerCase() === size.toLowerCase(),
      )?.stock ||
      selectVariant?.stock ||
      0;

    if (cartItem.quantity + 1 > stock) {
      return next(new ErrorHandler("Stock limit reached", 400));
    }
    // quantity + 1
    cartItem.quantity += 1;
  }

  // 9. decrement quantity
  if (type.toLowerCase() === "decrement") {
    // cart quantity is greter then 1 then -1
    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
    } else {
      // if cart quantity less than 1 then removed from cart
      user.cart = user.cart.filter(
        (item) =>
          !(
            item.product._id.toString() === id &&
            item.size.toLowerCase() === size.toLowerCase() &&
            item.variant.toLowerCase() === variant.toLowerCase()
          ),
      );
    }
  }

  // 10. save user
  await user.save();

  // 11. populate user cart
  const updatedUser = await getPopulatedUser("cart.product", user._id);

  // 12. send response
  res.status(200).json({
    success: true,
    cart: formatResponse(updatedUser.cart),
  });
});

// ----------------- REMOVE CART PRODUCT -----------------
export const removeFromCart = asyncHandler(async (req, res, next) => {
  // 1. take user from middelware and check user is authenticated
  const user = req.user;
  if (!user) {
    return next(new ErrorHandler("User not authenticated", 401));
  }

  // 2. destructure all fields
  const { id, size, variant } = req.body;

  // 3. validation id is not available
  if (!id) return next(new ErrorHandler("id is required", 400));

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("id is invalid", 400));
  }

  // 4. find product
  const product = await Product.findById(id);
  if (!product) return next(new ErrorHandler("product not found", 404));

  // 5. find cart item in user cart
  const cartItem = user.cart.find((item) => {
    return (
      item.product._id.toString() === id &&
      item.size.toLowerCase() === size.toLowerCase() &&
      item.variant.toLowerCase() === variant.toLowerCase()
    );
  });
  
  // 6. cart item not exist then throw error
  if(!cartItem) return next(new ErrorHandler("cart item not exist", 400));

  // 7. cart item is exist then removed from cart
  user.cart = user.cart.filter(
    (item) =>
      !(
        item.product._id.toString() === id &&
        item.size.toLowerCase() === size.toLowerCase() &&
        item.variant.toLowerCase() === variant.toLowerCase()
      ),
  );

  // 8. save user
  await user.save();

  // 9. update user with full cart data
  const updatedUser = await getPopulatedUser("cart.product", user._id);

  // 10. send response
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

  populatedUser.cart.forEach((item) => {
    if (!item.product) return;

    const product = item.product;

    const mrp = product.mrpPrice || 0;
    const discountPercent = product.discountPercentage || 0;

    const productDiscount = (mrp * discountPercent) / 100;

    subtotal += mrp * item.quantity;
    discountAmount += productDiscount * item.quantity;
  });

  // Shipping Logic
  const shipping = subtotal >= 100 ? 0 : 40;

  // Grand Total Calculation
  const grandTotal = subtotal - discountAmount + shipping;

  res.status(200).json({
    success: true,
    data: {
      summary: {
        subtotal: Number(subtotal.toFixed(2)),
        discount: Number(discountAmount.toFixed(2)),
        shipping,
        grandTotal: Number(grandTotal.toFixed(2)),
        totalItems: populatedUser.cart.reduce(
          (acc, item) => acc + item.quantity,
          0,
        ),
      },
    },
  });
});
