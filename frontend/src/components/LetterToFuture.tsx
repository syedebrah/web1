"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MailOpen, Heart, Sparkles, X, ArrowUpRight } from "lucide-react";
import { futureLetter, girlfriendName } from "@/config";

export default function LetterToFuture() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section
      id="special-letter"
      className="relative w-full py-28 px-6 overflow-hidden flex flex-col items-center justify-center scroll-mt-28"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 aurora-bg pointer-events-none opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-rose-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full relative z-10 flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-3"
          >
            <span className="font-cursive text-2xl md:text-3xl text-rose-400 text-glow-rose block">
              A Message for the Years Ahead
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-light tracking-wide text-zinc-100">
              Letter To My Future Love
            </h2>
            <p className="text-zinc-500 text-xs md:text-sm tracking-widest uppercase font-light max-w-sm mx-auto mt-2">
              A private digital envelope. Click to break the wax seal and open the letter.
            </p>
          </motion.div>
        </div>

        {/* Envelope Container */}
        <div className="relative w-full max-w-lg flex flex-col items-center justify-center min-h-[350px]">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.div
                key="closed-envelope"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                whileHover={{ scale: 1.05, y: -5, rotate: [-1, 1, -1, 0], transition: { duration: 0.5 } }}
                onClick={() => setIsOpen(true)}
                className="w-full max-w-md h-64 bg-[#0a0612] border border-rose-500/20 rounded-2xl relative shadow-2xl cursor-pointer overflow-hidden group flex flex-col items-center justify-center gap-6 hover:border-rose-500/35 hover:shadow-rose-500/10 transition-all duration-500"
              >
                {/* Background effects */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-rose-500/5 to-purple-500/5 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/0 via-transparent to-amber-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                {/* Fold lines */}
                <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-rose-500/25 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent" />

                {/* Wax Seal */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1], rotate: [0, 2, 0, -2, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-18 h-18 rounded-full bg-gradient-to-br from-rose-500 to-red-600 border-2 border-rose-400/50 flex items-center justify-center shadow-xl shadow-rose-600/30 relative z-10 group-hover:from-rose-400 group-hover:to-red-500 transition-colors duration-500"
                  style={{ width: 72, height: 72 }}
                >
                  <Heart className="w-7 h-7 text-white fill-white/80 animate-heartbeat" />
                </motion.div>

                <div className="text-center relative z-10 space-y-1.5">
                  <p className="text-sm font-medium tracking-widest text-zinc-300 uppercase font-sans group-hover:text-rose-400 transition-colors duration-300">
                    For {girlfriendName}&apos;s Eyes Only
                  </p>
                  <span className="text-[10px] tracking-widest uppercase text-zinc-500 font-bold flex items-center justify-center gap-1.5 group-hover:text-rose-400/60 transition-colors">
                    Click to Unseal <ArrowUpRight className="w-3 h-3 text-rose-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>

                {/* Sparkle decorations */}
                <div className="absolute top-4 left-5 text-rose-500/10 group-hover:text-rose-500/25 transition-colors">
                  <Sparkles className="w-4 h-4 animate-sparkle" />
                </div>
                <div className="absolute bottom-4 right-5 text-purple-500/10 group-hover:text-purple-500/25 transition-colors">
                  <Sparkles className="w-4 h-4 animate-sparkle" style={{ animationDelay: "1s" }} />
                </div>
                <div className="absolute top-4 right-5 text-amber-500/10 group-hover:text-amber-500/20 transition-colors">
                  <Sparkles className="w-3 h-3 animate-sparkle" style={{ animationDelay: "0.5s" }} />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="open-letter"
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 80, damping: 20 }}
                className="w-full max-w-2xl glass-panel-gold p-8 md:p-12 rounded-3xl border-amber-500/20 shadow-2xl relative"
              >
                {/* Close button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 p-2.5 text-amber-500/70 hover:text-white rounded-full bg-amber-500/10 hover:bg-amber-500/20 transition-all cursor-pointer"
                  aria-label="Close letter"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Ribbon */}
                <div className="flex items-center justify-center gap-2 mb-6 text-amber-400">
                  <MailOpen className="w-5 h-5 text-amber-400" />
                  <span className="font-serif italic text-amber-300 tracking-wider">A Letter from My Heart</span>
                  <Sparkles className="w-4 h-4 text-amber-400 animate-sparkle" />
                </div>

                {/* Letter body */}
                <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar border-t border-b border-amber-500/10 py-6 paper-texture">
                  <p className="text-zinc-200 font-serif font-light text-base md:text-lg leading-relaxed whitespace-pre-line text-left">
                    {futureLetter}
                  </p>
                </div>

                <div className="mt-6 flex justify-between items-center text-xs text-amber-500/60">
                  <span className="font-cursive text-sm italic">Always yours...</span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-amber-500 hover:text-amber-400 uppercase font-semibold tracking-widest cursor-pointer underline underline-offset-4 transition-colors"
                  >
                    Seal Envelope Again
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
