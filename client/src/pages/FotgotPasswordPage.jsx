import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form"
import { forgotPasswordSchema } from "../validations/authValidation.js";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { forgotUserPasswordAsyncThunk } from "../features/auth/authAPI";
import { toast } from "react-toastify";
import { Mail } from "lucide-react";

export default function FotgotPasswordPage () {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(forgotPasswordSchema)
  });
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.auth);
  const navigate = useNavigate();
  
  const submitForm = async (data) => {
    try {
      const res = await dispatch(forgotUserPasswordAsyncThunk(data)).unwrap();
      toast.success(res.message);
      navigate("/check-email");
    } catch (error) {
      toast.error(error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#f8fafc] to-[#e2e8f0] p-4">
      
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold tracking-wide">LUXORA</h1>
          <p className="text-gray-500 text-sm mt-2">
            Reset your password
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 text-center mb-6">
          Enter your email address and we’ll send you a link to reset your password.
        </p>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit(submitForm)}>

          {/* Email */}
          <div>
              <div
                className={`flex items-center px-4 py-3 rounded-xl bg-gray-100 ${errors.email ? "border border-red-500" : ""}`}
              >
                <Mail size={18} className="text-gray-500 mr-3" />
                <input
                  type="email"
                  placeholder="Email address"
                  className="bg-transparent outline-none text-sm w-full"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

          {/* Button */} 
          <button
            type="submit"
            disabled={loading.forgotPassword}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl transition duration-300 font-medium mt-2 flex items-center justify-center gap-2"
          >
            {loading.forgotPassword && (
              <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
            )}
            <span>Send Reset Link</span>
          </button>

        </form>

        {/* Back to Login */}
        <p className="text-xs text-center text-gray-500 mt-6">
          Remember your password?{" "}
          <Link
            to="/login"
            className="text-indigo-600 hover:underline font-medium"
          >
            Back to Login
          </Link>
        </p>

      </div>
    </div>
  )
}
