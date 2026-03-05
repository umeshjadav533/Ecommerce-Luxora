import ErrorHandler from "../middlewares/errorMiddleWare.js";
import User from "../models/userModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import generateToken from "../utils/generateToken.js";
import generateForgotPasswordEmailTemplate from "../utils/emailTemplate.js";
import sendEmail from "../utils/emailService.js";
import crypto from "crypto";
import generateOtp from "../utils/generateOtp.js";
import { sendOtpSms } from "../services/userService.js";
import bcrypt from "bcrypt";
import path from "path";
import fs from "fs";
import cloudinary from "../config/cloudinary.js";

// ----------------- REGISTER USER -----------------
export const register = asyncHandler(async (req, res, next) => {
  // 1. destructure input fields and check field is not empty or space-only
  const { first_name, last_name, email, password, phoneNumber } = req.body;

  if (!first_name || !last_name || !email || !password || !phoneNumber) {
    return next(new ErrorHandler("Please Provide all fields", 400));
  }

  // 2. user already exist or not
  const existUser = await User.findOne({ email: email.toLowerCase() });
  if (existUser) {
    return next(new ErrorHandler("User already exists", 409));
  }

  let avatarData = {
    public_id: null,
    url: null,
  };

  // 3. take file
  if (req.file) {
    // Upload on local folder
    const localFilePath = path.join(
      process.cwd(),
      "uploads/avatars",
      req.file.filename,
    );

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(localFilePath, {
      folder: "luxora_avatars",
    });

    avatarData = {
      public_id: result.public_id,
      url: result.secure_url,
    };

    // Delete local file after successful upload
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
  }

  // 4. create user
  const user = await User.create({
    first_name,
    last_name,
    email: email.toLowerCase(),
    password,
    phoneNumber,
    avatar: avatarData,
  });

  // 5. generate token and send response
  generateToken(user, 201, "User Registration Successfully", res);
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

  if (!user) {
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
  const { email } = req.body;

  if (!email || email.trim() === "") {
    return next(new ErrorHandler("Email is required", 400));
  }

  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user) {
    return next(new ErrorHandler("If user exist then sent email", 404));
  }

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${process.env.FRONTEND_URL}/api/auth/password/reset-password/${resetToken}`;
  console.log(user, resetPasswordUrl);

  const message = generateForgotPasswordEmailTemplate(resetPasswordUrl);

  try {
    await sendEmail({
      to: user.email,
      subject: "Password Reset Request",
      message,
    });

    return res.status(200).json({
      success: true,
      message: `Email sent to ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler("Email could not be sent", 500));
  }
});

// ----------------- RESET PASSWORD -----------------
export const resetPassword = asyncHandler(async (req, res, next) => {
  const { password, confirmPassword } = req.body;

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler("Token is invalid or expired", 400));
  }

  if (!password || !confirmPassword) {
    return next(new ErrorHandler("Please provide password fields", 400));
  }

  if (password !== confirmPassword) {
    return next(new ErrorHandler("Passwords do not match", 400));
  }

  user.password = password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password reset successful",
  });
});

// ----------------- SEND OTP -----------------
export const sendOtp = asyncHandler(async (req, res, next) => {
  // 1. take user from middlware and check user is authenticated
  const user = req.user;
  if (!user) return next(new ErrorHandler("User is not authenticated", 401));

  // 2. destructure phone number and check phone number is available
  const { phone } = req.body;
  if (!phone || phone.trim() === "")
    return next(new ErrorHandler("phone number is required", 400));

  // 3. generate otp
  const otp = generateOtp();
  console.log(otp);
  // 4. store otp in verficationOtp field
  user.verificationOtp = await bcrypt.hash(otp, 10);

  // 5. set expire time
  user.verificationOtpExpire = Date.now() + 5 * 60 * 1000; // 5 minute

  // 6. save user
  await user.save();

  //7. send otp
  await sendOtpSms(phone, otp);

  // 8. send response
  res.status(200).json({
    success: true,
    message: "OTP sent successfully",
  });
});

// ----------------- VERIFY OTP -----------------
export const verfiyPhoneOtp = asyncHandler(async (req, res, next) => {
  // 1. take user from middlware and check user is authenticated
  const user = req.user;
  if (!user) return next(new ErrorHandler("User is not authenticated", 401));

  // 2. destructure otp field and check field is available
  const { verificationOtp } = req.body;

  if (!verificationOtp || verificationOtp.trim() === "") {
    return next(new ErrorHandler("otp is required", 400));
  }

  // 3. hash otp
  const isMatchOtp = await bcrypt.compare(
    verificationOtp,
    user.verificationOtp,
  );

  // 4. verfiy otp
  if (!isMatchOtp || user.verificationOtpExpire < Date.now()) {
    return next(new ErrorHandler("Invalid or Expire Otp", 400));
  }

  // 5. if otp is match then isVerified field true
  user.isVerified = true;

  // 6. verificationOtp and verificationOtpExpire field  undefined
  user.verificationOtp = undefined;
  user.verificationOtpExpire = undefined;

  // 7. save user
  await user.save();

  // 8. send response
  res.status(200).json({
    success: true,
    message: "Phone verified successfully",
  });
});

// ----------------- GET USER -----------------
export const getUser = asyncHandler(async (req, res, next) => {
  // 1. take user from middlware and check user is authenticated
  const user = req.user;
  if (!user) return next(new ErrorHandler("User is not authenticated", 401));

  res.status(200).json({
    success: true,
    user,
  });
});

// ----------------- UPDATE USER -----------------
export const updateUser = asyncHandler(async (req, res, next) => {
  // 1. Take user from middleware and check user is authenticated or not
  const user = await User.findById(req.user._id);
  if (!user) return next(new ErrorHandler("User not found", 404));

  // 2. destructure update fields
  let updateData = { ...req.body };

  // 3. Take file
  if (req.file) {
    // Upload on local Folder
    const localFilePath = path.join(
      process.cwd(),
      "uploads/avatars",
      req.file.filename,
    );

    // Delete old Cloudinary image
    if (user.avatar?.public_id) {
      await cloudinary.uploader.destroy(user.avatar.public_id);
    }

    // Upload new image to Cloudinary
    const result = await cloudinary.uploader.upload(localFilePath, {
      folder: "luxora_avatars",
    });

    updateData.avatar = {
      public_id: result.public_id,
      url: result.secure_url,
    };

    // Delete local file
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
  }

  // 4. update user
  const updatedUser = await User.findByIdAndUpdate(user._id, updateData, {
    new: true,
    runValidators: true,
  });

  // 5. send response
  res.status(200).json({
    success: true,
    message: "User Updated Successfully",
    user: updatedUser,
  });
});
