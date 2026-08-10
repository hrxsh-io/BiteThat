import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  KeyRound,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  verifyResetCode,
  resetPassword,
} from "../services/authApi";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedCode = code.trim();

    if (!normalizedEmail) {
      toast.error("Please enter your email address");
      return;
    }

    if (!/^\d{6}$/.test(normalizedCode)) {
      toast.error("Enter the 6-digit reset code");
      return;
    }

    if (!newPassword) {
      toast.error("Please enter a new password");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      // ==========================================
      // VERIFY CODE
      // ==========================================

      await verifyResetCode(
        normalizedEmail,
        normalizedCode
      );

      // ==========================================
      // RESET PASSWORD
      // ==========================================

      const response = await resetPassword(
        normalizedEmail,
        normalizedCode,
        newPassword
      );

      toast.success(
        response?.message ||
          "Password reset successfully"
      );

      // Password reset is complete
      setTimeout(() => {
        navigate("/login");
      }, 800);
    } catch (error) {
      console.error("Reset password error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Unable to reset password"
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
          to="/profile"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-violet-600 mb-6 transition"
        >
          <ArrowLeft size={18} />
          Back to profile
        </Link>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-violet-100 p-8">

          {/* Icon */}
          <div className="w-14 h-14 rounded-2xl bg-violet-100 text-violet-600 flex items-center justify-center mb-6">
            <KeyRound size={26} />
          </div>

          <h1 className="text-3xl font-bold text-gray-900">
            Reset password
          </h1>

          <p className="text-gray-500 mt-2 mb-8">
            Enter the email you requested the reset for,
            along with the 6-digit code sent to you.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label
                htmlFor="reset-email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email address
              </label>

              <input
                id="reset-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                disabled={loading}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition disabled:bg-gray-50"
              />
            </div>

            {/* Code */}
            <div>
              <label
                htmlFor="reset-code"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                6-digit reset code
              </label>

              <input
                id="reset-code"
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={code}
                onChange={(e) =>
                  setCode(
                    e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 6)
                  )
                }
                placeholder="123456"
                autoComplete="one-time-code"
                disabled={loading}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 tracking-[0.3em] text-center text-lg font-semibold outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition disabled:bg-gray-50"
              />
            </div>

            {/* New password */}
            <div>
              <label
                htmlFor="new-password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                New password
              </label>

              <div className="relative">
                <input
                  id="new-password"
                  type={
                    showPassword ? "text" : "password"
                  }
                  value={newPassword}
                  onChange={(e) =>
                    setNewPassword(e.target.value)
                  }
                  placeholder="At least 6 characters"
                  autoComplete="new-password"
                  disabled={loading}
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition disabled:bg-gray-50"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm password */}
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirm new password
              </label>

              <div className="relative">
                <input
                  id="confirm-password"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  placeholder="Enter password again"
                  autoComplete="new-password"
                  disabled={loading}
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition disabled:bg-gray-50"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2
                    size={19}
                    className="animate-spin"
                  />
                  Resetting password...
                </>
              ) : (
                "Reset password"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

