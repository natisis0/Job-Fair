import { FiPlus } from "react-icons/fi";

export default function AddReviewCard() {
  return (
    <button className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col items-center justify-center h-full min-h-40 w-full border border-dashed border-[#b6e8ea] hover:bg-cyan-50/30 group">
      <div className="bg-[#E4FAFB] rounded-full p-3 mb-2 group-hover:bg-[#d0f3f5] transition-colors">
        <FiPlus className="w-6 h-6 text-[#36B3BA]" />
      </div>
      <span className="text-[#322e2e] text-[13px] font-semibold">
        Add Yours
      </span>
    </button>
  );
}
