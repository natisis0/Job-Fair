"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import RegisterCompanyModal from "./RegisterCompanyModal";
import RegisterCandidateModal from "./RegisterCandidateModal";

export default function ButtonsInHeroSection({ event, eventId }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [candidateModalOpen, setCandidateModalOpen] = useState(false);

  const isFull = event.participants_count >= event.available_tickets;

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="bg-[#36B3BA] text-white px-7 py-2.5 rounded-full hover:bg-[#2fa1a6] transition-all text-sm"
      >
        Register as a Company
      </button>

      {isFull ? (
        <button
          disabled
          className="bg-gray-500/20 backdrop-blur-md text-gray-400 border border-white/10 px-7 py-2.5 rounded-full cursor-not-allowed text-sm"
        >
          Event Full
        </button>
      ) : (
        <button
          onClick={() => setCandidateModalOpen(true)}
          className="bg-white/10 backdrop-blur-md text-white border border-white/40 px-7 py-2.5 rounded-full hover:border-[#36B3BA] transition-all text-sm"
        >
          Join as Candidate
        </button>
      )}

      {modalOpen &&
        createPortal(
          <RegisterCompanyModal
            eventId={eventId}
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
          />,
          document.body,
        )}

      {candidateModalOpen &&
        createPortal(
          <RegisterCandidateModal
            eventId={eventId}
            isOpen={candidateModalOpen}
            onClose={() => setCandidateModalOpen(false)}
          />,
          document.body,
        )}
    </>
  );
}
