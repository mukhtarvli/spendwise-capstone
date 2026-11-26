import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Wallet, CheckCircle, Eye, EyeOff } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex">

      {/* Left Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-secondary text-white p-12 flex-col justify-between">

        <div className="flex items-center gap-3">
          <Wallet size={36} className="text-blue-400" />
          <h1 className="text-3xl font-bold">SpendWise</h1>
        </div>

        <div>
          <h2 className="text-5xl font-bold leading-tight">
            Build a better financial future.
          </h2>

          <p className="text-slate-300 mt-6 text-lg">
            Start managing your money smarter with SpendWise.
          </p>

          <div className="space-y-5 mt-10">
            {[
              "Understand your spending",
              "Set financial goals",
              "Manage your money in one place",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <CheckCircle className="text-blue-400" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-slate-400 text-sm">
          © 2026 SpendWise. All rights reserved.
        </p>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8">

        <div className="w-full max-w-md">

          <h2 className="text-4xl font-bold">
            Create your account
          </h2>

          <p className="text-muted mt-3">
            Start your financial journey today.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">

            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block font-medium mb-2">
                Full name
              </label>

              <input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full border border-border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block font-medium mb-2">
                Email address
              </label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block font-medium mb-2">
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border border-border rounded-lg px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-primary"
                />

                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-muted"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block font-medium mb-2">
                Confirm password
              </label>

              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full border border-border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div role="alert" className="bg-red-50 text-danger p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Create Account
            </button>

          </form>

          <p className="text-center text-muted mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-semibold">
              Sign in
            </Link>
          </p>

          <p className="text-center text-xs text-muted mt-6">
            Prototype only — use fictional registration details.
          </p>

        </div>
      </div>
    </div>
  );
}