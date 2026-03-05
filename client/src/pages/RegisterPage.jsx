import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUserAsyncThunk } from "../features/auth/authAPI.js";
import { toast } from "react-toastify";
import { LockKeyhole, Mail, Phone, User } from "lucide-react";
import { registerSchema } from "../validations/authValidation.js";
import { yupResolver } from "@hookform/resolvers/yup";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const submitForm = async (data) => {
    try {
      const res = await dispatch(registerUserAsyncThunk(data)).unwrap();
      toast.success(res.message);
      navigate("/");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f8fafc] to-[#e2e8f0] flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold">LUXORA</h1>
          <p className="text-gray-500 text-sm mt-1">Create your account</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(submitForm)}>
          {/* First name and last name*/}
          <div className="flex gap-3">
            <div className="w-full">
              <div
                className={`flex items-center px-4 py-3 rounded-xl bg-gray-100 ${errors.first_name ? "border border-red-500" : ""}`}
              >
                <User size={18} className="text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="First name"
                  className="bg-transparent outline-none text-sm w-full"
                  {...register("first_name")}
                />
              </div>
              {errors.first_name && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.first_name.message}
                </p>
              )}
            </div>

            <div className="w-full">
              <div
                className={`flex items-center px-4 py-3 rounded-xl bg-gray-100 ${errors.last_name ? "border border-red-500" : ""}`}
              >
                <User size={18} className="text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Last name"
                  className="bg-transparent outline-none text-sm w-full"
                  {...register("last_name")}
                />
              </div>
              {errors.last_name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.last_name.message}
                </p>
              )}
            </div>
          </div>

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

          {/* Phone */}
          <div>
            <div
              className={`flex items-center px-4 py-3 rounded-xl bg-gray-100 ${
                errors.phoneNumber ? "border border-red-500" : ""
              }`}
            >
              <Phone size={18} className="text-gray-500 mr-3" />
              <input
                type="tel"
                placeholder="Phone number"
                className="bg-transparent outline-none text-sm w-full outfit-font"
                {...register("phoneNumber")}
              />
            </div>

            {errors.phoneNumber && (
              <p className="text-red-500 text-xs mt-1">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading.register}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl transition duration-300 font-medium mt-2 flex items-center justify-center gap-2"
          >
            {loading.register && (
              <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
            )}
            <span>Create Account</span>
          </button>
        </form>

        <p className="text-xs text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 hover:underline font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
