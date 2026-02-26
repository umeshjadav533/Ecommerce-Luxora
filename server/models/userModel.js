import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "First name is Required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    last_name: {
      type: String,
      required: [true, "Last name is Required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "Email name is required"],
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
      trim: true,
      minlength: 6,
      select: false,
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is Required"],
      trim: true,
      match: [/^[0-9]{10}$/, "Enter valid phone number"],
    },
    avatar: {
      type: String,
      default: null,
    },
    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          require: true,
        },
        size: {
          type: String
        },
        variant: {
          type: String,
          default: null,
        },
        quantity: {
          type: Number,
          default: 1,
          min: 1,
        }
      },
    ],
    favorite: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    isVerified: {
      type: Boolean,
      default: false
    },
    verificationOtp: String,
    verificationOtpExpire: Date
  },
  { timestamps: true },
);

// generate jwt token
userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// hash password
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  return (this.password = await bcrypt.hash(this.password, 11));
});

// compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// reset password
userSchema.methods.getResetPasswordToken = function (){
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;
}

const User = mongoose.model("User", userSchema);

export default User;