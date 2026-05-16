import Navbar from "./components/landing/Navbar";
import HeroSection from "./components/landing/HeroSection";
import StatsStrip from "./components/landing/StatsStrip";
import DashboardPreview from "./components/landing/DashboardPreview";
import FeaturesGrid from "./components/landing/FeaturesGrid";
import Footer from "./components/landing/Footer";
import CTAStrip from "./components/landing/CTAStrip";

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans max-w-6xl mx-auto px-6 antialiased">
      <Navbar />
      <HeroSection />
      <StatsStrip />
      <DashboardPreview />
      <FeaturesGrid />
      <CTAStrip />
      <Footer />
    </div>
  );
}
