"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 w-full max-w-md">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        {/* Fullname */}
        <div className="space-y-2">
          <label
            htmlFor="fullname"
            className="block text-sm font-medium text-gray-700"
          >
            Your fullname*
          </label>
          <input
            type="text"
            id="fullname"
            placeholder="Enter name here"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3bc3c1] focus:border-transparent transition-all"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address*
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter email address"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3bc3c1] focus:border-transparent transition-all"
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Create password*
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter password"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3bc3c1] focus:border-transparent transition-all pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* Terms */}
        <div className="flex items-center space-x-2 pt-1">
          <input
            type="checkbox"
            id="terms"
            className="w-4 h-4 text-[#3bc3c1] rounded border-gray-300 focus:ring-[#3bc3c1]"
          />
          <label htmlFor="terms" className="text-sm text-gray-600">
            I agree to terms & conditions
          </label>
        </div>

        {/* Register Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-[#3bc3c1] hover:bg-[#32abaa] text-white font-medium py-3 rounded-xl transition-colors"
          >
            Register Account
          </button>
        </div>
      </form>

      {/* Divider */}
      <div className="relative flex items-center py-6">
        <div className="grow border-t border-gray-200"></div>
        <span className="shrink-0 mx-4 text-gray-400 text-sm">Or</span>
        <div className="grow border-t border-gray-200"></div>
      </div>

      {/* Google Button */}
      <button
        type="button"
        className="w-full flex items-center justify-center space-x-2 bg-white border border-gray-300 text-gray-700 font-medium py-3 rounded-xl hover:bg-gray-50 transition-colors"
      >
        <FcGoogle className="text-xl" />
        <span>Register with Google</span>
      </button>
    </div>
  );
}
