import Header from "./components/header";
import PastEventCards from "./components/PastEventCards";

export default function PastEvents() {
  return (
    <section className="bg-[#36B3BA] w-full py-20 pb-28">
      <div className="max-w-6xl mx-auto px-6 md:px-8 flex flex-col items-center">
        <Header />
        <PastEventCards />
      </div>
    </section>
  );
}
