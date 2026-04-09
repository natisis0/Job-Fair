import Connect from "./Components/connect";
import WhyToUseJobfair from "./Components/whyToUseJobfair";

export default function HeroSection({ connect, whyToUseJobfair }) {
  return (
    <>
      <div className="bg-[url('/images/waves.png')] bg-repeat-y bg-center w-full">
        {connect && <Connect />}
      </div>
      {whyToUseJobfair && <WhyToUseJobfair />}
    </>
  );
}
