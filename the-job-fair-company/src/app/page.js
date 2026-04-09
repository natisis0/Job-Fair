import Footer from "@/features/footer";
import Header from "@/features/header";
import HeroSection from "@/features/HeroSection";
import PastEvents from "@/features/pastEvents";
import Reviews from "@/features/reviews";
import Stats from "@/features/stats";
import UpcomingEvents from "@/features/upcomingEvents";

export default async function Home({ searchParams }) {
  const params = await searchParams;
  const filter = params.filter || "latest";

  return (
    <div>
      <Header />
      <HeroSection connect={true} />
      <Stats />
      <UpcomingEvents filter={filter} />
      <Reviews />
      <PastEvents />
      <Footer />
    </div>
  );
}
