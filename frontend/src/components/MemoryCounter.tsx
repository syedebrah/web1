"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, Heart, Sparkles } from "lucide-react";
import { relationshipStartDate, girlfriendName, yourName } from "@/config";

interface TimeElapsed {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function MemoryCounter() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState<TimeElapsed>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setMounted(true);

    const calculateTime = () => {
      const start = new Date(relationshipStartDate).getTime();
      const now = new Date().getTime();
      const difference = now - start;

      if (difference <= 0) {
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTime({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    return num < 10 ? `0${num}` : num.toString();
  };

  const timeUnits = [
    { label: "Days Together", value: time.days, gradient: "from-rose-500 to-rose-400", textColor: "text-rose-400", glowClass: "via-rose-500/30" },
    { label: "Hours Together", value: time.hours, gradient: "from-purple-500 to-purple-400", textColor: "text-purple-400", glowClass: "via-purple-500/30" },
    { label: "Minutes Together", value: time.minutes, gradient: "from-pink-500 to-pink-400", textColor: "text-pink-400", glowClass: "via-pink-500/30" },
    { label: "Seconds Together", value: time.seconds, gradient: "from-amber-500 to-amber-400", textColor: "text-amber-400", glowClass: "via-amber-500/30" },
  ];

  return (
    <section
      id="memory-counter"
      className="relative w-full py-28 px-6 overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 aurora-bg pointer-events-none opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-600/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-3"
          >
            <span className="font-cursive text-2xl md:text-3xl text-rose-400 text-glow-rose flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-rose-400 animate-sparkle" />
              Our Eternity Clock
              <Sparkles className="w-4 h-4 text-rose-400 animate-sparkle" style={{ animationDelay: "0.5s" }} />
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-light tracking-wide text-zinc-100">
              Every Second Matters With You
            </h2>
            <p className="text-zinc-500 text-xs md:text-sm tracking-widest uppercase font-light max-w-md mx-auto mt-2">
              A live record of our love story since the very beginning
            </p>
          </motion.div>
        </div>

        {/* Counter Display */}
        {!mounted ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto opacity-30">
            {["Days", "Hours", "Minutes", "Seconds"].map((label) => (
              <div key={label} className="glass-panel p-6 rounded-3xl text-center">
                <div className="text-4xl md:text-6xl font-bold font-serif text-zinc-600">00</div>
                <div className="text-xs uppercase tracking-widest text-zinc-500 mt-2">{label}</div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-12"
          >
            {/* Live numbers */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-3xl mx-auto">
              {timeUnits.map((item, idx) => (
                <motion.div
                  key={item.label}
                  whileHover={{ y: -8, scale: 1.05, transition: { type: "spring", stiffness: 300, damping: 15 } }}
                  className="glass-panel p-6 md:p-8 rounded-3xl text-center relative overflow-hidden border-rose-500/10 group transition-all duration-300 hover:border-rose-500/20"
                >
                  {/* Bottom corner glow blob */}
                  <div className="absolute -bottom-8 -right-8 w-28 h-28 bg-rose-500/5 rounded-full blur-2xl group-hover:bg-rose-500/10 transition-colors duration-500 pointer-events-none" />
                  
                  {/* Top accent line */}
                  <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent ${item.glowClass} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <motion.div
                    key={item.value}
                    initial={{ scale: 1.05, opacity: 0.7 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`text-4xl md:text-6xl font-extrabold font-serif tracking-tight ${item.textColor} drop-shadow-md`}
                  >
                    {formatNumber(item.value)}
                  </motion.div>
                  <div className="text-[10px] tracking-widest uppercase font-semibold text-zinc-500 mt-3 group-hover:text-zinc-300 transition-colors duration-300">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Anniversary text */}
            <div className="text-center">
              <motion.div
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex items-center gap-3 px-6 py-3.5 glass-panel rounded-full text-sm font-light text-zinc-300 animate-breathe"
              >
                <Clock className="w-4 h-4 text-rose-400" />
                <span>Since we clicked on {new Date(relationshipStartDate).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/30 animate-heartbeat" />
                <span className="font-serif italic shimmer-text font-medium">{yourName} + {girlfriendName}</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
