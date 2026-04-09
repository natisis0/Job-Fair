import StatsCard from "./statsCard";

export default function Stats() {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 md:px-8 -mt-10 mb-16 relative z-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        <StatsCard number="2,500+" label="Successful Connections" />
        <StatsCard number="150+" label="Partner Companies" />
        <StatsCard number="50+" label="Events Hosted" />
        <StatsCard number="95%" label="Successful Rate" />
      </div>
    </section>
  );
}
