import FeatureSection from "@/features/featureSection";
import Footer from "@/features/footer";
import Header from "@/features/header";
import HeroSection from "@/features/HeroSection";

export default function page() {
  return (
    <div className="bg-[url('/images/waves.png')] bg-repeat-y bg-center min-h-screen flex flex-col">
      <Header />
      <HeroSection whyToUseJobfair={true} />
      <FeatureSection />
      <Footer />
    </div>
  );
}
