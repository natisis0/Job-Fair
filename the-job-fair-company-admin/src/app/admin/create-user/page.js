"use client";

import { useState } from "react";
import { createAdminUser } from "./actions";
import { toast } from "react-hot-toast";

export default function CreateUserPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");

    try {
      const result = await createAdminUser(formData);

      if (result.success) {
        toast.success(`User ${email} created successfully!`);
        e.target.reset();
      } else {
        toast.error(result.error || "Failed to create user");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-slate-800">
          Create New Admin User
        </h2>
        <p className="mt-1 text-sm font-medium text-slate-500">
          Provision a new administrator account. Public signups are restricted.
        </p>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-white/40 bg-white/60 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl">
        {/* Soft decorative glow */}
        <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-indigo-400/10 blur-3xl" />
        
        <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-slate-700"
            >
              Email Address
            </label>
            <input
              required
              type="email"
              id="email"
              name="email"
              placeholder="admin@example.com"
              className="w-full rounded-2xl border border-white/40 bg-white/50 px-4 py-3 text-slate-800 shadow-sm outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-slate-700"
            >
              Temporary Password
            </label>
            <input
              required
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              minLength={8}
              className="w-full rounded-2xl border border-white/40 bg-white/50 px-4 py-3 text-slate-800 shadow-sm outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center rounded-2xl bg-linear-to-r from-indigo-500 to-cyan-500 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.02] hover:shadow-indigo-500/40 active:scale-100 disabled:opacity-70"
          >
            {loading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : (
              "Create User Account"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}