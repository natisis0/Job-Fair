"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { getCandidateByEmail, registerCandidateForEvent } from "@/utils/actions";
import { FiX, FiArrowRight, FiArrowLeft } from "react-icons/fi";

export default function RegisterCandidateModal({ eventId, isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [pending, setPending] = useState(false);
  const [email, setEmail] = useState("");
  const [candidateData, setCandidateData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    university: "",
    field_of_study: "",
    graduation_year: "",
    skills: "",
    resume_url: "",
  });

  if (!isOpen) return null;

  async function handleEmailNext(e) {
    e.preventDefault();
    setPending(true);

    try {
      const result = await getCandidateByEmail(email);
      setPending(false);

      if (result.success) {
        if (result.data) {
          // Pre-fill found data
          setCandidateData({
            first_name: result.data.first_name || "",
            last_name: result.data.last_name || "",
            phone: result.data.phone || "",
            university: result.data.university || "",
            field_of_study: result.data.field_of_study || "",
            graduation_year: result.data.graduation_year || "",
            skills: result.data.skills ? result.data.skills.join(", ") : "",
            resume_url: result.data.resume_url || "",
          });
          toast.success("Found your profile! Please review and confirm.");
        } else {
          // New candidate logic
          toast.success("New email detected. Please fill in your details.");
        }
        setStep(2);
      } else {
        toast.error(result.error || "Could not search for email. Please try again.");
      }
    } catch (err) {
      toast.error("An unexpected error occurred.");
      setPending(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setPending(true);

    const formData = new FormData(e.target);
    formData.append("email", email);
    formData.append("eventId", eventId);

    try {
      const result = await registerCandidateForEvent(formData);
      setPending(false);

      if (result.success) {
        toast.success(result.message);
        onClose();
        setStep(1); // Reset for next use
      } else {
        toast.error(result.error || "Failed to register. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      toast.error("An unexpected error occurred.");
      setPending(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose} 
      />

      {/* Modal Container */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg mx-auto overflow-hidden animate-in">
        {/* Header */}
        <div className="px-8 pt-8 pb-4 flex justify-between items-start">
          <div>
            <h2 className="text-[#1A1A1A] text-2xl font-bold">
              {step === 1 ? "Welcome!" : "Complete Profile"}
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              {step === 1 
                ? "Enter your email to start your registration." 
                : "Verify your details to join the event."}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="flex px-8 gap-2 mb-6">
          <div className={`h-1.5 flex-1 rounded-full transition-all ${step >= 1 ? "bg-[#36B3BA]" : "bg-gray-100"}`} />
          <div className={`h-1.5 flex-1 rounded-full transition-all ${step >= 2 ? "bg-[#36B3BA]" : "bg-gray-100"}`} />
        </div>

        <div className="px-8 pb-8">
          {step === 1 ? (
            <form onSubmit={handleEmailNext} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full border border-gray-100 bg-gray-50 rounded-2xl px-5 py-4 text-sm text-[#1A1A1A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#36B3BA] transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={pending || !email}
                className="w-full bg-[#36B3BA] text-white py-4 rounded-2xl font-bold text-sm hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#36B3BA]/30 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {pending ? "Checking..." : "Continue"}
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1">First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    required
                    defaultValue={candidateData.first_name}
                    className="w-full border border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#36B3BA] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1">Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    required
                    defaultValue={candidateData.last_name}
                    className="w-full border border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#36B3BA] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  defaultValue={candidateData.phone}
                  className="w-full border border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#36B3BA] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1">University</label>
                <input
                  type="text"
                  name="university"
                  required
                  defaultValue={candidateData.university}
                  className="w-full border border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#36B3BA] transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1">Field of Study</label>
                  <input
                    type="text"
                    name="field_of_study"
                    required
                    defaultValue={candidateData.field_of_study}
                    className="w-full border border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#36B3BA] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1">Graduation Year</label>
                  <input
                    type="number"
                    name="graduation_year"
                    required
                    defaultValue={candidateData.graduation_year}
                    className="w-full border border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#36B3BA] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1">Skills (comma separated)</label>
                <input
                  type="text"
                  name="skills"
                  defaultValue={candidateData.skills}
                  placeholder="React, SQL, Python"
                  className="w-full border border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#36B3BA] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1">Resume Link (URL)</label>
                <input
                  type="text"
                  name="resume_url"
                  defaultValue={candidateData.resume_url}
                  placeholder="https://drive.google.com/..."
                  className="w-full border border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#36B3BA] transition-all"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-100 text-[#1A1A1A] py-3 rounded-2xl font-bold text-sm hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                >
                  <FiArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="submit"
                  disabled={pending}
                  className="flex-2 bg-[#1A1A1A] text-white py-3 rounded-2xl font-bold text-sm hover:-translate-y-0.5 hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {pending ? "Registering..." : "Complete Registration"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <style jsx>{`
        .animate-in {
          animation: modal-in 0.3s ease-out forwards;
        }
        @keyframes modal-in {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #36B3BA;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
