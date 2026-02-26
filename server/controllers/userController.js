import ErrorHandler from "../middlewares/errorMiddleWare.js";
import User from "../models/userModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import generateToken from "../utils/generateToken.js";
import generateForgotPasswordEmailTemplate from "../utils/emailTemplate.js";
import sendEmail from "../utils/emailService.js";
import crypto from "crypto";

// ----------------- REGISTER USER -----------------
export const register = asyncHandler(async (req, res, next) => {
  // 1. Empty Request body check
  if (!req.body || Object.keys(req.body).length === 0) {
    return next(new ErrorHandler("Please Provide all fields", 400));
  }

  // 2. destructure
  const { first_name, last_name, email, password, phoneNumber } = req.body;

  // 3. validation - empty or space only
  if (
    !first_name ||
    first_name.trim() === "" ||
    !last_name ||
    last_name.trim() === "" ||
    !email ||
    email.trim() === "" ||
    !password ||
    password.trim() === "" ||
    !phoneNumber ||
    String(phoneNumber).trim() === ""
  ) {
    return next(new ErrorHandler("Please Provide all fields", 400));
  }

  // 4. check if user already exists
  const existUser = await User.findOne({ email: email.toLowerCase() });
  if (existUser) {
    return next(new ErrorHandler("User already exists", 409));
  }

  // 5. Create user
  const user = await User.create({
    first_name,
    last_name,
    email: email.toLowerCase(),
    password,
    phoneNumber,
  });

  // 6. Generate JWT token + send Response
  generateToken(user, 201, "User Registration SuccessFully", res);
});

// ----------------- LOGIN USER -----------------
export const login = asyncHandler(async (req, res, next) => {
  // 1. Empty Request body check
  if (!req.body || Object.keys(req.body).length === 0) {
    return next(new ErrorHandler("Please Provide all fields", 400));
  }

  // 2. destructure
  const { email, password } = req.body;

  // 3. Validation - empty fields or spaces-only
  if (!password || password.trim() === "" || !email || email.trim() === "") {
    return next(new ErrorHandler("Please Provide all fields", 400));
  }

  // 4. check user registration or not
  const user = await User.findOne({ email: email.toLowerCase() }).select(
    "+password",
  );

  if(!user){
    return next(new ErrorHandler("User not Registred", 404));
  }

  // 5. check password
  if (!user || !(await user.comparePassword(password))) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  // 6. Generate token + send response
  generateToken(user, 200, "Logged In Successfully", res);
});

// ----------------- LOGOUT USER -----------------
export const logout = asyncHandler(async (req, res, next) => {
  // 1. clear cookie
  res.status(200).clearCookie("token").json({
    success: true,
    message: "Logged out Successfully",
  });
});

// ----------------- FORGOT PASSWORD -----------------
export const forgotPassword = asyncHandler(async (req, res, next) => {
  // 1. Empty Request body check
  if (!req.body || Object.keys(req.body).length === 0) {
    return next(new ErrorHandler("Please Provide all fields", 400));
  }

  // 2. destructure
  const { email } = req.body;

  // 3. validation empty or space only
  if (!email || email.trim() === "") {
    return next(new ErrorHandler("Email is required", 400));
  }

  // 4. find user in database
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    return res.status(200).json({
      success: true,
      message: "If an account exists, reset email has been sent",
    });
  }

  // 5. Generate token
  const resetToken = user.getResetPasswordToken();

  // 6. save without validation
  await user.save({ validateBeforeSave: false });

  // 7. make url
  const resetPasswordUrl = `${process.env.FRONTEND_URL}/api/user/password/reset-password/${resetToken}`;

  // 8. generate email
  const message = generateForgotPasswordEmailTemplate(resetPasswordUrl);

  // 9. send email to user
  try {
    await sendEmail({
      to: user.email,
      subject: "Luxora - Password Reset Request",
      message,
    });

    // 10. send response
    res.status(200).json({
      success: true,
      message: `Email sent to user ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message || "Cannot send email", 500));
  }
});

// ----------------- RESET PASSWORD -----------------
export const resetPassword = asyncHandler(async (req, res, next) => {
  // 1. take token from request
  const { token } = req.params;

  // 2. destructure
  const { password, confirmPassword } = req.body;

  // 3. check not empty field orspace only
  if (
    !password ||
    password.trim() === "" ||
    !confirmPassword ||
    confirmPassword.trim() === ""
  ) {
    return next(new ErrorHandler("Please provide all required fields", 400));
  }

  // 4. check password and confirmPassword
  if (password !== confirmPassword) {
    return next(
      new ErrorHandler("Password and confirm password do not match", 400),
    );
  }

  // 5. Hash token url
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  // 6. find user
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler("Invalid or expired password reset token", 400),
    );
  }

  //7. update password and resetpassword token and resetPasswordExpire undefined
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  // 8. save user
  await user.save();

  // 9. generate token
  generateToken(user, 200, "Password reset Successful", res);
});