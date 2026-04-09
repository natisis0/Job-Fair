import Header from "./components/header";
import ReviewsSection from "./components/reviews";

export default function Reviews() {
  return (
    <section
      className="bg-[#f0fafa] w-full pt-32 pb-28 -mt-[4vw] relative z-10"
      style={{ clipPath: "polygon(0 4vw, 50% 0, 100% 4vw, 100% 100%, 0 100%)" }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8 flex flex-col items-center">
        <Header />
        <ReviewsSection />
      </div>
    </section>
  );
}
