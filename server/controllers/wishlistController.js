import mongoose from "mongoose";
import ErrorHandler from "../middlewares/errorMiddleWare.js";
import asyncHandler from "../utils/asyncHandler.js";
import Product from "../models/productModel.js";
import { getPopulatedWishlist } from "../services/wishlistService.js";
import formatResponse from "../utils/formatResponse.js";
import getPopulatedUser from "../utils/getPopulatedUser.js";

// ----------------- GET ALL WISHLIST PRODUCTS -----------------
export const getWishlistItems = asyncHandler(async (req, res, next) => {
  // 1. check authentication
  const user = req.user;
  if (!user) {
    return next(new ErrorHandler("User is not authenticated", 401));
  }

  // 2. get populated wishlist
  const populatedUser = await getPopulatedWishlist(user._id);

  if (!populatedUser) {
    return next(new ErrorHandler("User not found", 404));
  }

  const wishlist = populatedUser.wishlist || [];

  // 3. if wishlist empty
  if (wishlist.length === 0) {
    return res.status(200).json({
      success: true,
      message: "Wishlist is empty",
      wishlist: [],
    });
  }

  // 4. send response
  res.status(200).json({
    success: true,
    products: formatResponse(wishlist),
  });
});

// ----------------- ADD TO WISHLIST -----------------
export const addToWishlist = asyncHandler(async (req, res, next) => {
  // 1. authentication check
  const user = req.user;
  if (!user) return next(new ErrorHandler("User is not authenticated", 401));

  // 2. destructure
  const { id, size, variant } = req.body;

  // 3. validate product id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Product id is invalid", 400));
  }

  // 4. find product
  const product = await Product.findById(id);
  if (!product) return next(new ErrorHandler("Product not found", 404));

  // 5. find selected variant
  let selectedVariant = null;

  if (variant) {
    selectedVariant = product?.variants?.find(
      (v) => v?.color?.toLowerCase() === variant?.toLowerCase()
    );

    if (!selectedVariant) {
      return next(new ErrorHandler("Variant not found", 404));
    }
  }

  // 6. check size inside selected variant
  if (size && selectedVariant) {
    const sizeExist = selectedVariant?.sizes?.find(
      (s) => s?.size?.toLowerCase() === size?.toLowerCase()
    );

    if (!sizeExist) {
      return next(new ErrorHandler("Size not found", 404));
    }
  }

  // 7. check wishlist item exist
  const wishlistItem = user.wishlist.find(
    (item) =>
      item.product.toString() === id &&
      (!size || item?.size?.toLowerCase() === size?.toLowerCase()) &&
      (!variant || item?.variant?.toLowerCase() === variant?.toLowerCase())
  );

  // 8. toggle wishlist
  if (wishlistItem) {
    user.wishlist = user.wishlist.filter(
      (item) =>
        !(
          item.product.toString() === id &&
          (!size || item?.size?.toLowerCase() === size?.toLowerCase()) &&
          (!variant || item?.variant?.toLowerCase() === variant?.toLowerCase())
        )
    );
  } else {
    user.wishlist.push({
      product: id,
      size: size || null,
      variant: variant || null,
    });
  }

  // 9. save
  await user.save();

  // Populate cart before returning
  const updatedUser = await getPopulatedUser("wishlist.product", user._id);

  // 10. response
  res.status(200).json({
    success: true,
    products: formatResponse(updatedUser.wishlist),
    message: wishlistItem
      ? "Product removed from wishlist"
      : "Product added to wishlist",
  });
});

// ----------------- REMOVE WISHLIST PRODUCT -----------------
export const removeFromWishlist = asyncHandler(async (req, res, next) => {
  // 1. check authentication
  const user = req.user;
  if (!user) {
    return next(new ErrorHandler("User is not authenticated", 401));
  }

  // 2. destructure fields
  const { id, size, variant } = req.body;

  // 3. validate product id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Product id is not valid", 400));
  }

  // 4. check wishlist item exist
  const wishlistItem = user.wishlist.find(
    (item) =>
      item.product.toString() === id &&
      (!size || item?.size?.toLowerCase() === size?.toLowerCase()) &&
      (!variant || item?.variant?.toLowerCase() === variant?.toLowerCase())
  );

  if (!wishlistItem) {
    return next(new ErrorHandler("Wishlist item not exist", 404));
  }

  // 5. remove item
  user.wishlist = user.wishlist.filter(
    (item) =>
      !(
        item.product.toString() === id &&
        (!size || item?.size?.toLowerCase() === size?.toLowerCase()) &&
        (!variant || item?.variant?.toLowerCase() === variant?.toLowerCase())
      )
  );

  // 6. save user
  await user.save();

  // 7. get updated wishlist
  const updatedUser = await getPopulatedUser("wishlist.product", user._id);

  // 8. send response
  res.status(200).json({
    success: true,
    message: "Item removed from wishlist",
    products: formatResponse(updatedUser.wishlist),
  });
});
