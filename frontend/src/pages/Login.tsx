import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Wallet, Eye, EyeOff, CheckCircle } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

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
            Take control of your finances.
          </h2>

          <p className="text-slate-300 mt-6 text-lg">
            Track your expenses, manage budgets and connect
            your bank accounts in one place.
          </p>

          <div className="space-y-5 mt-10">
            {[
              "Smart expense tracking",
              "Secure bank connections",
              "Personalized budgets",
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
            Welcome back
          </h2>

          <p className="text-muted mt-3">
            Enter your details to access your account.
          </p>

          <form
            className="mt-8 space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              navigate("/dashboard");
            }}
          >

            {/* Email */}
            <div>
              <label htmlFor="email" className="block font-medium mb-2">
                Email address
              </label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
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
                  placeholder="Enter your password"
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

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Sign In
            </button>

          </form>

          <p className="text-center text-muted mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary font-semibold"
            >
              Create account
            </Link>
          </p>

          <p className="text-center text-xs text-muted mt-6">
            Prototype only — use fictional login details.
          </p>

        </div>
      </div>
    </div>
  );
}