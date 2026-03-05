import { MailCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function EmailSentPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 to-slate-100 px-4">
      
      <div className="bg-white max-w-md w-full p-8 rounded-2xl shadow-xl text-center">

        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="bg-indigo-100 p-4 rounded-full">
            <MailCheck className="text-indigo-600" size={40} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Check Your Email
        </h1>

        {/* Description */}
        <p className="text-gray-500 text-sm mb-6">
          We have sent a password reset link to your email address.  
          Please check your inbox and follow the instructions to reset your password.
        </p>

        {/* Tips */}
        <div className="text-xs text-gray-400 mb-6">
          Didn't receive the email? Check your spam folder.
        </div>

        {/* Button */}
        <Link
          to="/login"
          className="inline-block w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl transition duration-300 font-medium"
        >
          Back to Login
        </Link>

      </div>
    </div>
  );
}