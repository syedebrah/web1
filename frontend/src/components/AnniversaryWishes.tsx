"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Gift, PartyPopper, Clock, Star } from "lucide-react";
import confetti from "canvas-confetti";
import { anniversaryWishes, anniversaryDate, girlfriendName, petName } from "@/config";

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="glossy-card w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center">
        <motion.span
          key={value}
          initial={{ scale: 1.2, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-2xl md:text-3xl font-bold font-serif text-rose-300"
        >
          {value < 10 ? `0${value}` : value}
        </motion.span>
      </div>
      <span className="text-[9px] md:text-[10px] tracking-widest uppercase font-semibold text-zinc-500 mt-2">
        {label}
      </span>
    </div>
  );
}

function WishCard({ quote, translation, index }: { quote: string; translation: string; index: number }) {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleReveal = () => {
    if (!isRevealed) {
      setIsRevealed(true);
      confetti({
        particleCount: 40,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#ff2a7a", "#a855f7", "#fbbf24", "#ec4899"],
        ticks: 80,
        gravity: 0.9,
        scalar: 0.8,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.2 }}
      onClick={handleReveal}
      className="cursor-pointer group"
    >
      <motion.div
        whileHover={{ y: -6, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="glossy-card-accent p-8 md:p-10 rounded-3xl relative overflow-hidden"
      >
        {/* Top highlight line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        
        {/* Corner decorations */}
        <div className="absolute top-4 right-4 text-amber-400/20">
          <Star className="w-4 h-4 fill-current" />
        </div>
        <div className="absolute bottom-4 left-4 text-rose-400/20">
          <Heart className="w-4 h-4 fill-current" />
        </div>

        <AnimatePresence mode="wait">
          {!isRevealed ? (
            <motion.div
              key="sealed"
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center justify-center min-h-[160px] text-center space-y-4"
            >
              <motion.div
                animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="p-4 rounded-full bg-gradient-to-br from-rose-500/15 to-amber-500/10 border border-rose-500/20"
              >
                <Gift className="w-8 h-8 text-rose-400" />
              </motion.div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300 tracking-wider">
                  Wish #{index + 1}
                </p>
                <p className="text-[10px] tracking-widest uppercase text-zinc-500 font-semibold group-hover:text-rose-400 transition-colors">
                  Tap to unwrap
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="revealed"
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="flex flex-col items-center justify-center min-h-[160px] text-center space-y-5"
            >
              {/* Tamil quote */}
              <p className="text-lg md:text-xl font-medium text-rose-200 leading-relaxed tracking-wide">
                &ldquo;{quote}&rdquo;
              </p>
              {/* English translation */}
              <p className="text-xs md:text-sm text-zinc-400 font-light italic leading-relaxed max-w-md">
                {translation}
              </p>
              {/* Decorative hearts */}
              <div className="flex items-center gap-2 pt-2">
                <Sparkles className="w-3 h-3 text-amber-400/50 animate-sparkle" />
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500/40 animate-heartbeat" />
                <Sparkles className="w-3 h-3 text-amber-400/50 animate-sparkle" style={{ animationDelay: "0.5s" }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default function AnniversaryWishes() {
  const [countdown, setCountdown] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isAnniversary, setIsAnniversary] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const calculateCountdown = () => {
      const now = new Date();
      const anniversary = new Date("2026-06-07T00:00:00");

      // Check if today IS the anniversary
      if (
        now.getDate() === 7 &&
        now.getMonth() === 5 && // June is month 5 (0-indexed)
        now.getFullYear() === 2026
      ) {
        setIsAnniversary(true);
        return;
      }

      const diff = anniversary.getTime() - now.getTime();
      if (diff <= 0) {
        setIsAnniversary(true);
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown({ hours, minutes, seconds });
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const triggerCelebration = () => {
    const duration = 4000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#ff2a7a", "#a855f7", "#fbbf24", "#ec4899", "#f43f5e"],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#ff2a7a", "#a855f7", "#fbbf24", "#ec4899", "#f43f5e"],
      });
    }, 250);
  };

  return (
    <section
      id="anniversary-wishes"
      className="relative w-full py-28 px-6 overflow-hidden scroll-mt-28"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 aurora-bg pointer-events-none opacity-40" />
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[180px] pointer-events-none animate-float-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-rose-500/5 rounded-full blur-[180px] pointer-events-none animate-float-gentle" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex p-4 rounded-full bg-gradient-to-br from-amber-500/15 to-rose-500/10 border border-amber-500/20 mb-2"
            >
              <PartyPopper className="w-8 h-8 text-amber-400" />
            </motion.div>

            <span className="font-cursive text-2xl md:text-3xl text-amber-400 text-glow-gold block">
              Advance Anniversary Wishes
            </span>

            <h2 className="text-3xl md:text-5xl font-serif font-light tracking-wide text-zinc-100">
              {isAnniversary ? "Happy 4th Anniversary!" : "Tomorrow Is Our Day!"}
            </h2>

            <p className="text-zinc-400 text-xs md:text-sm tracking-wider uppercase font-light max-w-lg mx-auto mt-2 text-center px-4">
              {isAnniversary
                ? `4 beautiful years together, ${petName}. Here's to forever.`
                : `June 7, 2026 — Our 4th Anniversary is almost here, ${petName}`}
            </p>
          </motion.div>
        </div>

        {/* Countdown / Celebration */}
        {mounted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            {!isAnniversary ? (
              <div className="flex flex-col items-center space-y-6">
                <div className="flex items-center gap-2 text-xs text-zinc-500 tracking-widest uppercase font-semibold">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Countdown to our anniversary</span>
                </div>
                <div className="flex items-center gap-4 md:gap-6">
                  <CountdownUnit value={countdown.hours} label="Hours" />
                  <span className="text-2xl text-rose-500/40 font-light mt-[-20px]">:</span>
                  <CountdownUnit value={countdown.minutes} label="Minutes" />
                  <span className="text-2xl text-rose-500/40 font-light mt-[-20px]">:</span>
                  <CountdownUnit value={countdown.seconds} label="Seconds" />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-6xl md:text-8xl"
                >
                  🎉
                </motion.div>
                <p className="text-amber-300 font-serif italic text-lg text-glow-gold">
                  4 Years of Us — Forever to Go
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={triggerCelebration}
                  className="px-8 py-4 bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500 bg-[length:200%_auto] hover:bg-right text-white font-medium tracking-wider uppercase text-xs rounded-full shadow-lg shadow-amber-500/20 cursor-pointer transition-all duration-700 flex items-center gap-2"
                >
                  <PartyPopper className="w-4 h-4" />
                  Celebrate Together
                </motion.button>
              </div>
            )}
          </motion.div>
        )}

        {/* Tamil Love Quotes - Wish Cards */}
        <div className="space-y-6">
          {anniversaryWishes.map((wish, idx) => (
            <WishCard
              key={wish.id}
              quote={wish.quote}
              translation={wish.translation}
              index={idx}
            />
          ))}
        </div>

        {/* Bottom signature */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3.5 glossy-card rounded-full text-sm font-light text-zinc-300">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500/40 animate-heartbeat" />
            <span className="font-serif italic shimmer-text font-medium">
              Happy Anniversary, {girlfriendName} ❤️
            </span>
            <Sparkles className="w-4 h-4 text-amber-400 animate-sparkle" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
