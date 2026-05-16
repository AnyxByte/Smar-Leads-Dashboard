import CTAStrip from "@/components/landing/CTAStrip";
import DashboardPreview from "@/components/landing/DashboardPreview";
import FeaturesGrid from "@/components/landing/FeaturesGrid";
import Footer from "@/components/landing/Footer";
import HeroSection from "@/components/landing/HeroSection";
import Navbar from "@/components/landing/Navbar";
import StatsStrip from "@/components/landing/StatsStrip";

export default function Landing() {
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
