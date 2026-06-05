"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { yourName } from "@/config";

export default function FinalEnding() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.8,
        delayChildren: 0.3,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: "easeOut",
      },
    },
  } as const;

  return (
    <section
      id="final-ending"
      className="relative w-full min-h-screen py-32 px-6 flex flex-col items-center justify-center overflow-hidden text-center"
    >
      {/* Calm gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030008] to-[#010003] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-600/5 rounded-full blur-[160px] pointer-events-none" />
      
      {/* Subtle aurora effect */}
      <div className="absolute inset-0 aurora-bg pointer-events-none opacity-20" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 max-w-2xl space-y-12 select-none"
      >
        {/* Soft glowing heartbeat icon */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              boxShadow: [
                "0 0 20px rgba(255,42,122,0.2), 0 0 40px rgba(255,42,122,0.05)",
                "0 0 40px rgba(255,42,122,0.5), 0 0 80px rgba(255,42,122,0.15)",
                "0 0 20px rgba(255,42,122,0.2), 0 0 40px rgba(255,42,122,0.05)",
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-20 h-20 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500"
          >
            <Heart className="w-10 h-10 fill-rose-500/30" />
          </motion.div>
        </motion.div>

        {/* Cinematic Love Quotes */}
        <div className="space-y-8 font-serif font-light text-zinc-200">
          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-2xl md:text-3xl leading-relaxed tracking-wide"
          >
            &ldquo;Out of billions of people,
            <br />
            somehow I found you.&rdquo;
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-2xl md:text-3xl leading-relaxed tracking-wide"
          >
            &ldquo;And if I had to live
            <br />
            this life again,&rdquo;
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-2xl md:text-3xl font-medium tracking-wide shimmer-text"
          >
            &ldquo;I would still choose you.&rdquo;
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-2xl md:text-3xl tracking-widest font-semibold text-rose-500 text-glow-rose"
          >
            &ldquo;Every. Single. Time.&rdquo;
          </motion.p>
        </div>

        {/* Sparkle divider */}
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-3">
          <Sparkles className="w-4 h-4 text-rose-400/30 animate-sparkle" />
          <span className="text-2xl">❤️</span>
          <Sparkles className="w-4 h-4 text-rose-400/30 animate-sparkle" style={{ animationDelay: "0.5s" }} />
        </motion.div>

        {/* Signature */}
        <motion.div
          variants={itemVariants}
          className="space-y-3"
        >
          <span className="text-xs uppercase tracking-widest text-zinc-500 font-bold">
            Forever Yours,
          </span>
          <h4 className="font-cursive text-5xl sm:text-6xl text-glow-gold text-amber-400 mt-2">
            {yourName}
          </h4>
          <motion.div
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="text-xs text-zinc-600 tracking-widest uppercase font-light mt-4"
          >
            Made with love, code, and stardust ✨
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
