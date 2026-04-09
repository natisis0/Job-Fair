"use client";

import { useState, useTransition, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createCompany } from "@/features/companies/actions/createCompany";
import { updateCompany } from "@/features/companies/actions/updateCompany";

export default function CompanyModal({ company, isOpen, onClose }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setMounted(true);
  }, []);

  const [selectedFileName, setSelectedFileName] = useState(
    company?.images?.split("/").pop() || ""
  );
  const [previewUrl, setPreviewUrl] = useState(null);
  const isEditing = !!company;

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Logo file size must be less than 5MB");
        e.target.value = "";
        setSelectedFileName("");
        setPreviewUrl(null);
        return;
      }
      setSelectedFileName(file.name);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setSelectedFileName("");
      setPreviewUrl(null);
    }
  };

  async function handleSubmit(formData) {
    const logoFile = formData.get("logo");

    if (logoFile && logoFile instanceof File && logoFile.size > 5 * 1024 * 1024) {
      toast.error("Logo file size must be less than 5MB");
      return;
    }

    startTransition(async () => {
      try {
        const action = isEditing ? updateCompany : createCompany;
        const result = await action(formData);
        
        if (result?.error) {
          toast.error(result.error);
          return;
        }
        
        toast.success(isEditing ? "Company updated" : "Company added");
        onClose();
        router.refresh();
      } catch (err) {
        console.error("Form submission error:", err);
        toast.error("An unexpected error occurred. Please try again.");
      }
    });
  }

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 backdrop-blur-sm p-4 transition-all duration-300">
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-white/40 bg-white/80 p-8 shadow-[0_20px_60px_rgb(0,0,0,0.1)] backdrop-blur-xl transition-all relative">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-linear-to-br from-indigo-500/10 to-cyan-500/10 blur-3xl" />
        
        <div className="relative z-10 mb-6 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-800">
              {isEditing ? "Edit Company" : "Add Company"}
            </h2>
            <p className="mt-1 text-xs font-medium text-slate-500">
              {isEditing ? `Updating details for ${company.name}` : "Create a company that can attend your events."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-800"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form action={handleSubmit} className="relative z-10 space-y-5">
          {isEditing && <input type="hidden" name="id" value={company.id} />}
          {isEditing && company.images && <input type="hidden" name="existing_logo" value={company.images} />}
          
          <div className="space-y-2.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Name
            </label>
            <input
              name="name"
              required
              defaultValue={company?.name || ""}
              className="w-full rounded-xl border border-white/50 bg-white/60 px-4 py-3 text-sm font-medium text-slate-800 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
              placeholder="e.g. Acme Corp"
            />
          </div>

          <div className="space-y-2.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Email
            </label>
            <input
              name="email"
              type="email"
              defaultValue={company?.email || ""}
              className="w-full rounded-xl border border-white/50 bg-white/60 px-4 py-3 text-sm font-medium text-slate-800 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
              placeholder="talent@company.com"
            />
          </div>

          <div className="space-y-2.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Booth Slot
            </label>
            <input
              name="booth_slot"
              defaultValue={company?.booth_slot || ""}
              className="w-full rounded-xl border border-white/50 bg-white/60 px-4 py-3 text-sm font-medium text-slate-800 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
              placeholder="e.g. A1, B2 or available"
            />
          </div>

          <div className="space-y-2.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Company Logo
            </label>
            <div className="group relative flex items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-4 transition-all hover:border-indigo-300 hover:bg-slate-50">
                    <input
                      type="file"
                      name="logo"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 cursor-pointer opacity-0"
                    />
                    {previewUrl ? (
                      <div className="relative h-24 w-24 overflow-hidden rounded-xl border border-white/60 shadow-inner">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="text-center">
                        <svg className="mx-auto h-8 w-8 text-slate-400 transition-colors group-hover:text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                        </svg>
                        <span className="mt-2 block text-xs font-medium text-slate-500 group-hover:text-indigo-600 truncate max-w-50">
                          {selectedFileName || "Click to upload logo"}
                        </span>
                      </div>
                    )}
            </div>
            {isEditing && company.images && selectedFileName === company.images.split("/").pop() && (
              <p className="mt-1 text-[10px] text-slate-400 italic">
                Current: {company.images.split('/').pop()}
              </p>
            )}
          </div>

          <div className="mt-8 flex items-center justify-end gap-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2.5 text-sm font-bold text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="group inline-flex items-center justify-center rounded-xl bg-linear-to-r from-indigo-500 to-cyan-500 px-6 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:scale-105 hover:shadow-[0_8px_20px_rgba(99,102,241,0.3)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? "Saving..." : isEditing ? "Update Company" : "Save Company"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
