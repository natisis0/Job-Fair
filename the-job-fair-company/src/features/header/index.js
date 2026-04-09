import Logo from "./components/logo";
import Navbar from "./components/navbar";

export default function Header() {
  return (
    <header className="w-full pt-10 pb-6">
      <div className="max-w-6xl mx-auto px-6 md:px-8 flex items-center justify-between">
        <Logo />
        <Navbar />
      </div>
    </header>
  );
}
