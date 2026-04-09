"use client";

import { useState } from "react";
import CompanyLogo from "./CompanyLogo";

export default function AttendingCompanies({ companies }) {
  const [showAll, setShowAll] = useState(false);

  if (!companies || companies.length === 0) {
    return (
      <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
        <p className="text-gray-500 font-medium">
          No companies registered for this event yet.
        </p>
      </div>
    );
  }

  const displayedCompanies = showAll ? companies : companies.slice(0, 12);

  return (
    <section className="py-16 max-w-5xl mx-auto px-6 md:px-8">
      <div className="text-center mb-12">
        <h2 className="text-[#1A1A1A] text-3xl font-bold mb-2">
          Attending Companies
        </h2>
        <p className="text-gray-400 text-sm italic">
          Part of Lorem ipsum dolor
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {displayedCompanies.map((c, i) => (
          <CompanyLogo key={i} {...c} />
        ))}
      </div>

      {companies.length > 12 && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setShowAll(!showAll)}
            className="border-2 border-[#36B3BA] text-[#36B3BA] px-10 py-2.5 rounded-full font-bold text-sm hover:bg-[#36B3BA] hover:text-white transition-all"
          >
            {showAll ? "Show Less" : "View All"}
          </button>
        </div>
      )}
    </section>
  );
}
