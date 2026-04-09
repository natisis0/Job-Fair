import FooterBrand from "./components/footer-brand";
import FooterLinks from "./components/footer-links";
import Newsletter from "./components/newsletter";

export default function Footer() {
  return (
    <footer className="bg-[#231F20] w-full pt-14 pb-8">
      <div className="max-w-6xl mx-auto px-6 md:px-8 ">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-8 border-b border-[#3f3f4e] pb-16">
          <FooterBrand />
          <FooterLinks />
          <Newsletter />
        </div>

        {/* Copyright */}
        <div className="pt-8 text-center text-[#a3a3a3] text-[14px]">
          Copyright © 2025 The Job Fair Company
        </div>
      </div>
    </footer>
  );
}
