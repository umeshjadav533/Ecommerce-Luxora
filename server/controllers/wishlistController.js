import mongoose from "mongoose";
import ErrorHandler from "../middlewares/errorMiddleWare.js";
import asyncHandler from "../utils/asyncHandler.js";
import Product from "../models/productModel.js";
import { getPopulatedWishlist } from "../services/wishlistService.js";
import formatResponse from "../utils/formatResponse.js";
import getPopulatedUser from "../utils/getPopulatedUser.js";

// ----------------- GET ALL WISHLIST PRODUCTS -----------------
export const getWishlistItems = asyncHandler(async (req, res, next) => {
  // 1. Take user from middleware and check user is authenticated
  const user = req.user;
  if (!user) return next(new ErrorHandler("User is not authenticated", 401));

  // 2. get all wishlist items
  const populatedUser = await getPopulatedWishlist(user._id);
  if (!populatedUser) {
    return next(new ErrorHandler("User not found", 404));
  }

  // 3. check wishlist isEmpty
  if (!populatedUser.wishlist || populatedUser.wishlist.length === 0) {
    return res.status(200).json({
      success: true,
      message: "Wishlist is Empty"
    });
  }

  // 4. send response
  res.status(200).json({
    success: true,
    wishlist: formatResponse(populatedUser.wishlist || []),
  });
});

// ----------------- ADD TO WISHLIST -----------------
export const addToWishlist = asyncHandler(async (req, res, next) => {
  // 1. Take user from middleware and check user is authenticated
  const user = req.user;
  if (!user) return next(new ErrorHandler("User is not authenticated", 401));

  // 2. destructure fields
  const { id, size, variant } = req.body;

  // 3. check field is available or not or space-only
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("product id is Invalid", 400));
  }

  // 4. find product in database
  const product = await Product.findById(id);
  if (!product) return next(new ErrorHandler("Product not found", 404));

  // 5. if variant exist then select variant
  if (variant) {
    const variantExist = product?.variants?.find(
      (v) => v?.color?.name?.toLowerCase() === variant?.toLowerCase(),
    );

    if (!variantExist) return next(new ErrorHandler("Variant not found", 404));
  }

  // 6. if size exist then select size
  if (size) {
    const sizeExist = product?.variants[0]?.sizes?.find(
      (s) => s?.size?.toLowerCase() === size?.toLowerCase(),
    );

    if (!sizeExist) return next(new ErrorHandler("Size not found", 404));
  }

  // 7. wishlist item exist or not
  const wishlistItem = user.wishlist.find((item) => {
    return (
      item.product.toString() === id &&
      (!size || item.size.toLowerCase() === size.toLowerCase()) &&
      (!variant || item.variant.toLowerCase() === variant.toLowerCase())
    );
  });

  // 8. if wishlist item exist then remove from wishlist
  if (wishlistItem) {
    user.wishlist = user.wishlist.filter(
      (item) =>
        !(
          item.product.toString() === id &&
          (!size || item.size.toLowerCase() === size.toLowerCase()) &&
          (!variant || item.variant.toLowerCase() === variant.toLowerCase())
        ),
    );
  } else {
    user.wishlist.push({
      product: id,
      size: size || null,
      variant: variant || null,
    });
  }

  // 9.save user
  await user.save();

  // 10. send response
  res.status(200).json({
    success: true,
    message: "Product added to wishlist",
  });
});

// ----------------- REMOVE WISHLIST PRODUCT -----------------
export const removeFromWishlist = asyncHandler(async (req, res, next) => {
  // 1. Take user from middleware and check user is authenticated
  const user = req.user;
  if (!user) return next(new ErrorHandler("User is not authenticated", 401));

  // 2. destructure fields
  const { id, size, variant } = req.body;

  // 3. check id is valid and another field is space-only and not available
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("product id is not valid", 400));
  }

  // 4. find product in database
  const product = await Product.findById(id);
  if (!product) return next(new ErrorHandler("Product not found", 404));

  // 5. wishlist item exist or not
  const wishlistItem = user.wishlist.find((item) => {
    return (
      item.product.toString() === id &&
      (!size || item.size.toLowerCase() === size.toLowerCase()) &&
      (!variant || item.variant.toLowerCase() === variant.toLowerCase())
    );
  });

  // 6. if wishlist item not exist then throw error
  if(!wishlistItem) return next(new ErrorHandler("Wishlist item not exist", 400));

  // 7. is wishlist item is exist then remove from wishlist
  user.wishlist = user.wishlist.filter(
    (item) =>
      !(
        item.product._id.toString() === id &&
        item.size.toLowerCase() === size.toLowerCase() &&
        item.variant.toLowerCase() === variant.toLowerCase()
      ),
  );

  // 8. save user
  await user.save();

  // 9. update wishlist item
  const updatedUser = await getPopulatedUser("wishlist.product", user._id);

  // 10. send response
    res.status(200).json({
      success: true,
      message: "Item removed from wishlist",
      cart: formatResponse(updatedUser.cart),
    });
});
