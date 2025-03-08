import { Navbar } from "../../components/Navbar";
import Main from "../../components/Main";

export default function Home() {
  const navItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
  ];

  return (
    <div className="grid grid-rows-[auto_1fr] min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Navbar at the top */}
      <div className="flex justify-center">
        <Navbar navItems={navItems} />
      </div>

      {/* Main component aligned to the left */}
      <div className="flex justify-start w-full">
        <Main />
      </div>
    </div>
  );
}