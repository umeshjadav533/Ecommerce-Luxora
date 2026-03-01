import express from 'express'
import { forgotPassword, getUser, login, logout, register, resetPassword, sendOtp, updateUser, verfiyOtp } from '../controllers/authController.js';
import isAuthenticated from '../middlewares/authMiddleware.js';

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/logout", isAuthenticated, logout);
userRouter.post("/password/forgot-password", forgotPassword);
userRouter.put("/password/reset-password/:token", resetPassword);
userRouter.get("/profile", isAuthenticated, getUser);
userRouter.post("/send-otp", isAuthenticated, sendOtp);
userRouter.post("/verify-otp", isAuthenticated, verfiyOtp);
userRouter.put("/update-user", isAuthenticated, updateUser);

export default userRouter;