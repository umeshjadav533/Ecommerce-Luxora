import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { resetPasswordSchema } from "../validations/authValidation.js";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { resetUserPasswordAsyncThunk } from "../features/auth/authAPI";
import { toast } from "react-toastify";
import { LockKeyhole } from "lucide-react";

export default function ResetPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  console.log(token);
  const submitForm = async (data) => {
    try {
      const res = await dispatch(
        resetUserPasswordAsyncThunk({
          ...data,
          token
        }),
      ).unwrap();
      toast.success(res.message);
      navigate("/");
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#f8fafc] to-[#e2e8f0] p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold tracking-wide">LUXORA</h1>
          <p className="text-gray-500 text-sm mt-1">Reset Your Password</p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit(submitForm)}>
          {/* Password */}
          <div>
            <div
              className={`flex items-center px-4 py-3 rounded-xl bg-gray-100 ${
                errors.password ? "border border-red-500" : ""
              }`}
            >
              <LockKeyhole size={18} className="text-gray-500 mr-3" />

              <input
                type="password"
                placeholder="New Password"
                className="bg-transparent outline-none text-sm w-full"
                {...register("password")}
              />
            </div>

            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <div
              className={`flex items-center px-4 py-3 rounded-xl bg-gray-100 ${
                errors.confirmPassword ? "border border-red-500" : ""
              }`}
            >
              <LockKeyhole size={18} className="text-gray-500 mr-3" />

              <input
                type="password"
                placeholder="Confirm Password"
                className="bg-transparent outline-none text-sm w-full"
                {...register("confirmPassword")}
              />
            </div>

            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl transition duration-300 font-medium"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
