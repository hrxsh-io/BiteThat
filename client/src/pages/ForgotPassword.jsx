

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { forgotPassword } from "../services/authApi";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    try {
      setLoading(true);

      const response = await forgotPassword(email.trim());

      toast.success(
        response?.message ||
          "If an account exists, a reset code has been sent."
      );

      // User manually enters email + code on the next page
      navigate("/reset-password");
    } catch (error) {
      console.error("Forgot password error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Unable to process password reset request"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Back */}
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-violet-600 mb-6 transition"
        >
          <ArrowLeft size={18} />
          Back to login
        </Link>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-violet-100 p-8">

          {/* Icon */}
          <div className="w-14 h-14 rounded-2xl bg-violet-100 text-violet-600 flex items-center justify-center mb-6">
            <Mail size={26} />
          </div>

          <h1 className="text-3xl font-bold text-gray-900">
            Forgot password?
          </h1>

          <p className="text-gray-500 mt-2 mb-8">
            Enter your email and we'll send you a one-time
            verification code.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email address
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                disabled={loading}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition disabled:bg-gray-50"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={19} className="animate-spin" />
                  Sending code...
                </>
              ) : (
                "Send reset code"
              )}
            </button>
          </form>

          {/* Login */}
          <p className="text-center text-sm text-gray-500 mt-7">
            Remember your password?{" "}
            <Link
              to="/login"
              className="font-semibold text-violet-600 hover:text-violet-700"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
