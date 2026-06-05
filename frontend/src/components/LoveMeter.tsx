"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, AlertCircle, Zap } from "lucide-react";
import confetti from "canvas-confetti";

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
}

// Deterministic stable pseudo-random numbers based on index to prevent flickering on re-renders
const getStableRandom = (index: number, seed: number) => {
  const x = Math.sin(index * 12.9898 + seed * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

export default function LoveMeter() {
  const [loveValue, setLoveValue] = useState(50);
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<"idle" | "calculating" | "error">("idle");
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);
  const [calcStep, setCalcStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (status !== "calculating") {
      setCalcStep(0);
      return;
    }
    const interval = setInterval(() => {
      setCalcStep((prev) => (prev < 3 ? prev + 1 : prev));
    }, 500);
    return () => clearInterval(interval);
  }, [status]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 180,
      spread: 90,
      origin: { y: 0.6 },
      colors: ["#ff2a7a", "#a855f7", "#ec4899", "#fb7185", "#f43f5e", "#fbbf24"],
    });

    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: NodeJS.Timeout = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  const spawnHearts = () => {
    const heartColors = ["#ff2a7a", "#ff6b9d", "#d946ef", "#a855f7", "#fb7185", "#fbbf24"];
    const count = 45;
    const hearts: FloatingHeart[] = [];

    for (let i = 0; i < count; i++) {
      hearts.push({
        id: Math.random() + i,
        x: (Math.random() - 0.5) * 320,
        y: (Math.random() - 0.5) * 180 - 100,
        size: Math.random() * 26 + 12,
        color: heartColors[Math.floor(Math.random() * heartColors.length)],
        delay: Math.random() * 0.4,
      });
    }
    setFloatingHearts(hearts);
  };

  const handleCalculate = () => {
    if (status !== "idle") return;
    setStatus("calculating");

    setTimeout(() => {
      setStatus("error");
      triggerConfetti();
      spawnHearts();
    }, 2200);
  };

  const handleReset = () => {
    setStatus("idle");
    setLoveValue(50);
    setFloatingHearts([]);
  };

  const getCalculatingText = () => {
    switch (calcStep) {
      case 0: return "Calibrating heartbeat frequency...";
      case 1: return "Scanning memories & shared dreams...";
      case 2: return "Measuring infinite affection indices...";
      case 3: return "Exceeding system capacity... ALERT!";
      default: return "Analyzing emotional parameters...";
    }
  };

  // SVG dimensions & math
  const radius = 40;
  const circumference = 2 * Math.PI * radius; // 251.327

  return (
    <section
      id="love-meter"
      ref={containerRef}
      className="relative w-full min-h-screen py-24 px-6 flex flex-col items-center justify-center overflow-hidden scroll-mt-28"
    >
      {/* Aurora background */}
      <div className="absolute inset-0 aurora-bg pointer-events-none opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="w-full max-w-xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex p-3 rounded-full bg-rose-500/10 border border-rose-500/20 mb-4"
          >
            <Heart className="w-8 h-8 text-[#ff2a7a] fill-[#ff2a7a]/20" />
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-serif font-light text-zinc-100 tracking-wide">
            How Much Do You Think I Love You?
          </h2>
          <p className="text-zinc-400 mt-3 text-sm md:text-base tracking-wider font-light">
            Measure the depth of my affection by adjusting the gauge below.
          </p>
        </motion.div>

        {/* Love Meter Card - Glow intensity grows with loveValue */}
        <motion.div
          layout
          className="glass-panel p-8 md:p-12 rounded-[32px] relative overflow-hidden transition-all duration-300 border border-[#ff2a7a]/20"
          style={{
            boxShadow: `0 25px 60px rgba(0, 0, 0, 0.5), 0 0 ${20 + loveValue * 0.4}px rgba(255, 42, 122, ${0.05 + loveValue * 0.002})`
          }}
        >
          <AnimatePresence mode="wait">
            {status === "idle" && (
              <motion.div
                key="idle-state"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8 flex flex-col items-center relative z-10"
              >
                {/* Circular gauge */}
                <div className="relative w-48 h-48 flex items-center justify-center">
                  {/* Outer glow ring around the progress bar */}
                  <div 
                    className="absolute inset-2 rounded-full transition-all duration-300 pointer-events-none" 
                    style={{
                      boxShadow: `0 0 ${15 + loveValue * 0.25}px rgba(255, 42, 122, ${0.1 + loveValue * 0.002})`,
                    }} 
                  />
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    {/* Background track */}
                    <circle
                      cx="50"
                      cy="50"
                      r={radius}
                      stroke="rgba(24, 24, 27, 0.7)"
                      strokeWidth="5"
                      fill="transparent"
                    />
                    {/* Ticking mechanical outer dial */}
                    <circle
                      cx="50"
                      cy="50"
                      r="46"
                      stroke="rgba(255, 42, 122, 0.15)"
                      strokeWidth="1.2"
                      fill="transparent"
                      strokeDasharray="2 3"
                    />
                    {/* Progress arc */}
                    <motion.circle
                      cx="50"
                      cy="50"
                      r={radius}
                      stroke="url(#lovegradient)"
                      strokeWidth="6"
                      fill="transparent"
                      strokeDasharray={circumference}
                      initial={{ strokeDashoffset: circumference }}
                      animate={{ strokeDashoffset: circumference - (circumference * loveValue) / 100 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="lovegradient" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ff2a7a" />
                        <stop offset="60%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#ffb088" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* Text Inside Gauge */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span
                      key={loveValue}
                      initial={{ scale: 0.9, opacity: 0.8 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      className="text-6xl font-bold font-serif bg-gradient-to-r from-[#ff8fa3] via-[#ffaa85] to-[#a855f7] bg-clip-text text-transparent select-none filter drop-shadow-[0_0_15px_rgba(255,42,122,0.3)]"
                    >
                      {loveValue}%
                    </motion.span>
                    <span className="text-[11px] uppercase tracking-[0.25em] text-zinc-400 font-bold mt-2 select-none">
                      Affection
                    </span>
                  </div>
                </div>

                {/* Slider bar */}
                <div className="w-full space-y-4">
                  <div className="flex justify-between text-[11px] tracking-[0.15em] uppercase text-zinc-500 font-bold select-none">
                    <span>A Little</span>
                    <span>To The Moon & Back</span>
                  </div>
                  <div className="relative flex items-center">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={loveValue}
                      onChange={(e) => setLoveValue(Number(e.target.value))}
                      className="w-full cursor-pointer h-[6px] rounded-full appearance-none outline-none transition-all duration-150"
                      style={{
                        background: `linear-gradient(to right, #ff2a7a 0%, #a855f7 ${loveValue}%, rgba(24, 24, 27, 0.8) ${loveValue}%, rgba(24, 24, 27, 0.8) 100%)`
                      }}
                    />
                  </div>
                </div>

                {/* Action button */}
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: "0 0 25px rgba(255, 42, 122, 0.6)" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleCalculate}
                  className="w-full max-w-[320px] py-4 bg-gradient-to-r from-[#ff2a7a] via-[#a855f7] to-[#ff2a7a] bg-[length:200%_auto] hover:bg-right text-white font-bold tracking-[0.15em] uppercase text-xs rounded-full shadow-[0_0_15px_rgba(255,42,122,0.3)] cursor-pointer transition-all duration-500 flex items-center justify-center gap-2 relative z-10 border border-white/10"
                >
                  <Zap className="w-4 h-4 fill-current text-white" />
                  <span>Analyze My Love</span>
                </motion.button>

                {/* Continuous floating background hearts reflecting loveValue */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[30px] z-0">
                  {mounted && [...Array(12)].map((_, i) => {
                    // Stable dynamic formulas based on index to keep coords/speeds constant as loveValue slides
                    const randomX = 8 + getStableRandom(i, 1) * 84;
                    const randomDelay = getStableRandom(i, 2) * 4;
                    const randomDuration = 4 + getStableRandom(i, 3) * 4;
                    const randomRotate = (getStableRandom(i, 4) - 0.5) * 50;
                    const scaleFactor = 0.4 + getStableRandom(i, 5) * 0.6;
                    
                    // Show heart based on its index relative to current loveValue percentage
                    const isActive = i * 8 < loveValue;

                    return (
                      <motion.div
                        key={`stable-bg-heart-${i}`}
                        initial={{ y: "110%", x: `${randomX}%`, opacity: 0 }}
                        animate={isActive ? {
                          y: ["110%", "-15%"],
                          x: `${randomX}%`,
                          opacity: [0, (loveValue / 100) * 0.3 + 0.05, 0],
                          scale: [scaleFactor * 0.5, scaleFactor, scaleFactor * 0.5],
                          rotate: [0, randomRotate]
                        } : { opacity: 0 }}
                        transition={{
                          duration: randomDuration,
                          repeat: isActive ? Infinity : 0,
                          delay: randomDelay,
                          ease: "linear"
                        }}
                        className="absolute bottom-0 text-rose-500"
                      >
                        <Heart className="w-5 h-5 md:w-7 md:h-7 fill-rose-500/10" />
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {status === "calculating" && (
              <motion.div
                key="calculating-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-16 flex flex-col items-center justify-center space-y-6 relative z-10"
              >
                <div className="relative w-24 h-24 flex items-center justify-center">
                  {/* Multi-ring spinner */}
                  <div className="absolute inset-0 rounded-full border-[4px] border-rose-500/10 border-t-rose-500 animate-spin" style={{ animationDuration: "1s" }} />
                  <div className="absolute inset-2 rounded-full border-[2px] border-purple-500/10 border-b-purple-500 animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.4s" }} />
                  <div className="absolute inset-4 rounded-full border-[1px] border-amber-500/10 border-l-amber-400 animate-spin" style={{ animationDuration: "2s" }} />
                  <Heart className="w-7 h-7 text-rose-500 animate-heartbeat" />
                </div>
                <div className="space-y-3 text-center">
                  <h3 className="text-xl font-light text-zinc-200 tracking-wider font-serif">
                    Analyzing Love Data...
                  </h3>
                  <div className="h-6 flex items-center justify-center">
                    <p className="text-xs text-rose-400 font-medium tracking-widest uppercase flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-sparkle" />
                      <span>{getCalculatingText()}</span>
                      <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-sparkle" style={{ animationDelay: "0.5s" }} />
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {status === "error" && (
              <motion.div
                key="error-state"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="py-6 flex flex-col items-center text-center space-y-8 relative z-10"
              >
                {/* Floating Hearts Shower on Error */}
                <div className="absolute inset-0 pointer-events-none overflow-visible">
                  {floatingHearts.map((heart) => (
                    <motion.div
                      key={heart.id}
                      initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                      animate={{
                        opacity: [0, 1, 1, 0],
                        scale: [0.3, 1.2, 1, 0.4],
                        x: heart.x,
                        y: heart.y,
                      }}
                      transition={{
                        duration: 2.8,
                        delay: heart.delay,
                        ease: "easeOut",
                      }}
                      className="absolute left-1/2 top-1/2"
                      style={{ color: heart.color }}
                    >
                      <Heart
                        className="fill-current"
                        style={{ width: heart.size, height: heart.size }}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Error Banner */}
                <motion.div
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-3 px-5 py-3.5 bg-red-950/40 border border-red-500/25 rounded-2xl text-red-400 text-xs md:text-sm max-w-sm backdrop-blur-md"
                >
                  <AlertCircle className="w-5 h-5 shrink-0 animate-pulse text-red-400" />
                  <div className="text-left leading-tight">
                    <span className="font-bold uppercase tracking-wider block text-red-300 text-[10px]">Error Code: HEARTS_OVERFLOW</span>
                    <span className="font-light text-zinc-300">Love levels exceed measurable limits of the system.</span>
                  </div>
                </motion.div>

                {/* Infinity Symbol */}
                <div className="space-y-2">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: [1, 1.12, 1], opacity: 1 }}
                    transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
                    className="text-8xl md:text-9xl font-sans font-light shimmer-text leading-none drop-shadow-2xl"
                  >
                    ∞
                  </motion.div>
                  <p className="text-[#ff2a7a] font-serif italic text-xl text-glow-rose flex items-center justify-center gap-2">
                    <Sparkles className="w-4.5 h-4.5 text-amber-400 animate-sparkle" />
                    Infinite & Unmeasurable
                    <Sparkles className="w-4.5 h-4.5 text-amber-400 animate-sparkle" style={{ animationDelay: "0.5s" }} />
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center w-full relative z-20">
                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto px-6 py-3.5 bg-zinc-900/80 border border-zinc-700 hover:border-zinc-500 text-zinc-400 hover:text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer backdrop-blur-sm"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={triggerConfetti}
                    className="w-full sm:w-auto px-6 py-3.5 bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 hover:border-rose-500/50 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 animate-breathe"
                  >
                    Celebrate Our Love ❤️
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

