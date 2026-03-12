import Product from "../models/productModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorHandler from "../middlewares/errorMiddleWare.js";
import mongoose from "mongoose";

// ----------------- GET ALL PRODUCTS -----------------
export const getAllProducts = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 50;

  const products = await Product.paginate({}, { page, limit, sort: { createdAt: -1 } });

  res.status(200).json({
    success: true,
    products: products.docs, // always docs
    meta: {
      totalDocs: products.totalDocs,
      limit: products.limit,
      totalPages: products.totalPages,
      currentPage: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
    },
  });
});

// ----------------- GET PRODUCT BY ID -----------------
export const getProductById = asyncHandler(async (req, res, next) => {
  const user = req.user;
  if (!user) return next(new ErrorHandler("User not authenticated", 401));

  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return next(new ErrorHandler("Invalid product id", 400));

  const product = await Product.findById(id);
  if (!product) return next(new ErrorHandler("Product not found", 404));

  res.status(200).json({ success: true, product });
});

// ----------------- GET PRODUCTS BY CATEGORY -----------------
export const getProductsForCategoryPage = asyncHandler(async (req, res, next) => {
  const user = req.user;
  if (!user) return next(new ErrorHandler("User not authenticated", 401));

  const { category } = req.params;
  if (!category || category.trim() === "") return next(new ErrorHandler("Category is required", 400));

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 50;

  const products = await Product.paginate({ category: category.toLowerCase() }, { page, limit, sort: { createdAt: -1 } });

  if (!products.docs || products.docs.length === 0) return next(new ErrorHandler("No products found in this category", 404));

  res.status(200).json({
    success: true,
    products: products.docs,
    meta: {
      totalDocs: products.totalDocs,
      limit: products.limit,
      totalPages: products.totalPages,
      currentPage: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
    },
  });
});

// ----------------- GET PRODUCTS BY TAG -----------------
export const getProductsByTag = asyncHandler(async (req, res, next) => {
  const user = req.user;
  if (!user) return next(new ErrorHandler("User not authenticated", 401));

  const { tag, category } = req.body;
  if (!tag || tag.trim() === "") return next(new ErrorHandler("Tag is required", 400));

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 50;

  const filter = { tags: tag.toLowerCase() };
  if (category) filter.category = category.toLowerCase();

  const products = await Product.paginate(filter, { page, limit, sort: { createdAt: -1 } });

  if (!products.docs || products.docs.length === 0) return next(new ErrorHandler("Products not found", 404));

  res.status(200).json({
    success: true,
    products: products.docs,
    meta: {
      totalDocs: products.totalDocs,
      limit: products.limit,
      totalPages: products.totalPages,
      currentPage: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
    },
  });
});

// ----------------- FILTERED PRODUCTS -----------------
export const filteredProducts = asyncHandler(async (req, res, next) => {
  const {
    query,
    gender,
    brands,
    minPrice,
    maxPrice,
    rating,
    discount,
    tags,
    page = 1,
    limit = 10,
  } = req.query;

  let filter = {};

  if (query) filter.$or = [
    { title: { $regex: query, $options: "i" } },
    { description: { $regex: query, $options: "i" } },
    { brand: { $regex: query, $options: "i" } },
    { tags: { $regex: query, $options: "i" } },
  ];

  if (gender) filter.gender = gender;
  if (brands) filter.brand = { $in: brands.split(",") };
  if (tags) filter.tags = { $in: tags.split(",") };
  if (minPrice || maxPrice) {
    filter.mrpPrice = {};
    if (minPrice) filter.mrpPrice.$gte = Number(minPrice);
    if (maxPrice) filter.mrpPrice.$lte = Number(maxPrice);
  }
  if (rating) filter.rating = { $gte: Number(rating) };
  if (discount) filter.discountPercentage = { $gte: Number(discount) };

  const products = await Product.paginate(filter, { page: Number(page), limit: Number(limit), sort: { createdAt: -1 } });

  if (!products.docs || products.docs.length === 0) return next(new ErrorHandler("Products not found", 404));

  res.status(200).json({
    success: true,
    products: products.docs,
    meta: {
      totalDocs: products.totalDocs,
      limit: products.limit,
      totalPages: products.totalPages,
      currentPage: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
    },
  });
});