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

  const page = parseInt(req.query.page) || 1;
  const query = req.query.query?.trim();

  let filter = {};
  let limit = 50; // default home page products

  if (query) {
    filter = {
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { brand: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } },
        { category: { $regex: `^${query}$`, $options: "i" } },
        { subCategory: { $regex: `^${query}$`, $options: "i" } },
      ],
    };

    limit = parseInt(req.query.limit) || 50; // search me pagination
  }

  const products = await Product.paginate(filter, {
    page,
    limit,
    sort: { createdAt: -1 },
  });

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

    // 1. check user
    const user = req.user;
    if (!user) {
      return next(new ErrorHandler("User not authenticated", 401));
    }

    // 2. get category
    const { category } = req.params;

    if (!category || category.trim() === "") {
      return next(new ErrorHandler("Category is required", 400));
    }

    // 3. pagination params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;

    // 4. filter
    const filter = {
      category: category.toLowerCase(),
    };

    // 5. paginate
    const products = await Product.paginate(filter, {
      page,
      limit,
      sort: { createdAt: -1 },
    });

    // 6. if no product
    if (!products.docs || products.docs.length === 0) {
      return next(new ErrorHandler("No products found in this category", 404));
    }

    // 7. response
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
  }
);

// ----------------- GET PRODUCTS BY TAG -----------------
export const getProductsByTag = asyncHandler(async (req, res, next) => {
  const user = req.user;

  if (!user) {
    return next(new ErrorHandler("User not authenticated", 401));
  }

  const { tag, category } = req.body;

  if (!tag || tag.trim() === "") {
    return next(new ErrorHandler("Tag is required", 400));
  }

  // pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 50;

  let filter = { tags: tag.toLowerCase() };

  if (category) {
    filter.category = category.toLowerCase();
  }

  const products = await Product.paginate(filter, {
    page,
    limit,
    sort: { createdAt: -1 },
  });

  if (!products.docs || products.docs.length === 0) {
    return next(new ErrorHandler("Products not found", 404));
  }

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