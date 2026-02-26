import express from 'express'
import { forgotPassword, login, logout, register, resetPassword } from '../controllers/userController.js';
import isAuthenticated from '../middlewares/authMiddleware.js';

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/logout", isAuthenticated, logout);
userRouter.post("/password/forgot-password", forgotPassword);
userRouter.put("/password/reset-password/:token", resetPassword);

export default userRouter;