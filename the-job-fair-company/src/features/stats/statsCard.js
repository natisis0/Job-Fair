export default function StatsCard({ number, label }) {
  return (
    <div className="bg-[#FFFFFF] rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] py-10 px-6 flex flex-col items-center justify-center text-center w-full min-w-50 hover:scale-105 transition-all duration-300">
      <h3 className="text-[#36B3BA] text-4xl md:text-[42px] font-bold mb-2">
        {number}
      </h3>
      <p className="text-[#333] text-[13px] font-semibold tracking-wide">
        {label}
      </p>
    </div>
  );
}
