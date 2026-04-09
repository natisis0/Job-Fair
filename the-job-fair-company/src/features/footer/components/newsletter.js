export default function Newsletter() {
  return (
    <div className="flex flex-col max-w-90">
      <h3 className="text-white font-semibold text-[16px] mb-4">
        Stay In The Loop
      </h3>
      <p className="text-[#a3a3a3] text-[14px] leading-relaxed mb-6">
        Join our mailing list to stay in the loop with our news letter.
      </p>

      <form className="relative w-full">
        <input
          type="email"
          placeholder="Enter your email address..."
          className="w-full h-14 rounded-full pl-6 pr-35 text-[14px] text-gray-700 bg-white border-white outline-none focus:ring-2 focus:ring-[#38C6CD]"
          required
        />
        <button
          type="submit"
          className="absolute right-1 top-1 bottom-1 bg-[#38C6CD] hover:bg-[#2FB4BA] text-white px-6 rounded-full text-[14px] font-medium transition-colors shadow-sm"
        >
          Subscribe Now
        </button>
      </form>
    </div>
  );
}
