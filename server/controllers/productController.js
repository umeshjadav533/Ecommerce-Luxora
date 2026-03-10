import Product from "../models/productModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorHandler from "../middlewares/errorMiddleWare.js";
import mongoose from "mongoose";

// ----------------- GET ALL PRODUCTS AND FILTERED PRODUCTS -----------------
export const getAllProducts = asyncHandler(async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return next(new ErrorHandler("User not authenticated", 401));
  }

  const { limit, query = "" } = req.query;

  let filter = {};

  if (query.trim() !== "") {
    const search = query.trim();

    filter = {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },

        // exact match for category
        { category: { $regex: `^${search}$`, $options: "i" } },

        // exact match for subCategory
        { subCategory: { $regex: `^${search}$`, $options: "i" } },
      ],
    };
  }

  let productQuery = Product.find(filter).sort({ createdAt: -1 });

  // apply limit only if valid
  if (limit && !isNaN(limit)) {
    productQuery = productQuery.limit(Number(limit));
  }

  const products = await productQuery;

  res.status(200).json({
    success: true,
    totalProducts: products.length,
    products,
  });
});

export const getRelatedProducts = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { limit = 8 } = req.query;

  const product = await Product.findById(id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const relatedProducts = await Product.find({
    _id: { $ne: new mongoose.Types.ObjectId(id) }, // current product exclude
    $or: [
      { category: product.category },
      { subCategory: product.subCategory },
      { tags: { $in: product.tags } }
    ]
  })
    .limit(Number(limit))
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    totalProducts: relatedProducts.length,
    products: relatedProducts,
  });
});

// ----------------- GET PRODUCT BY ID -----------------
export const getProductById = asyncHandler(async (req, res, next) => {
  // 1. take user from middleware if user not authenticated then throe error
  const user = req.user;
  if (!user) {
    return next(new ErrorHandler("User not authenticated", 401));
  }

  // 2. take id from req.params
  const { id } = req.params;

  // 3. validate Object id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Invalid product id", 400));
  }

  // 4. find product with id
  const product = await Product.findById(id);

  // 5. if product not find then throw error
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // 6. send response
  res.status(200).json({
    success: true,
    product,
  });
});

// ----------------- GET PRODUCT BY CATEGORY -----------------
export const getProductsForCategoryPage = asyncHandler(
  async (req, res, next) => {
    // 1. take user from middleware if user not authenticated then throe error
    const user = req.user;
    if (!user) {
      return next(new ErrorHandler("User not authenticated", 401));
    }

    // 2. take category from req.params
    const { category } = req.params;

    // 3. if category not available then throw error
    if (!category || category.trim() === "")
      return next(new ErrorHandler("Category is required", 400));

    // 4. get product with category
    const products = await Product.find({ category: category.toLowerCase() });

    // 5. if product not found or product length === 0
    if (!products || products.length === 0) {
      return next(new ErrorHandler("No products found in this category", 404));
    }

    // 6. if products found then send response
    res.status(200).json({
      success: true,
      products,
    });
  },
);

// ----------------- GET PRODUCTS BY TAG -----------------
export const getProductsByTag = asyncHandler(async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return next(new ErrorHandler("User not authenticated", 401));
  }

  const { tag, category } = req.body;

  let query = { tags: tag };
  if (category) {
    query.category = category;
  }

  if (!tag?.trim() === "") {
    return next(new ErrorHandler("Tag is required", 400));
  }

  const products = await Product.find(query).sort({ createdAt: -1 }).limit(8);

  if (!products || products.length === 0) {
    return next(new ErrorHandler("Products not found", 404));
  }

  res.status(200).json({
    success: true,
    products,
  });
});
