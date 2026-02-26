import User from "../models/userModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorHandler from "./errorMiddleWare.js";
import jwt from 'jsonwebtoken'

const isAuthenticated = asyncHandler(async(req, res, next) => {
    const { token } = req.cookies;

    if(!token){
        return next(new ErrorHandler("Please login to access this resource", 401));
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decodedToken.id).select(
        "-resetPasswordToken -resetPasswordExpire"
    );

    if(!user){
        return next(new ErrorHandler("User not found with this id", 404));
    }
    req.user = user;
    next();
})

export default isAuthenticated;