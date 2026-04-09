"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createCandidate } from "@/features/candidates/actions/createCandidate";
import { updateCandidate } from "@/features/candidates/actions/updateCandidate";

export default function CandidateForm({ candidate = null }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const isEditing = !!candidate;

  async function handleSubmit(formData) {
    if (isEditing) {
      formData.append("id", candidate.id);
    }

    startTransition(async () => {
      try {
        const action = isEditing ? updateCandidate : createCandidate;
        const result = await action(formData);
        
        if (result?.error) {
          toast.error(result.error);
          return;
        }
        
        toast.success(isEditing ? "Candidate updated successfully" : "Candidate added successfully");
        router.push("/admin/candidates");
        router.refresh();
      } catch (err) {
        console.error("Form submission error:", err);
        toast.error("An unexpected error occurred. Please try again.");
      }
    });
  }

  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-white/40 bg-white/80 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl transition-all relative">
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-linear-to-br from-indigo-500/10 to-cyan-500/10 blur-3xl" />
      
      <div className="relative z-10 mb-8 border-b border-slate-200/50 pb-6">
        <h2 className="text-xl font-bold tracking-tight text-slate-800">
          {isEditing ? "Edit Candidate" : "Candidate Information"}
        </h2>
        <p className="mt-1 text-xs font-medium text-slate-500">
          {isEditing 
            ? `Updating details for ${candidate.first_name} ${candidate.last_name}` 
            : "Enter the details for the new candidate."}
        </p>
      </div>

      <form action={handleSubmit} className="relative z-10 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              First Name *
            </label>
            <input
              name="first_name"
              required
              defaultValue={candidate?.first_name || ""}
              className="w-full rounded-xl border border-white/50 bg-white/60 px-4 py-3 text-sm font-medium text-slate-800 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
              placeholder="e.g. John"
            />
          </div>

          <div className="space-y-2.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Last Name *
            </label>
            <input
              name="last_name"
              required
              defaultValue={candidate?.last_name || ""}
              className="w-full rounded-xl border border-white/50 bg-white/60 px-4 py-3 text-sm font-medium text-slate-800 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
              placeholder="e.g. Doe"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Email *
            </label>
            <input
              name="email"
              type="email"
              required
              defaultValue={candidate?.email || ""}
              className="w-full rounded-xl border border-white/50 bg-white/60 px-4 py-3 text-sm font-medium text-slate-800 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
              placeholder="john.doe@example.com"
            />
          </div>

          <div className="space-y-2.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Phone
            </label>
            <input
              name="phone"
              type="tel"
              defaultValue={candidate?.phone || ""}
              className="w-full rounded-xl border border-white/50 bg-white/60 px-4 py-3 text-sm font-medium text-slate-800 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
              placeholder="+1 234 567 8900"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              University
            </label>
            <input
              name="university"
              defaultValue={candidate?.university || ""}
              className="w-full rounded-xl border border-white/50 bg-white/60 px-4 py-3 text-sm font-medium text-slate-800 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
              placeholder="e.g. Harvard University"
            />
          </div>

          <div className="space-y-2.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Field of Study
            </label>
            <input
              name="field_of_study"
              defaultValue={candidate?.field_of_study || ""}
              className="w-full rounded-xl border border-white/50 bg-white/60 px-4 py-3 text-sm font-medium text-slate-800 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
              placeholder="e.g. Computer Science"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Graduation Year
            </label>
            <input
              name="graduation_year"
              type="number"
              min="1900"
              max="2100"
              defaultValue={candidate?.graduation_year || ""}
              className="w-full rounded-xl border border-white/50 bg-white/60 px-4 py-3 text-sm font-medium text-slate-800 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
              placeholder="e.g. 2024"
            />
          </div>

          <div className="space-y-2.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Status
            </label>
            <select
              name="status"
              defaultValue={candidate?.status || "active"}
              className="w-full rounded-xl border border-white/50 bg-white/60 px-4 py-3 text-sm font-medium text-slate-800 shadow-sm outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
            >
              <option value="active" className="font-semibold text-emerald-600">Active</option>
              <option value="inactive" className="font-semibold text-slate-500">Inactive</option>
            </select>
          </div>
        </div>

        <div className="space-y-2.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Skills (comma-separated)
          </label>
          <input
            name="skills"
            defaultValue={candidate?.skills ? candidate.skills.join(", ") : ""}
            className="w-full rounded-xl border border-white/50 bg-white/60 px-4 py-3 text-sm font-medium text-slate-800 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
            placeholder="React, Next.js, PostgreSQL"
          />
        </div>

        <div className="space-y-2.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Resume URL
          </label>
          <input
            name="resume_url"
            type="url"
            defaultValue={candidate?.resume_url || ""}
            className="w-full rounded-xl border border-white/50 bg-white/60 px-4 py-3 text-sm font-medium text-slate-800 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
            placeholder="https://example.com/resume.pdf"
          />
        </div>

        <div className="mt-8 flex items-center justify-end gap-4 pt-6 border-t border-slate-200/50">
          <button
            type="button"
            onClick={() => router.push("/admin/candidates")}
            className="rounded-xl px-4 py-2.5 text-sm font-bold text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="group inline-flex items-center justify-center rounded-xl bg-linear-to-r from-indigo-500 to-cyan-500 px-6 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:scale-105 hover:shadow-[0_8px_20px_rgba(99,102,241,0.3)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? "Saving..." : isEditing ? "Update Candidate" : "Save Candidate"}
          </button>
        </div>
      </form>
    </div>
  );
}
