import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  ArrowRight,
  Check,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must accept the terms";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Backend registration will be connected here later.
    console.log("Signup data:", formData);

    navigate("/login");
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* =====================================================
            LEFT — BRAND SECTION
        ===================================================== */}
        <section className="relative hidden overflow-hidden bg-slate-950 lg:flex">

          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-600/30 blur-3xl" />

          <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl" />

          <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">

            {/* Logo */}
            <Link to="/" className="inline-flex w-fit items-center gap-3">
              <span className="text-2xl font-bold tracking-tight text-white">
                bite<span className="text-violet-400">That</span>
              </span>
            </Link>

            {/* Content */}
            <div className="max-w-xl">
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <span className="mb-5 inline-flex rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300">
                  Join BiteThat 🍽️
                </span>

                <h1 className="text-5xl font-bold leading-tight tracking-tight text-white xl:text-6xl">
                  Great food.
                  <span className="block text-violet-400">
                    Better moments.
                  </span>
                </h1>

                <p className="mt-6 max-w-lg text-lg leading-8 text-slate-400">
                  Create your BiteThat account and unlock a faster,
                  smarter, and more personalized food ordering experience.
                </p>

                {/* Benefits */}
                <div className="mt-8 space-y-4">

                  {[
                    "Save your favorite restaurants",
                    "Track every order in one place",
                    "Get personalized food recommendations",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 text-sm text-slate-300"
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-500/15 text-violet-400">
                        <Check size={14} />
                      </span>

                      {item}
                    </div>
                  ))}

                </div>
              </motion.div>
            </div>

            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} BiteThat. All rights reserved.
            </p>
          </div>
        </section>

        {/* =====================================================
            RIGHT — SIGNUP FORM
        ===================================================== */}
        <section className="flex min-h-screen items-center justify-center px-6 py-12 sm:px-10 lg:px-16 xl:px-24">

          <div className="w-full max-w-md">

            {/* Mobile logo */}
            <div className="mb-10 lg:hidden">
              <Link to="/" className="inline-flex items-center gap-3">

                <span className="text-2xl font-bold tracking-tight text-slate-900">
                  bite<span className="text-violet-600">That</span>
                </span>
              </Link>
            </div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-violet-600">
                Get started
              </p>

              <h2 className="text-4xl font-bold tracking-tight text-slate-950">
                Create your account
              </h2>

              <p className="mt-3 text-slate-500">
                Join BiteThat and start discovering great food.
              </p>
            </motion.div>

            {/* Form */}
            <motion.form
              onSubmit={handleSubmit}
              className="mt-8 space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >

              {/* Name */}
              <div className="grid grid-cols-2 gap-4">

                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    First name
                  </label>

                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Hrishikesh"
                    autoComplete="given-name"
                    className={`w-full rounded-2xl border bg-white px-4 py-3.5 text-sm outline-none transition focus:ring-4 ${
                      errors.firstName
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                        : "border-slate-200 focus:border-violet-500 focus:ring-violet-500/10"
                    }`}
                  />

                  {errors.firstName && (
                    <p className="mt-1.5 text-xs font-medium text-red-500">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Last name
                  </label>

                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Patkar"
                    autoComplete="family-name"
                    className={`w-full rounded-2xl border bg-white px-4 py-3.5 text-sm outline-none transition focus:ring-4 ${
                      errors.lastName
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                        : "border-slate-200 focus:border-violet-500 focus:ring-violet-500/10"
                    }`}
                  />

                  {errors.lastName && (
                    <p className="mt-1.5 text-xs font-medium text-red-500">
                      {errors.lastName}
                    </p>
                  )}
                </div>

              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={`w-full rounded-2xl border bg-white px-4 py-3.5 text-sm outline-none transition focus:ring-4 ${
                    errors.email
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                      : "border-slate-200 focus:border-violet-500 focus:ring-violet-500/10"
                  }`}
                />

                {errors.email && (
                  <p className="mt-1.5 text-xs font-medium text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="At least 6 characters"
                    autoComplete="new-password"
                    className={`w-full rounded-2xl border bg-white px-4 py-3.5 pr-12 text-sm outline-none transition focus:ring-4 ${
                      errors.password
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                        : "border-slate-200 focus:border-violet-500 focus:ring-violet-500/10"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <p className="mt-1.5 text-xs font-medium text-red-500">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Confirm password
                </label>

                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                    className={`w-full rounded-2xl border bg-white px-4 py-3.5 pr-12 text-sm outline-none transition focus:ring-4 ${
                      errors.confirmPassword
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                        : "border-slate-200 focus:border-violet-500 focus:ring-violet-500/10"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword((prev) => !prev)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>

                {errors.confirmPassword && (
                  <p className="mt-1.5 text-xs font-medium text-red-500">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Terms */}
              <div className="pt-1">
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                  />

                  <span className="text-sm leading-6 text-slate-500">
                    I agree to BiteThat's{" "}
                    <Link
                      to="/terms"
                      className="font-semibold text-violet-600 hover:text-violet-700"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      className="font-semibold text-violet-600 hover:text-violet-700"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>

                {errors.agreeToTerms && (
                  <p className="mt-1.5 text-xs font-medium text-red-500">
                    {errors.agreeToTerms}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-600/20 transition hover:bg-violet-700 hover:shadow-xl hover:shadow-violet-600/25 active:scale-[0.99]"
              >
                Create account

                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>

              {/* Divider */}
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>

                <div className="relative flex justify-center">
                  <span className="bg-slate-50 px-4 text-xs font-medium uppercase tracking-wider text-slate-400">
                    or
                  </span>
                </div>
              </div>

              {/* Google */}
              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                <span className="text-base font-bold">G</span>
                Sign up with Google
              </button>
            </motion.form>

            {/* Login */}
            <p className="mt-7 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-violet-600 transition hover:text-violet-700"
              >
                Sign in
              </Link>
            </p>

            {/* Back home */}
            <div className="mt-5 text-center">
              <Link
                to="/"
                className="text-sm font-medium text-slate-400 transition hover:text-slate-600"
              >
                ← Back to BiteThat
              </Link>
            </div>

          </div>
        </section>
      </div>
    </main>
  );
}