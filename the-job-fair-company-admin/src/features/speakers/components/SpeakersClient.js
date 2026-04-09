"use client";

import { useState } from "react";
import SpeakerForm from "@/features/speakers/components/SpeakerForm";
import { deleteSpeaker } from "@/features/speakers/actions/deleteSpeaker";
import toast from "react-hot-toast";
import Link from "next/link";

export default function SpeakersClient({ eventId, initialSpeakers }) {
  const [speakers, setSpeakers] = useState(initialSpeakers);
  const [editingSpeaker, setEditingSpeaker] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  async function handleDelete(id) {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <span className="text-sm font-medium text-slate-800">
          Are you sure you want to delete this speaker?
        </span>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 transition-colors hover:bg-slate-200"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              const result = await deleteSpeaker(id, eventId);
              if (result.error) {
                toast.error(result.error);
              } else {
                toast.success("Speaker deleted");
                setSpeakers(speakers.filter((s) => s.id !== id));
              }
            }}
            className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    ), {
      duration: 6000,
      position: "top-center",
    });
  }

  function handleComplete() {
    setShowAddForm(false);
    setEditingSpeaker(null);
    window.location.reload(); // Quick way to refresh server component data
  }

  return (
    <div className="space-y-8">
      {/* Add / Edit Form */}
      {(showAddForm || editingSpeaker) && (
        <div className="rounded-3xl bg-indigo-50/50 p-1 ring-1 ring-indigo-50/10">
          <div className="rounded-[22px] bg-white p-6 shadow-xl shadow-indigo-200/20">
            <h2 className="mb-6 text-lg font-bold text-slate-800">
              {editingSpeaker ? `Edit ${editingSpeaker.name}` : "Add New Speaker"}
            </h2>
            <SpeakerForm 
              eventId={eventId} 
              initialData={editingSpeaker} 
              onComplete={handleComplete}
            />
          </div>
        </div>
      )}

      {/* List Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-800">Speakers ({speakers.length})</h3>
        {!showAddForm && !editingSpeaker && (
          <button
            onClick={() => setShowAddForm(true)}
            className="group flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-indigo-700 active:scale-95"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Speaker
          </button>
        )}
      </div>

      {/* Speakers Table */}
      <div className="overflow-hidden rounded-3xl border border-slate-200/60 bg-white/70 shadow-sm backdrop-blur-md">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-slate-50/50">
            <tr>
              <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-[11px]">Speaker</th>
              <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-[11px]">Social Info</th>
              <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-[11px] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {speakers.map((speaker) => (
              <tr key={speaker.id} className="group transition-colors hover:bg-slate-50/40">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 overflow-hidden rounded-xl border border-slate-100 shadow-sm">
                      <img 
                        src={speaker.image_url || "/images/speaker.png"} 
                        alt={speaker.name} 
                        className="h-full w-full object-cover transition-transform group-hover:scale-110"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-slate-800">{speaker.name}</div>
                      <div className="text-xs font-medium text-slate-400">{speaker.title}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1 text-[10px] font-bold">
                    {speaker.instagram && (
                      <Link
                        href={speaker.instagram} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-pink-600 hover:underline"
                      >
                        Instagram: {speaker.instagram.split('/').pop()}
                      </Link>
                    )}
                    {speaker.linkedin && (
                      <Link 
                        href={speaker.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        LinkedIn: {speaker.linkedin.split('/').pop()}
                      </Link>
                    )}
                    {!speaker.instagram && !speaker.linkedin && (
                      <span className="text-slate-300 italic">No social info</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => {
                        setEditingSpeaker(speaker);
                        setShowAddForm(false);
                      }}
                      className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:text-indigo-600 shadow-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(speaker.id)}
                      className="rounded-xl border border-red-100 bg-white px-3 py-1.5 text-xs font-bold text-red-600 transition-all hover:-translate-y-0.5 hover:border-red-300 hover:bg-red-50 shadow-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {speakers.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-12 text-center text-slate-400 italic">
                  No speakers assigned to this event yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
