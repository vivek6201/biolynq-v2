import { Metadata } from "next"
import Header from "@/components/home/header"
import HeroSection from "@/components/home/hero-section"
import FeaturesSection from "@/components/home/features-section"
import StatsSection from "@/components/home/stats-section"
import CtaSection from "@/components/home/cta-section"
import Footer from "@/components/home/footer"

export const metadata: Metadata = {
  title: "Biolynq | Your Digital Presence, Linked & Analyzed",
  description:
    "Consolidate your world into a single, high-converting bio link. Track every click, discover your audience, and grow with precision analytics.",
}

export default function Page() {
  return (
    <div className="bg-surface dark:bg-slate-950 text-on-surface dark:text-white min-h-screen selection:bg-primary-fixed-dim selection:text-primary-color transition-colors duration-300">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}
