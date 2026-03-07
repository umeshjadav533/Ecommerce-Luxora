import ErrorHandler from "../middlewares/errorMiddleWare.js";
import Category from "../models/categoryModel.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getAllCategories = asyncHandler(async (req, res, next) => {
    // 1. Take user from middleware and check user is authenticated or not
    const user = req.user;
    if(!user){
        return next(new ErrorHandler("User is not authenticaed", 401));
    }

    const categoryProducts = await Category.find();
    
    if(!categoryProducts || categoryProducts.length === 0){
        return next(new ErrorHandler("Category products not found", 404));
    }

    res.status(200).json({
        success: true,
        totalCategories: categoryProducts?.length,
        categoryProducts
    })
})

export const getProductsByCategory = asyncHandler(async (req, res, next) => {
    
})
