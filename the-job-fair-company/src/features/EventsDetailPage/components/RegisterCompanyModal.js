"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { registerCompanyForEvent, getCompanyByEmail } from "@/utils/actions";
import { FiX, FiCheckCircle, FiUploadCloud } from "react-icons/fi";

export default function RegisterCompanyModal({ eventId, isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [pending, setPending] = useState(false);
  const [email, setEmail] = useState("");
  const [companyData, setCompanyData] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  if (!isOpen) return null;

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Logo file size must be less than 10MB");
        e.target.value = "";
        return;
      }
      const url = URL.createObjectURL(file);
      setLogoPreview(url);
    } else {
      setLogoPreview(null);
    }
  }

  async function handleNextStep(e) {
    if (e) e.preventDefault();
    if (!email) return toast.error("Please enter your email.");

    setPending(true);
    try {
      const res = await getCompanyByEmail(email);
      if (res.success) {
        setCompanyData(res.data);
        setStep(2);
      } else {
        toast.error(res.error || "Search failed.");
      }
    } catch (err) {
      toast.error("Error searching for your company.");
    } finally {
      setPending(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setPending(true);

    const formData = new FormData(e.target);
    const logoFile = formData.get("logo");

    if (logoFile && logoFile.size > 10 * 1024 * 1024) {
      toast.error("Logo file size must be less than 10MB");
      setPending(false);
      return;
    }

    formData.append("eventId", eventId);
    formData.append("email", email);

    try {
      const result = await registerCompanyForEvent(formData);
      setPending(false);

      if (result.success) {
        toast.success(result.message);
        onClose();
      } else {
        toast.error(result.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      toast.error("An unexpected error occurred. Please try again.");
      setPending(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="absolute top-0 left-0 w-full h-2 bg-[#36B3BA]" />
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 hover:rotate-90 transition-all duration-300"
        >
          <FiX className="w-6 h-6" />
        </button>

        <div className="p-8 pt-10">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">
              {step === 1 ? "Company Registration" : "Finish Registration"}
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              {step === 1 
                ? "First, verify your company email address." 
                : companyData 
                  ? "Welcome back! Confirm your details below."
                  : "We're excited to have you! Fill in your details."}
            </p>
          </div>

          {step === 1 ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[#36B3BA] opacity-80">
                  Company Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="contact@company.com"
                    className="w-full border-2 border-slate-100 bg-slate-50/50 rounded-2xl px-5 py-4 text-sm text-slate-700 placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-[#36B3BA]/10 focus:border-[#36B3BA] transition-all"
                  />
                </div>
              </div>

              <button
                onClick={handleNextStep}
                disabled={pending || !email}
                className="w-full group relative overflow-hidden bg-[#36B3BA] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#2fa1a6] transition-all shadow-xl shadow-[#36B3BA]/20 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0"
              >
                <span className="relative z-10">
                  {pending ? "Checking..." : "Continue"}
                </span>
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
              </button>
            </div>
          ) : companyData ? (
            /* Quick Join for Existing Companies */
            <form onSubmit={handleSubmit} className="space-y-8 animate-in slide-in-from-right duration-500">
              <div className="flex flex-col items-center text-center">
                <div className="h-20 w-20 rounded-3xl bg-indigo-50 flex items-center justify-center text-indigo-500 mb-4 border border-indigo-100 shadow-sm overflow-hidden">
                  {companyData.images ? (
                    <img src={companyData.images} alt="Logo" className="w-full h-full object-contain p-2" />
                  ) : (
                    <FiCheckCircle className="w-10 h-10" />
                  )}
                </div>
                <h3 className="text-xl font-black text-slate-800">{companyData.name}</h3>
                <p className="text-sm text-slate-500 mt-1">{email}</p>
              </div>

              {/* Hidden inputs to maintain form data structure for existing action */}
              <input type="hidden" name="name" value={companyData.name} />

              <div className="flex flex-col gap-3">
                <button
                  type="submit"
                  disabled={pending}
                  className="w-full group relative overflow-hidden bg-[#36B3BA] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#2fa1a6] transition-all shadow-xl shadow-[#36B3BA]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10">
                    {pending ? "Joining..." : "Join Event Now"}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-slate-400 text-xs font-bold uppercase tracking-widest hover:text-slate-600 transition-colors"
                >
                  Not your company? Change Email
                </button>
              </div>
            </form>
          ) : (
            /* Full Registration for New Companies */
            <form onSubmit={handleSubmit} className="space-y-6 animate-in slide-in-from-right duration-500">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[#36B3BA] opacity-80">
                  Company Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Acme Inc."
                  className="w-full border-2 border-slate-100 bg-slate-50/50 rounded-2xl px-5 py-4 text-sm text-slate-700 placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-[#36B3BA]/10 focus:border-[#36B3BA] transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[#36B3BA] opacity-80">
                  Company Logo
                </label>
                <div className="relative group">
                  <input
                    type="file"
                    name="logo"
                    accept="image/*"
                    required
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10 h-full w-full"
                  />
                  {logoPreview ? (
                    <div className="flex flex-col items-center justify-center w-full min-h-30 border-2 border-[#36B3BA] bg-[#36B3BA]/5 rounded-2xl p-4 text-center transition-all">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={logoPreview} alt="Logo preview" className="max-h-24 max-w-full object-contain rounded-xl mb-2" />
                      <span className="text-xs font-bold text-[#36B3BA]">
                        Click to change
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center w-full min-h-30 border-2 border-dashed border-slate-200 bg-slate-50/50 rounded-2xl group-hover:border-[#36B3BA] group-hover:bg-[#36B3BA]/5 transition-all p-6 text-center">
                      <FiUploadCloud className="w-8 h-8 text-slate-300 group-hover:text-[#36B3BA] mb-2 transition-colors" />
                      <span className="text-xs font-bold text-slate-400 group-hover:text-slate-600">
                        Click or drag your logo here
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-4">
                <button
                  type="submit"
                  disabled={pending}
                  className="w-full group relative overflow-hidden bg-[#36B3BA] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#2fa1a6] transition-all shadow-xl shadow-[#36B3BA]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10">
                    {pending ? "Processing..." : "Register & Join"}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-slate-400 text-xs font-bold uppercase tracking-widest hover:text-slate-600 transition-colors"
                >
                  Go Back
                </button>
              </div>
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-slate-50 text-center">
            <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest leading-relaxed">
              Secure registration powered by<br />
              <span className="text-slate-400">The Job Fair Official Platform</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
