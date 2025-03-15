import HeroSection from "./components/homepage/HeroSection";
import FeaturedProperties from "./components/homepage/FeaturedProperties";
import Services from "./components/homepage/Services";
import Testimonials from "./components/general/Testimonials";
import TeamSection from "./components/homepage/TeamSection";
import TrustedBy from "./components/general/TrustedBy";
import Stores from "./components/general/Stores";
import { SearchProvider } from "./context/SearchContext";

export default function Home() {
  return (
    <SearchProvider>
      <HeroSection />
      <FeaturedProperties />
      <Services />
      <Testimonials />
      <TeamSection />
      <TrustedBy />
      <Stores />
    </SearchProvider>
  );
}
