"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plane, Compass, HeartHandshake, Home, GraduationCap, Sparkles, Heart } from "lucide-react";
import { futureDreams } from "@/config";

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "Plane":
      return <Plane className="w-8 h-8 text-rose-400 group-hover:scale-110 group-hover:text-rose-300 transition-all duration-300" />;
    case "Compass":
      return <Compass className="w-8 h-8 text-rose-400 group-hover:scale-110 group-hover:text-rose-300 transition-all duration-300" />;
    case "HeartHandshake":
      return <HeartHandshake className="w-8 h-8 text-rose-400 group-hover:scale-110 group-hover:text-rose-300 transition-all duration-300" />;
    case "Home":
      return <Home className="w-8 h-8 text-rose-400 group-hover:scale-110 group-hover:text-rose-300 transition-all duration-300" />;
    case "GraduationCap":
      return <GraduationCap className="w-8 h-8 text-rose-400 group-hover:scale-110 group-hover:text-rose-300 transition-all duration-300" />;
    default:
      return <Sparkles className="w-8 h-8 text-rose-400" />;
  }
};

const getStableRandom = (index: number, seed: number) => {
  const x = Math.sin(index * 12.9898 + seed * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

const categoryColors: Record<string, string> = {
  Travel: "from-rose-500/15 to-pink-500/5",
  Adventure: "from-purple-500/15 to-indigo-500/5",
  Life: "from-amber-500/15 to-orange-500/5",
  Home: "from-emerald-500/10 to-teal-500/5",
  Learning: "from-violet-500/15 to-purple-500/5",
};

function DreamCard({ dream, idx }: { dream: any; idx: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const randomDelay = idx * 0.15;
  const randomDuration = 4 + (idx % 3) * 0.5;
  const gradientClass = categoryColors[dream.category] || "from-rose-500/15 to-purple-500/5";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: idx * 0.12 }}
      className="h-full"
    >
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: randomDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: randomDelay,
        }}
        whileHover={{
          y: -14,
          scale: 1.02,
          transition: { duration: 0.3, type: "spring", stiffness: 300, damping: 15 },
        }}
        className="glass-panel p-8 rounded-3xl h-full flex flex-col justify-between border-rose-500/10 group transition-all duration-300 relative overflow-hidden cursor-default hover:border-rose-500/25 hover:shadow-xl hover:shadow-rose-500/5"
      >
        {/* Hover Particles */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
            {[...Array(8)].map((_, i) => {
              const randomX = 10 + getStableRandom(i + idx * 10, 1) * 80;
              const duration = 1.5 + getStableRandom(i + idx * 10, 2);
              const delay = getStableRandom(i + idx * 10, 3) * 0.5;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: "100%", x: `${randomX}%` }}
                  animate={{ opacity: [0, 1, 0], y: "-20%" }}
                  transition={{ duration, repeat: Infinity, delay }}
                  className="absolute bottom-0 text-rose-400/40"
                >
                  <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Background gradient accent */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
        
        {/* Top bar accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-rose-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="space-y-6 relative z-10">
          {/* Category & Icon */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] tracking-widest uppercase font-bold text-zinc-500 group-hover:text-rose-400 transition-colors duration-300">
              {dream.category}
            </span>
            <div className="p-3 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 group-hover:bg-rose-950/15 group-hover:border-rose-500/20 transition-all duration-300 shadow-inner">
              {getIconComponent(dream.icon)}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-serif text-zinc-100 font-medium tracking-wide group-hover:text-rose-200 transition-colors duration-300">
            {dream.title}
          </h3>

          {/* Description */}
          <p className="text-zinc-400 text-sm leading-relaxed font-light font-sans group-hover:text-zinc-300 transition-colors duration-300">
            {dream.description}
          </p>
        </div>

        {/* Bottom note */}
        <div className="mt-8 flex items-center gap-1.5 text-xs text-rose-500/50 font-cursive select-none relative z-10">
          <span>With you, always</span>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
          >
            <Heart className="w-3 h-3 text-rose-500/40 fill-rose-500/30" />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Dreams() {
  return (
    <section
      id="dreams"
      className="relative w-full py-28 px-6 overflow-hidden scroll-mt-28"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 aurora-bg pointer-events-none opacity-30" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[150px] pointer-events-none animate-float-slow" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-rose-600/5 rounded-full blur-[150px] pointer-events-none animate-float-gentle" />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-3"
          >
            <span className="font-cursive text-2xl md:text-3xl text-rose-400 text-glow-rose block">
              Writing Our Future
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-light tracking-wide text-zinc-100">
              Our Future Dreams
            </h2>
            <p className="text-zinc-500 text-xs md:text-sm tracking-widest uppercase font-light max-w-md mx-auto mt-2">
              A collection of moments, adventures, and milestones we will achieve side by side
            </p>
          </motion.div>
        </div>

        {/* Floating cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {futureDreams.map((dream, idx) => (
            <DreamCard key={dream.title} dream={dream} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
