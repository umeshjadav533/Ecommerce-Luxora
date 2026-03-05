import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function PasswordResetSuccess() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md">

        <CheckCircle className="text-green-500 mx-auto mb-4" size={50} />

        <h1 className="text-2xl font-semibold mb-2">
          Password Reset Successful
        </h1>

        <p className="text-gray-500 mb-6">
          Your password has been successfully updated.  
          You can now login using your new password.
        </p>

        <Link
          to="/login"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
        >
          Go to Login
        </Link>

      </div>

    </div>
  );
}