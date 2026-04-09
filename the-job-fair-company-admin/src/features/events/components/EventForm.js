"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createEvent } from "@/features/events/actions/createEvent";
import { updateEvent } from "@/features/events/actions/updateEvent";

export default function EventForm({ initialData }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [previews, setPreviews] = useState([]);
  const isEditing = !!initialData?.id;

  const existingPhotos = initialData?.photos || [];
  const maxPhotos = 6;
  const remainingSlots = maxPhotos - existingPhotos.length;

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  function handleFileChange(e) {
    const files = Array.from(e.target.files);
    
    // Check for large files
    const largeFiles = files.filter(file => file.size > MAX_FILE_SIZE);
    if (largeFiles.length > 0) {
      toast.error("Each photo must be less than 5MB.");
      e.target.value = "";
      setPreviews([]);
      return;
    }

    if (files.length > remainingSlots) {
      toast.error(`You can only upload up to ${remainingSlots} more photos.`);
      e.target.value = "";
      setPreviews([]);
      return;
    }

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);
  }

  function handleSubmit(formData) {
    const heroImageFile = formData.get("hero_image_file");
    const photos = formData.getAll("photos");

    // Proactive check for hero image size
    if (heroImageFile && heroImageFile.size > MAX_FILE_SIZE) {
      toast.error("Hero image must be less than 5MB.");
      return;
    }

    // Proactive check for photos size
    for (const photo of photos) {
      if (photo && photo instanceof File && photo.size > MAX_FILE_SIZE) {
        toast.error("All photos must be less than 5MB.");
        return;
      }
    }

    startTransition(async () => {
      try {
        const result = isEditing
          ? await updateEvent(formData)
          : await createEvent(formData);

        if (result?.error) {
          toast.error(result.error);
          return;
        }

        toast.success(isEditing ? "Event updated" : "Event created");
        router.push("/admin/events");
        router.refresh();
      } catch (err) {
        console.error("Form submission error:", err);
        toast.error("An unexpected error occurred. Please try again.");
      }
    });
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {isEditing && <input type="hidden" name="id" value={initialData.id} />}

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Title
          </label>
          <input
            name="title"
            required
            defaultValue={initialData?.title}
            className="w-full rounded-xl border border-white/50 bg-white/60 px-4 py-3 text-sm font-medium text-slate-800 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
            placeholder="Tech Careers Fair 2026"
          />
        </div>
        <div className="space-y-2.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Organizer
          </label>
          <input
            name="organizer"
            defaultValue={initialData?.organizer}
            className="w-full rounded-xl border border-white/50 bg-white/60 px-4 py-3 text-sm font-medium text-slate-800 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
            placeholder="The Job Fair Co."
          />
        </div>
      </div>

      <div className="space-y-2.5">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
          Description
        </label>
        <textarea
          name="description"
          rows={3}
          defaultValue={initialData?.description}
          className="w-full resize-none rounded-xl border border-white/50 bg-white/60 px-4 py-3 text-sm font-medium text-slate-800 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
          placeholder="Detailed summary of the event... engage your audience!"
        />
      </div>

      {/* Photo Upload Section */}
      <div className="space-y-4 border-t border-slate-200/50 pt-6">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Event Photos ({existingPhotos.length + previews.length} / 6)
          </label>
          {remainingSlots > 0 && (
            <span className="text-[10px] font-medium text-slate-400">
              Only {remainingSlots} slots left
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {/* Existing Photos */}
          {existingPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              className="group relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-sm"
            >
              <img
                src={photo.image_url}
                alt={`Event photo ${idx + 1}`}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          ))}

          {/* New Photo Previews */}
          {previews.map((url, idx) => (
            <div
              key={idx}
              className="group relative aspect-square overflow-hidden rounded-xl border border-indigo-200 bg-indigo-50 shadow-sm ring-2 ring-indigo-500/20"
            >
              <img
                src={url}
                alt={`New photo preview ${idx + 1}`}
                className="h-full w-full object-cover"
              />
              <div className="absolute top-1 right-1 rounded-full bg-indigo-500 p-0.5 text-white shadow-sm">
                <svg
                  className="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
          ))}

          {/* Upload Button */}
          {remainingSlots > 0 && (
            <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 text-slate-400 transition-all hover:border-indigo-300 hover:bg-white hover:text-indigo-500">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span className="mt-1 text-[10px] font-bold uppercase">Add</span>
              <input
                type="file"
                name="photos"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                disabled={remainingSlots <= 0}
              />
            </label>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-2.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Event type
          </label>
          <input
            name="event_type"
            defaultValue={initialData?.event_type}
            className="w-full rounded-xl border border-white/50 bg-white/60 px-4 py-3 text-sm font-medium text-slate-800 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
            placeholder="e.g. Virtual, Hybrid"
          />
        </div>
        <div className="space-y-2.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Eligibility
          </label>
          <input
            name="eligibility"
            defaultValue={initialData?.eligibility}
            className="w-full rounded-xl border border-white/50 bg-white/60 px-4 py-3 text-sm font-medium text-slate-800 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
            placeholder="Students, grads..."
          />
        </div>
        <div className="space-y-2.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Available tickets
          </label>
          <input
            name="available_tickets"
            type="number"
            min={0}
            defaultValue={initialData?.available_tickets ?? 100}
            className="w-full rounded-xl border border-white/50 bg-white/60 px-4 py-3 text-sm font-medium text-slate-800 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Location
          </label>
          <input
            name="location"
            defaultValue={initialData?.location}
            className="w-full rounded-xl border border-white/50 bg-white/60 px-4 py-3 text-sm font-medium text-slate-800 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
            placeholder="City / Country"
          />
        </div>
        <div className="space-y-2.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Venue
          </label>
          <input
            name="venue"
            defaultValue={initialData?.venue}
            className="w-full rounded-xl border border-white/50 bg-white/60 px-4 py-3 text-sm font-medium text-slate-800 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
            placeholder="Convention Center Hall A"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 border-t border-slate-200/50 pt-6">
        <div className="space-y-2.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Event Date
          </label>
          <input
            name="event_date"
            type="date"
            required
            defaultValue={
              initialData?.event_date
                ? new Date(initialData.event_date).toISOString().split("T")[0]
                : ""
            }
            className="w-full rounded-xl border border-white/50 bg-white/60 px-4 py-3 text-sm font-medium text-slate-800 shadow-sm outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
          />
        </div>
        <div className="space-y-2.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Event Time
          </label>
          <input
            name="event_time"
            type="time"
            defaultValue={initialData?.event_time}
            className="w-full rounded-xl border border-white/50 bg-white/60 px-4 py-3 text-sm font-medium text-slate-800 shadow-sm outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
          />
        </div>
        <div className="space-y-2.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Hero Image
          </label>
          <div className="flex items-center gap-4">
            {initialData?.hero_image && (
              <div className="h-16 w-16 overflow-hidden rounded-xl border border-slate-200">
                <img 
                  src={initialData.hero_image} 
                  alt="Current hero" 
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <input
              type="file"
              name="hero_image_file"
              accept="image/*"
              className="w-full text-sm text-slate-500 file:mr-4 file:rounded-xl file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-xs file:font-bold file:text-indigo-700 hover:file:bg-indigo-100"
            />
          </div>
          <input type="hidden" name="hero_image" defaultValue={initialData?.hero_image || "/images/event.png"} />
        </div>
      </div>

      <div className="mt-8 flex items-center justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-xl px-4 py-2.5 text-sm font-bold text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="group inline-flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-6 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:scale-105 hover:shadow-[0_8px_20px_rgba(99,102,241,0.3)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending
            ? isEditing
              ? "Updating..."
              : "Creating..."
            : isEditing
              ? "Update Event"
              : "Save New Event"}
        </button>
      </div>
    </form>
  );
}
