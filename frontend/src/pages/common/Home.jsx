
import Features from "../../components/Home/Features";
import HeroSection from "../../components/Home/HeroSection";
import LatestMarketplace from "../../components/Home/LatestMarket";
import LatestNews from "../../components/Home/LatestNews";
import LatestSchemes from "../../components/Home/LatestSchemes";
import StatsSection from "../../components/Home/StatsSection";

function Home() {
  return (
    <main>

      {/* Hero Section */}

      <HeroSection/>
      <StatsSection/>
      <Features />
      <LatestMarketplace/>
      <LatestNews/>
      <LatestSchemes/>
      

    </main>
  );
}

export default Home;