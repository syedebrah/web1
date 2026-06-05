"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { petName } from "@/config";

const getStableRandom = (index: number, seed: number) => {
  const x = Math.sin(index * 12.9898 + seed * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

function ShootingStar({ delay, top, left }: { delay: number; top: string; left: string }) {
  const [mounted, setMounted] = useState(false);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    setMounted(true);
    setDuration(3 + Math.random() * 3);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="shooting-star"
      style={{
        top,
        left,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    />
  );
}

export default function Hero() {
  const [idx1, setIdx1] = useState(0);
  const [idx2, setIdx2] = useState(0);
  const [idx3, setIdx3] = useState(0);
  const [phase, setPhase] = useState<1 | 2 | 3 | 4>(1); // 1=typing line1, 2=line2, 3=line3, 4=done
  const mounted = useRef(false);

  const fullLine1 = `Hey ${petName},`;
  const fullLine2 = "This isn't just a website.";
  const fullLine3 = "It's a small universe I built for you.";

  // Derive visible text from indices — immune to strict mode double-render
  const line1 = fullLine1.slice(0, idx1);
  const line2 = fullLine2.slice(0, idx2);
  const line3 = fullLine3.slice(0, idx3);
  const showCTA = phase === 4;

  const shootingStars = useMemo(() => [
    { delay: 0, top: "15%", left: "-5%" },
    { delay: 6, top: "25%", left: "10%" },
    { delay: 12, top: "10%", left: "30%" },
    { delay: 18, top: "35%", left: "50%" },
    { delay: 24, top: "20%", left: "70%" },
  ], []);

  useEffect(() => {
    // Guard against strict mode double-mount
    if (mounted.current) return;
    mounted.current = true;

    let currentIdx = 0;
    let currentPhase: 1 | 2 | 3 | 4 = 1;

    const lines = [fullLine1, fullLine2, fullLine3];
    const setters = [setIdx1, setIdx2, setIdx3];
    const speeds = [90, 70, 70];

    function startTyping(lineIndex: number) {
      if (lineIndex >= 3) {
        setPhase(4);
        return;
      }
      currentIdx = 0;
      currentPhase = (lineIndex + 1) as 1 | 2 | 3;
      setPhase(currentPhase);

      const interval = setInterval(() => {
        currentIdx++;
        setters[lineIndex](currentIdx);
        if (currentIdx >= lines[lineIndex].length) {
          clearInterval(interval);
          // Brief pause before next line
          setTimeout(() => startTyping(lineIndex + 1), 200);
        }
      }, speeds[lineIndex]);
    }

    // Small initial delay before typing starts
    const startDelay = setTimeout(() => startTyping(0), 400);

    return () => clearTimeout(startDelay);
  }, []);

  const handleBegin = () => {
    const nextSection = document.getElementById("love-meter");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden hero-gradient"
    >
      {/* Shooting Stars */}
      {shootingStars.map((star, i) => (
        <ShootingStar key={i} {...star} />
      ))}

      {/* Aurora ambient glow layers */}
      <div className="absolute inset-0 aurora-bg pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/8 rounded-full blur-[160px] pointer-events-none animate-float-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-rose-600/8 rounded-full blur-[160px] pointer-events-none animate-float-gentle" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Hero content */}
      <div className="relative z-10 max-w-4xl w-full flex flex-col items-center justify-center min-h-[45vh] py-10">
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="space-y-5 md:space-y-7 w-full"
        >
          {/* Decorative sparkles */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex justify-center gap-3 mb-4"
          >
            <Sparkles className="w-4 h-4 text-rose-400/60 animate-sparkle" />
            <Sparkles className="w-3 h-3 text-amber-400/50 animate-sparkle" style={{ animationDelay: "0.5s" }} />
            <Sparkles className="w-4 h-4 text-purple-400/60 animate-sparkle" style={{ animationDelay: "1s" }} />
          </motion.div>

          {/* Typing Container */}
          <div className="min-h-[180px] md:min-h-[240px] flex flex-col justify-center items-center select-none font-serif w-full px-4">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-light text-zinc-100 leading-tight tracking-wide text-center">
              {line1}
              {phase === 1 && <span className="cursor-blink text-rose-500 font-bold ml-1">|</span>}
            </h1>
            
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-light text-zinc-200 mt-5 leading-tight tracking-wide min-h-[36px] sm:min-h-[48px] text-center">
              {line2}
              {phase === 2 && <span className="cursor-blink text-purple-500 font-bold ml-1">|</span>}
            </h2>

            <p className="text-lg sm:text-xl md:text-3xl font-light mt-7 tracking-widest min-h-[28px] sm:min-h-[40px] shimmer-text text-center">
              {line3}
              {phase === 3 && <span className="cursor-blink text-rose-500 font-bold ml-1">|</span>}
            </p>
          </div>
        </motion.div>

        {/* CTA Button */}
        <div className="relative h-24 mt-14 flex items-center justify-center w-full">
          {showCTA && (
            <>
              {/* Magical CTA Sparkles */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                {[...Array(10)].map((_, i) => {
                  const angle = (i / 10) * Math.PI * 2;
                  const randomSeed1 = getStableRandom(i, 1);
                  const randomSeed2 = getStableRandom(i, 2);
                  const randomSeed3 = getStableRandom(i, 3);
                  const radius = 100 + randomSeed1 * 40;
                  const duration = 2.5 + randomSeed2 * 2;
                  const delay = randomSeed3 * 2;

                  return (
                    <motion.div
                      key={`cta-sparkle-${i}`}
                      initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                      animate={{
                        opacity: [0, 0.8, 0],
                        scale: [0.5, 1.2, 0.5],
                        x: Math.cos(angle) * radius,
                        y: Math.sin(angle) * (radius * 0.6),
                      }}
                      transition={{
                        duration,
                        repeat: Infinity,
                        delay,
                        ease: "easeInOut",
                      }}
                      className="absolute text-rose-400"
                    >
                      <Sparkles className="w-3 h-3" />
                    </motion.div>
                  );
                })}
              </div>

              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                onClick={handleBegin}
                className="group relative px-10 py-5 rounded-full font-semibold text-white overflow-hidden cursor-pointer gradient-border-animated animate-breathe z-30"
              >
                {/* Button gradient background */}
                <span className="absolute inset-0 bg-gradient-to-r from-rose-600 via-purple-600 to-rose-600 bg-[length:200%_auto] group-hover:bg-right transition-all duration-1000 rounded-full" />
                {/* Button border outline */}
                <span className="absolute inset-[2px] bg-[#030008] rounded-full group-hover:opacity-0 transition-opacity duration-500" />
                {/* Text / Heart */}
                <span className="relative z-10 flex items-center gap-3 text-sm md:text-base tracking-widest uppercase bg-gradient-to-r from-rose-400 to-pink-300 group-hover:from-white group-hover:to-white bg-clip-text text-transparent font-medium">
                  Explore Our Universe <span className="text-rose-500 group-hover:animate-heartbeat group-hover:text-white">❤️</span>
                </span>
              </motion.button>
            </>
          )}
        </div>
      </div>

      {/* Floating scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showCTA ? 0.7 : 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 flex flex-col items-center gap-2 cursor-pointer select-none text-zinc-500 hover:text-rose-400 transition-colors duration-300"
        onClick={handleBegin}
      >
        <span className="text-xs uppercase tracking-widest font-light">Scroll Down</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </motion.div>
    </section>
  );
}
