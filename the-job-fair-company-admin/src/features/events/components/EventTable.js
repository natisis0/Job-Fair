"use client";

import toast from "react-hot-toast";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { updateEvent } from "@/features/events/actions/updateEvent";
import { deleteEvent } from "@/features/events/actions/deleteEvent";

function formatDate(value) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  // Stable, locale-independent format to avoid hydration mismatches
  return date.toISOString().slice(0, 10);
}

export default function EventTable({ events }) {
  const router = useRouter();
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!events || events.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
        No events yet. Create your first event to get started.
      </div>
    );
  }

  const handleRowClick = (eventId) => {
    router.push(`/admin/events/${eventId}`);
  };

  const toggleMenu = (e, eventId) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === eventId ? null : eventId);
  };

  const handleDeleteEvent = (e, eventId) => {
    e.stopPropagation();
    toast((t) => (
      <div className="flex flex-col gap-3">
        <span className="text-sm font-medium text-slate-800">
          Are you sure you want to delete this event?
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
              const result = await deleteEvent(eventId);
              if (result?.error) {
                toast.error(result.error);
              } else {
                toast.success("Event deleted successfully");
                setOpenMenuId(null);
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
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-white/40 bg-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200/50 text-sm">
          <thead className="bg-slate-50/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                Event Details
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                Organizer
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                Schedule & Location
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                Status
              </th>
              <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500">
                Metrics
              </th>
              <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/50 bg-transparent">
            {events.map((event) => (
              <tr
                key={event.id}
                onClick={() => handleRowClick(event.id)}
                className="group cursor-pointer transition-colors hover:bg-white/80"
              >
              <td className="px-6 py-5 align-middle">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-100 to-cyan-100 text-indigo-700 font-bold border border-white/60 shadow-sm transition-transform group-hover:scale-110">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-800">
                      {event.title}
                    </div>
                    {event.event_type ? (
                      <div className="mt-1 inline-flex items-center rounded-md bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 shadow-sm">
                        {event.event_type}
                      </div>
                    ) : null}
                  </div>
                </div>
              </td>
              <td className="px-6 py-5 align-middle text-sm font-medium text-slate-600">
                {event.organizer || <span className="text-slate-400 italic">Not set</span>}
              </td>
              <td className="px-6 py-5 align-middle">
                <div className="flex flex-col gap-1.5 text-sm">
                  <div className="flex items-center gap-1.5 text-slate-600 font-semibold">
                    <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {formatDate(event.event_date)}
                  </div>
                  <div className="flex items-center gap-1.5 font-medium text-slate-500">
                    <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {event.venue || event.location || "TBA"}
                  </div>
                </div>
              </td>
              <td className="px-6 py-5 align-middle">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold shadow-sm ${
                    event.status === "active"
                      ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                      : "bg-slate-100 text-slate-600 border border-slate-200"
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${event.status === "active" ? "bg-emerald-500" : "bg-slate-400"}`} />
                  {event.status === "active" ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="px-6 py-5 align-middle text-center">
                <div className="inline-flex divide-x divide-slate-200/50 rounded-xl border border-slate-200 bg-white/50 text-xs shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
                  <div className="px-3 py-1.5 flex flex-col items-center justify-center gap-0.5" title="Participants">
                    <span className="font-bold text-slate-800">{event.participants_count ?? 0}</span>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Ppl</span>
                  </div>
                  <div className="px-3 py-1.5 flex flex-col items-center justify-center gap-0.5" title="Companies">
                    <span className="font-bold text-indigo-600">{event.companies_count ?? 0}</span>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Co.</span>
                  </div>
                  <div className="px-3 py-1.5 flex flex-col items-center justify-center gap-0.5" title="Available Tickets">
                    <span className="font-bold text-cyan-600">{event.available_tickets ?? 0}</span>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Tix</span>
                  </div>
                </div>
              </td>
              <td className="px-6 py-5 align-middle text-right">
                <div className="relative flex justify-center" ref={openMenuId === event.id ? menuRef : null}>
                  <button
                    onClick={(e) => toggleMenu(e, event.id)}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:bg-slate-50 hover:text-indigo-600 active:scale-95"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>

                  {openMenuId === event.id && (
                    <div 
                      className="absolute right-0 top-full z-50 mt-2 w-48 origin-top-right overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl ring-1 ring-black/5 focus:outline-none"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="p-1.5">
                        <form action={updateEvent}>
                          <input type="hidden" name="id" value={event.id} />
                          <input
                            type="hidden"
                            name="status"
                            value={event.status === "active" ? "inactive" : "active"}
                          />
                          <button
                            type="submit"
                            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-xs font-bold text-slate-600 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
                          >
                            {event.status === "active" ? (
                              <>
                                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                                Deactivate Event
                              </>
                            ) : (
                              <>
                                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                Activate Event
                              </>
                            )}
                          </button>
                        </form>

                        <Link
                          href={`/admin/events/${event.id}/companies`}
                          className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-slate-600 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
                        >
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h18v18H3V3z" /></svg>
                          Linked Companies
                        </Link>

                        <Link
                          href={`/admin/events/${event.id}/speakers`}
                          className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-slate-600 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
                        >
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" /></svg>
                          Event Speakers
                        </Link>

                        <div className="my-1 border-t border-slate-100" />

                        <button
                          onClick={(e) => handleDeleteEvent(e, event.id)}
                          className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-xs font-bold text-red-600 transition-colors hover:bg-red-50"
                        >
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                          Delete Event
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    </div>
  );
}

