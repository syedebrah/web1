"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, RefreshCw } from "lucide-react";
import confetti from "canvas-confetti";
import { loveReasons } from "@/config";

function ReasonCard({ id, reason }: { id: number; reason: string }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const cardColors = [
    "border-rose-500/10 hover:border-rose-500/30",
    "border-purple-500/10 hover:border-purple-500/30",
    "border-pink-500/10 hover:border-pink-500/30",
    "border-violet-500/10 hover:border-violet-500/30",
    "border-fuchsia-500/10 hover:border-fuchsia-500/30",
  ];
  const colorClass = cardColors[(id - 1) % cardColors.length];

  const handleFlip = (e: React.MouseEvent) => {
    setIsFlipped(!isFlipped);
    if (!isFlipped) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { x, y },
        colors: ["#ff2a7a", "#a855f7", "#ec4899", "#fb7185"],
        ticks: 100,
        gravity: 0.8,
        scalar: 0.7
      });
    }
  };

  return (
    <div
      onClick={handleFlip}
      className="h-52 w-full cursor-pointer perspective-1000 group relative"
    >
      <motion.div
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="w-full h-full transform-style-3d relative flex items-center justify-center rounded-2xl"
      >
        {/* Card Front */}
        <div className={`absolute inset-0 w-full h-full backface-hidden glass-panel flex flex-col items-center justify-center p-6 ${colorClass} transition-all duration-500 rounded-2xl overflow-hidden`}>
          {/* Subtle shimmer overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500/0 via-rose-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <div className="absolute top-3 right-3 text-zinc-700 group-hover:text-rose-500/50 transition-colors duration-300">
            <RefreshCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
          </div>
          
          <div className="relative flex items-center justify-center mb-3">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: id * 0.2 }}
            >
              <Heart className="w-14 h-14 text-rose-500/10 fill-rose-500/5 group-hover:fill-rose-500/15 group-hover:text-rose-500/25 transition-all duration-500" />
            </motion.div>
            <span className="absolute text-xl font-bold text-rose-400 font-serif group-hover:scale-110 transition-transform duration-300">
              {id}
            </span>
          </div>
          
          <span className="text-[10px] tracking-widest uppercase font-semibold text-zinc-500 group-hover:text-rose-300 transition-colors duration-300">
            Reason to Love
          </span>
          
          {/* Bottom glow accent */}
          <div className="absolute bottom-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-rose-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Card Back */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 glass-panel-rose flex flex-col items-center justify-center p-6 text-center border-rose-500/40 rounded-2xl shadow-lg shadow-rose-500/10 overflow-hidden">
          {/* Decorative corners */}
          <div className="absolute top-3 left-3 text-rose-500/15">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div className="absolute bottom-3 right-3 text-rose-500/15">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div className="absolute top-3 right-3 text-rose-500/15">
            <Heart className="w-3 h-3 fill-current" />
          </div>
          <div className="absolute bottom-3 left-3 text-rose-500/15">
            <Heart className="w-3 h-3 fill-current" />
          </div>
          
          {/* Content */}
          <p className="text-zinc-100 font-light text-sm leading-relaxed select-none">
            &ldquo;{reason}&rdquo;
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function Reasons() {
  return (
    <section
      id="reasons"
      className="relative w-full py-28 px-6 overflow-hidden scroll-mt-28"
    >
      {/* Background */}
      <div className="absolute inset-0 aurora-bg pointer-events-none opacity-30" />
      <div className="absolute top-1/2 left-10 w-[500px] h-[500px] bg-rose-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-3"
          >
            <span className="font-cursive text-2xl md:text-3xl text-rose-400 text-glow-rose flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-rose-400 animate-sparkle" />
              My Little Confessions
              <Sparkles className="w-4 h-4 text-rose-400 animate-sparkle" style={{ animationDelay: "0.5s" }} />
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-light tracking-wide text-zinc-100">
              Reasons I Love You
            </h2>
            <p className="text-zinc-500 text-xs md:text-sm tracking-wider uppercase font-light max-w-lg mx-auto mt-2 text-center px-4">
              Click on each card to unlock a secret reason why you hold my heart
            </p>
          </motion.div>
        </div>

        {/* Flip Cards Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-5 md:gap-6"
        >
          {loveReasons.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: (item.id % 6) * 0.06,
              }}
            >
              <ReasonCard id={item.id} reason={item.reason} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
