import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import logo from "../assets/logo.jpeg";
import { motion } from "framer-motion";

export default function Login() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
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

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        // Backend authentication will be connected here later.
        console.log("Login data:", formData);

        navigate("/");
    };

    return (
        <main className="min-h-screen bg-slate-50">
            <div className="grid min-h-screen lg:grid-cols-2">

                {/* =====================================================
            LEFT — BRAND / VISUAL SECTION
        ===================================================== */}
                <section className="relative hidden overflow-hidden bg-slate-950 lg:flex">

                    {/* Background gradients */}
                    <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-600/30 blur-3xl" />
                    <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl" />

                    <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">

                        <Link to="/" className="inline-flex w-fit items-center gap-3">
  <img
    src={logo}
    alt="BiteThat"
    className="w-11 h-11 rounded-full object-cover"
  />

  <h2 className="text-2xl font-extrabold tracking-tight">
    <span className="text-violet-400">bite</span>
    <span className="text-white">That</span>
  </h2>
</Link>

                        {/* Main content */}
                        <div className="max-w-xl">
                            <motion.div
                                initial={{ opacity: 0, y: 25 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7 }}
                            >
                                <span className="mb-5 inline-flex rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300">
                                    Welcome back 👋
                                </span>

                                <h1 className="text-5xl font-bold leading-tight tracking-tight text-white xl:text-6xl">
                                    Your next
                                    <span className="block text-violet-400">
                                        delicious bite
                                    </span>
                                    is waiting.
                                </h1>

                                <p className="mt-6 max-w-lg text-lg leading-8 text-slate-400">
                                    Sign in to discover your favorite restaurants, track orders,
                                    save your favorites, and make every meal count.
                                </p>
                            </motion.div>
                        </div>

                        {/* Bottom */}
                        <p className="text-sm text-slate-500">
                            © {new Date().getFullYear()} BiteThat. All rights reserved.
                        </p>
                    </div>
                </section>

                {/* =====================================================
            RIGHT — LOGIN FORM
        ===================================================== */}
                <section className="flex min-h-screen items-center justify-center px-6 py-12 sm:px-10 lg:px-16 xl:px-24">

                    <div className="w-full max-w-md">

                        {/* Mobile logo */}
                        <Link to="/" className="inline-flex w-fit items-center gap-3">
                            <img
                                src={logo}
                                alt="BiteThat"
                                className="w-11 h-11 rounded-full object-cover"
                            />

                            <h2 className="text-2xl font-extrabold tracking-tight">
                                <span className="text-violet-400">bite</span>
                                <span className="text-black">That</span>
                            </h2>
                        </Link>

                        {/* Heading */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-violet-600">
                                Welcome back
                            </p>

                            <h2 className="text-4xl font-bold tracking-tight text-slate-950">
                                Sign in to BiteThat
                            </h2>

                            <p className="mt-3 text-slate-500">
                                Enter your details to continue ordering.
                            </p>
                        </motion.div>

                        {/* Form */}
                        <motion.form
                            onSubmit={handleSubmit}
                            className="mt-9 space-y-5"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.15, duration: 0.5 }}
                        >

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
                                    className={`w-full rounded-2xl border bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 ${errors.email
                                        ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                                        : "border-slate-200 focus:border-violet-500 focus:ring-violet-500/10"
                                        }`}
                                />

                                {errors.email && (
                                    <p className="mt-2 text-xs font-medium text-red-500">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-semibold text-slate-700"
                                    >
                                        Password
                                    </label>

                                    <Link
                                        to="/forgot-password"
                                        className="text-sm font-semibold text-violet-600 transition hover:text-violet-700"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>

                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        autoComplete="current-password"
                                        className={`w-full rounded-2xl border bg-white px-4 py-3.5 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 ${errors.password
                                            ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                                            : "border-slate-200 focus:border-violet-500 focus:ring-violet-500/10"
                                            }`}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                                        aria-label={
                                            showPassword ? "Hide password" : "Show password"
                                        }
                                    >
                                        {showPassword ? (
                                            <EyeOff size={19} />
                                        ) : (
                                            <Eye size={19} />
                                        )}
                                    </button>
                                </div>

                                {errors.password && (
                                    <p className="mt-2 text-xs font-medium text-red-500">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Remember me */}
                            <div className="flex items-center">
                                <label className="flex cursor-pointer items-center gap-3">
                                    <input
                                        type="checkbox"
                                        name="rememberMe"
                                        checked={formData.rememberMe}
                                        onChange={handleChange}
                                        className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                                    />

                                    <span className="text-sm text-slate-600">
                                        Remember me
                                    </span>
                                </label>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-600/20 transition hover:bg-violet-700 hover:shadow-xl hover:shadow-violet-600/25 active:scale-[0.99]"
                            >
                                Sign in

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

                            {/* Google placeholder */}
                            <button
                                type="button"
                                className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                            >
                                <span className="text-base font-bold">G</span>
                                Continue with Google
                            </button>
                        </motion.form>

                        {/* Signup */}
                        <p className="mt-8 text-center text-sm text-slate-500">
                            Don't have an account?{" "}
                            <Link
                                to="/signup"
                                className="font-bold text-violet-600 transition hover:text-violet-700"
                            >
                                Create an account
                            </Link>
                        </p>

                        {/* Back home */}
                        <div className="mt-6 text-center">
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