import ClientOnlyBackground from "@/components/ClientOnlyBackground";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import LoveMeter from "@/components/LoveMeter";
import Reasons from "@/components/Reasons";
import Dreams from "@/components/Dreams";
import MemoryCounter from "@/components/MemoryCounter";
import SecretVault from "@/components/SecretVault";
import PressWhenMissMe from "@/components/PressWhenMissMe";
import LetterToFuture from "@/components/LetterToFuture";
import ForgiveSyed from "@/components/ForgiveSyed";
import FinalEnding from "@/components/FinalEnding";
import EasterEggs from "@/components/EasterEggs";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-[#030008] text-zinc-100 noise-overlay">
      {/* Cinematic Starfield Canvas Background */}
      <ClientOnlyBackground />

      {/* Sticky Glassmorphic Header */}
      <Navigation />

      {/* Page Sections Layout */}
      <main className="w-full flex flex-col items-center">
        {/* Section 1: Hero Landing (h1 sits here for SEO structure) */}
        <Hero />

        <div className="section-divider w-full max-w-4xl mx-auto" />

        {/* Section 2: Interactive Love Meter */}
        <LoveMeter />

        <div className="section-divider w-full max-w-4xl mx-auto" />

        {/* Section 4: Grid of flip love reasons */}
        <Reasons />

        <div className="section-divider w-full max-w-4xl mx-auto" />

        {/* Section 5: Future Dreams float board */}
        <Dreams />

        <div className="section-divider w-full max-w-4xl mx-auto" />

        {/* Section 6: Live Memory Counter Clock */}
        <MemoryCounter />

        <div className="section-divider w-full max-w-4xl mx-auto" />

        {/* Section 7: Password Protected Vault */}
        <SecretVault />

        <div className="section-divider w-full max-w-4xl mx-auto" />

        {/* Section 8: Interactive Miss Me modal trigger */}
        <PressWhenMissMe />

        <div className="section-divider w-full max-w-4xl mx-auto" />

        {/* Section 10: Closed Wax-sealed Letter envelope */}
        <LetterToFuture />

        <div className="section-divider w-full max-w-4xl mx-auto" />

        {/* Section 12: Forgive Syed Interactive Scene */}
        <ForgiveSyed />

        <div className="section-divider w-full max-w-4xl mx-auto" />

        {/* Section 11: Final Ending Signature */}
        <FinalEnding />
      </main>

      {/* Section 9: Floating Easter Egg Controls & Listeners */}
      <EasterEggs />
    </div>
  );
}
