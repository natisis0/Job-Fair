export default function ReviewCard({ name, role, review }) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col h-full border border-gray-100">
      <div className="mb-4">
        <h4 className="text-[#1A1A1A] font-bold text-base leading-tight">
          {name}
        </h4>
        <p className="text-[#888] text-[11px] font-medium uppercase tracking-wider mt-0.5">
          {role}
        </p>
      </div>
      <p className="text-[#555] text-[13px] leading-relaxed italic">
        &quot;{review}&quot;
      </p>
    </div>
  );
}
