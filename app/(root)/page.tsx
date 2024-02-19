
import {LandingNavbar} from "@/components/layouts/landingPage/Navbar";
import {HeroSection} from "@/components/layouts/landingPage/HeroSection";


export default function Home() {
  return (
    <main className="p-4">
      <LandingNavbar />
      <HeroSection />
    </main>
  );
}
