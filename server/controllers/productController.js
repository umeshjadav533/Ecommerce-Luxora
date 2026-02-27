import Product from '../models/productModel.js'
import asyncHandler from '../utils/asyncHandler.js'
import ErrorHandler from '../middlewares/errorMiddleWare.js'
import mongoose from 'mongoose'

// ----------------- GET ALL PRODUCTS AND FILTERED PRODUCTS -----------------
export const getAllProducts = asyncHandler(async (req, res, next) => {
    // 1. take user from middleware if user not authenticated then throe error
    const user = req.user;
    if(!user){
        return next(new ErrorHandler("User not authenticated", 401));
    }

    // 2. Get keyword from query
    const search = req.query.search;

    // 3. Create search filter
    let filter = {};

    if(search){
        filter = {
            $or: [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
                { brand: { $regex: search, $options: "i" } },
                { category: { $regex: search, $options: "i" } },
                { subCategory: { $regex: search, $options: "i" } },
                { tags: { $regex: search, $options: "i" } }
            ]
        };
    }

    // 4. Find products with filter
    const products = await Product.find(filter);
    
    // 5. if products not find then throw error
    if(!products || products.length === 0){
        return next(new ErrorHandler("Product not found", 404));
    }

    // 6. send response
    res.status(200).json({
        success: true,
        totalProducts: products.length,
        products
    })
})

// ----------------- GET PRODUCT BY ID -----------------
export const getProductById = asyncHandler(async (req, res, next) => {
    // 1. take user from middleware if user not authenticated then throe error
    const user = req.user;
    if(!user){
        return next(new ErrorHandler("User not authenticated", 401));
    }

    // 2. take id from req.params
    const { id } = req.params;

    // 3. validate Object id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return next(new ErrorHandler("Invalid product id", 400));
    }

    // 4. find product with id
    const product = await Product.findById(id);

    // 5. if product not find then throw error
    if(!product){
        return next(new ErrorHandler("Product not found", 404));
    }

    // 6. send response
    res.status(200).json({
        success: true,
        product
    })
})

// ----------------- GET PRODUCT BY CATEGORY -----------------
export const getProductByCategory = asyncHandler(async (req, res, next) => {
    // 1. take user from middleware if user not authenticated then throe error
    const user = req.user;
    if(!user){
        return next(new ErrorHandler("User not authenticated", 401));
    }

    // 2. take category from req.params
    const { category } = req.params;

    // 3. if category not available then throw error
    if(!category || category.trim() === "")   return next(new ErrorHandler("Category is required", 400));

    // 4. get product with category
    const products = await Product.find({ category: category.toLowerCase() });
    
    // 5. if product not found or product length === 0
    if(!products || products.length === 0){
        return next(new ErrorHandler("No products found in this category", 404));
    }

    // 6. if products found then send response
    res.status(200).json({
        success: true,
        products
    });
})

