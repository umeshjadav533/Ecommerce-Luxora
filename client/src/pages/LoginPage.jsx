import { useForm } from "react-hook-form";
import { loginSchema } from "../validations/authValidation.js";
import { loginUserAsyncThunk } from "../features/auth/authAPI.js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { LockKeyhole, Mail } from "lucide-react";
import { yupResolver } from "@hookform/resolvers/yup";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const submitForm = async (data) => {
    try {
      const res = await dispatch(loginUserAsyncThunk(data)).unwrap();
      toast.success(res.message);
      navigate("/");
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <div className="min-h-screen grid md:grid-cols-2 grid-cols-1 items-center bg-linear-to-br from-[#f8fafc] to-[#e2e8f0] p-4">
      {/* Left Image Section */}
      <div className="h-full rounded-3xl overflow-hidden hidden md:grid grid-cols-2 gap-4">
        {/* Left Column (2 stacked images) */}
        <div className="grid grid-rows-2 gap-4">
          <div className="overflow-hidden rounded-2xl">
            <img
              src="https://res.cloudinary.com/dosbhrvcz/image/upload/v1771894910/pexels-bohlemedia-1884584_fdef18.jpg"
              alt="Fashion 1"
              className="w-full h-full object-cover hover:scale-105 transition duration-500"
            />
          </div>

          <div className="overflow-hidden rounded-2xl">
            <img
              src="https://res.cloudinary.com/dosbhrvcz/image/upload/v1771894905/pexels-daiangan-102129_j1rs63.jpg"
              alt="Fashion 2"
              className="w-full h-full object-cover hover:scale-105 transition duration-500"
            />
          </div>
        </div>

        {/* Right Column (1 tall image) */}
        <div className="overflow-hidden rounded-2xl">
          <img
            src="https://res.cloudinary.com/dosbhrvcz/image/upload/v1771894908/pexels-anytiffng-3302537_oqzgfx.jpg"
            alt="Fashion 3"
            className="w-full h-full object-cover hover:scale-105 transition duration-500"
          />
        </div>
      </div>

      {/* Right Form Section */}
      <div className="flex flex-col justify-center items-center">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-semibold tracking-wide">LUXORA</h1>
            <p className="text-gray-500 text-sm mt-1">Login</p>
          </div>

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

            {/* Password */}
            <div>
              <div
                className={`flex items-center px-4 py-3 rounded-xl bg-gray-100 ${errors.password ? "border border-red-500" : ""}`}
              >
                <LockKeyhole size={18} className="text-gray-500 mr-3" />
                <input
                  type="password"
                  placeholder="Password"
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

            {/* Forgot Password */}
            <div className="text-right">
              <Link
                to="/password/forgot-password"
                className="text-xs text-indigo-500 hover:text-indigo-600 hover:underline transition"
              >
                Forgot your password?
              </Link>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading.login}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl transition duration-300 font-medium mt-2 flex items-center justify-center gap-2"
            >
              {loading.login && (
                <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
              )}
              <span>Login</span>
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="text-xs text-center text-gray-500 mt-6">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-600 hover:underline font-medium"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
