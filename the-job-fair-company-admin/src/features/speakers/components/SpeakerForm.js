"use client";

import { useTransition } from "react";
import toast from "react-hot-toast";
import { createSpeaker } from "@/features/speakers/actions/createSpeaker";
import { updateSpeaker } from "@/features/speakers/actions/updateSpeaker";

export default function SpeakerForm({ eventId, initialData, onComplete }) {
  const [isPending, startTransition] = useTransition();
  const isEditing = !!initialData?.id;

  async function handleSubmit(formData) {
    startTransition(async () => {
      const result = isEditing 
        ? await updateSpeaker(formData)
        : await createSpeaker(formData);

      if (result?.error) {
        toast.error(result.error);
        return;
      }

      toast.success(isEditing ? "Speaker updated" : "Speaker added");
      if (onComplete) onComplete();
    });
  }

  return (
    <form action={handleSubmit} className="space-y-5 rounded-2xl border border-slate-200 bg-white/50 p-6 shadow-sm backdrop-blur-sm">
      <input type="hidden" name="event_id" value={eventId} />
      {isEditing && <input type="hidden" name="id" value={initialData.id} />}
      
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Name</label>
          <input
            name="name"
            required
            defaultValue={initialData?.name}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Title</label>
          <input
            name="title"
            defaultValue={initialData?.title}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            placeholder="Keynote Speaker / CEO"
          />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Instagram URL</label>
          <input
            name="instagram"
            defaultValue={initialData?.instagram}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            placeholder="https://instagram.com/..."
          />
        </div>
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">LinkedIn URL</label>
          <input
            name="linkedin"
            defaultValue={initialData?.linkedin}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            placeholder="https://linkedin.com/in/..."
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Speaker Photo</label>
        <div className="flex items-center gap-4">
          {initialData?.image_url && (
            <div className="h-16 w-16 overflow-hidden rounded-xl border border-slate-200">
              <img src={initialData.image_url} alt={initialData.name} className="h-full w-full object-cover" />
            </div>
          )}
          <input
            type="file"
            name="image_file"
            accept="image/*"
            className="w-full text-xs text-slate-500 file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-3 file:py-2 file:text-[10px] file:font-bold file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>
        <input type="hidden" name="image_url" defaultValue={initialData?.image_url} />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        {onComplete && (
          <button
            type="button"
            onClick={onComplete}
            className="rounded-xl px-4 py-2 text-xs font-bold text-slate-500 transition-colors hover:bg-slate-100"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isPending}
          className="rounded-xl bg-indigo-600 px-6 py-2 text-xs font-bold text-white shadow-md transition-all hover:bg-indigo-700 disabled:opacity-50"
        >
          {isPending ? "Saving..." : isEditing ? "Update Speaker" : "Add Speaker"}
        </button>
      </div>
    </form>
  );
}
