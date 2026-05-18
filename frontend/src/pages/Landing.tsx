import CTAStrip from "@/components/landing/CTAStrip";
import DashboardPreview from "@/components/landing/DashboardPreview";
import FeaturesGrid from "@/components/landing/FeaturesGrid";
import Footer from "@/components/landing/Footer";
import HeroSection from "@/components/landing/HeroSection";
import Navbar from "@/components/landing/Navbar";
import StatsStrip from "@/components/landing/StatsStrip";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans antialiased transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-6">
        <Navbar />
        <HeroSection />
        <StatsStrip />
        <DashboardPreview />
        <FeaturesGrid />
        <CTAStrip />
        <Footer />
      </div>
    </div>
  );
}
