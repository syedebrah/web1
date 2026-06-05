"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Calendar, Heart, Sparkles } from "lucide-react";
import { timelineEvents } from "@/config";

export default function StoryTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  const getPlaceholderGradient = (index: number) => {
    const gradients = [
      "from-rose-500/25 via-pink-600/15 to-purple-900/10",
      "from-purple-500/25 via-indigo-600/15 to-rose-900/10",
      "from-pink-500/25 via-rose-600/15 to-violet-900/10",
      "from-violet-500/25 via-purple-600/15 to-rose-900/10",
      "from-fuchsia-500/25 via-rose-600/15 to-indigo-900/10",
      "from-rose-600/25 via-amber-500/15 to-purple-900/10",
    ];
    return gradients[index % gradients.length];
  };

  const getAccentEmoji = (index: number) => {
    const emojis = ["✨", "💬", "📞", "💪", "🌟", "💕"];
    return emojis[index % emojis.length];
  };

  return (
    <section
      id="our-story"
      ref={containerRef}
      className="relative w-full py-28 px-6 overflow-hidden"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 aurora-bg pointer-events-none opacity-30" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-purple-600/5 rounded-full blur-[140px] pointer-events-none animate-float-slow" />
      <div className="absolute bottom-1/3 left-10 w-[450px] h-[450px] bg-rose-600/5 rounded-full blur-[140px] pointer-events-none animate-float-gentle" />

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
              Our Love Story
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-light tracking-wide text-zinc-100">
              The Chapters of Us
            </h2>
            <p className="text-zinc-500 text-xs md:text-sm tracking-widest uppercase font-light max-w-md mx-auto mt-2">
              Every step, every laugh, and every milestone that brought us here today
            </p>
          </motion.div>
        </div>

        {/* Timeline Axis */}
        <div className="relative">
          {/* Central Line with gradient glow */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2">
            <div className="absolute inset-0 bg-gradient-to-b from-rose-500/40 via-purple-500/25 to-amber-500/10" />
            <div className="absolute inset-0 bg-gradient-to-b from-rose-500/20 via-purple-500/10 to-transparent blur-sm" />
          </div>

          {/* Timeline Cards */}
          <div className="space-y-20">
            {timelineEvents.map((event, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={event.chapter}
                  className={`flex flex-col md:flex-row relative items-start md:items-center ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Node Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    whileHover={{ scale: 1.3, rotate: 10, transition: { type: "spring", stiffness: 300 } }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
                    className="absolute left-4 md:left-1/2 w-10 h-10 rounded-full bg-[#0d0618] border-2 border-rose-500 flex items-center justify-center -translate-x-1/2 z-10 shadow-lg shadow-rose-500/30 cursor-pointer"
                  >
                    <Heart className="w-4 h-4 text-rose-400 fill-rose-500/40" />
                  </motion.div>

                  {/* Card Container */}
                  <div className={`w-full md:w-1/2 pl-14 ${
                    isEven ? "md:pl-8 md:pr-0" : "md:pr-8 md:pl-0"
                  }`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 50 : -50, y: 20 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      whileHover={{ scale: 1.02, y: -5, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.7, type: "spring", stiffness: 60 }}
                      className="glass-panel p-6 md:p-8 rounded-3xl relative overflow-hidden group hover:border-rose-500/30 transition-all duration-500"
                    >
                      {/* Hover gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-rose-500/0 via-rose-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                      
                      {/* Top accent line */}
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-rose-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Chapter Badge */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="inline-block px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-[10px] font-bold tracking-widest text-rose-400 uppercase">
                          {event.chapter}
                        </span>
                        <span className="text-lg">{getAccentEmoji(idx)}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl md:text-2xl font-serif font-medium text-zinc-100 mb-2 group-hover:text-rose-400 transition-colors duration-300">
                        {event.title}
                      </h3>

                      {/* Date */}
                      <div className="flex items-center gap-2 text-xs text-zinc-500 tracking-wider font-light mb-5">
                        <Calendar className="w-3.5 h-3.5 text-rose-500/70" />
                        <span>{event.date}</span>
                      </div>

                      {/* Image Placeholder */}
                      <div className="w-full h-48 rounded-2xl overflow-hidden relative mb-5 bg-zinc-950/80 border border-zinc-800/50 flex items-center justify-center group/img">
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${getPlaceholderGradient(idx)} opacity-70 group-hover/img:scale-110 transition-transform duration-1000`}
                        />
                        {/* Floating particles inside image area */}
                        <div className="absolute inset-0 overflow-hidden">
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              animate={{
                                y: [0, -20, 0],
                                opacity: [0.2, 0.5, 0.2],
                              }}
                              transition={{
                                duration: 3 + i * 0.5,
                                repeat: Infinity,
                                delay: i * 0.4,
                              }}
                              className="absolute"
                              style={{
                                left: `${15 + i * 18}%`,
                                top: `${30 + (i % 3) * 15}%`,
                              }}
                            >
                              <Sparkles className="w-3 h-3 text-rose-400/20" />
                            </motion.div>
                          ))}
                        </div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-zinc-400 space-y-2 relative z-10 pointer-events-none select-none">
                          <Heart className="w-8 h-8 text-rose-500/40 group-hover:scale-125 group-hover:text-rose-500/60 transition-all duration-500" />
                          <span className="text-[10px] tracking-widest uppercase text-zinc-600 font-bold group-hover:text-rose-500/40 transition-colors">
                            {event.title} Memory
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-zinc-400 text-sm leading-relaxed font-light group-hover:text-zinc-300 transition-colors duration-500">
                        {event.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Empty space for other side */}
                  <div className="hidden md:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
