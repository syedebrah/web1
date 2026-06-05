"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, Sparkles, Volume2, Stars } from "lucide-react";
import { petName, yourName } from "@/config";

export default function PressWhenMissMe() {
  const [isOpen, setIsOpen] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; left: number; size: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    if (isOpen) {
      const newHearts = Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 30 + 15,
        delay: Math.random() * 5,
        duration: Math.random() * 6 + 6,
      }));
      setHearts(newHearts);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const message = `My Sweet ${petName},

Whenever you click this button, I want you to close your eyes, take a deep breath, and remember that I am thinking of you at this exact second. Distance, work, or busy schedules can never change the truth: you are my favorite thought.

I miss your smile, the sound of your laugh, the way you say my name, and the warmth of your hand in mine. Every day with you is a blessing, and every day without you is a countdown until we meet again.

You are the first thing I think of when I wake up, and the last dream I hold on to before falling asleep. No matter where we are, we are looking at the same sky and sharing the same stars.

I love you, and I miss you. Send me a text message right now with the word "Rose" so I know you clicked this. 😉

Always and forever,
${yourName}`;

  return (
    <section
      id="miss-me"
      className="relative w-full py-28 px-6 overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Background */}
      <div className="absolute inset-0 aurora-bg pointer-events-none opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-600/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="text-center space-y-10 relative z-10"
      >
        <div className="space-y-3 max-w-sm mx-auto">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Stars className="w-4 h-4 text-rose-400/50 animate-sparkle" />
            <Stars className="w-3 h-3 text-amber-400/40 animate-sparkle" style={{ animationDelay: "0.5s" }} />
          </div>
          <h3 className="text-xl font-serif text-zinc-300 italic">Feeling Lonely?</h3>
          <p className="text-zinc-500 text-xs tracking-widest uppercase font-light">
            Press this button anytime you miss my voice, my hugs, or my presence.
          </p>
        </div>

        {/* Pulse button */}
        <div className="relative inline-flex items-center justify-center">
          {/* Animated ripple rings */}
          <span className="absolute w-full h-full rounded-full bg-rose-500/8 animate-ping scale-125" />
          <span className="absolute w-full h-full rounded-full bg-rose-500/4 animate-ping scale-150" style={{ animationDelay: "0.5s" }} />
          <span className="absolute w-full h-full rounded-full bg-rose-500/3 animate-ping scale-[1.75]" style={{ animationDelay: "1s" }} />
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="relative px-10 py-5 bg-gradient-to-r from-rose-500 via-pink-600 to-rose-500 bg-[length:200%_auto] hover:bg-right text-white font-semibold text-sm tracking-widest uppercase rounded-full shadow-xl shadow-rose-500/30 cursor-pointer flex items-center gap-3 border border-rose-400/20 group transition-all duration-700"
          >
            <Heart className="w-5 h-5 fill-white group-hover:animate-heartbeat transition-transform" />
            Press When You Miss Me
            <Heart className="w-5 h-5 fill-white group-hover:animate-heartbeat transition-transform" />
          </motion.button>
        </div>
      </motion.div>

      {/* Cinematic Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 md:px-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-lg cursor-pointer"
            />

            {/* Floating Hearts */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {hearts.map((heart) => (
                <motion.div
                  key={heart.id}
                  initial={{ y: "105vh", opacity: 0, scale: 0.5 }}
                  animate={{
                    y: "-10vh",
                    opacity: [0, 0.35, 0.35, 0],
                    scale: [0.5, 1, 1, 0.6],
                    x: ["0px", `${Math.sin(heart.id) * 30}px`, `${Math.cos(heart.id) * 30}px`, "0px"],
                  }}
                  transition={{
                    duration: heart.duration,
                    delay: heart.delay,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute text-rose-500/15"
                  style={{
                    left: `${heart.left}%`,
                    width: heart.size,
                    height: heart.size,
                  }}
                >
                  <Heart className="fill-current w-full h-full" />
                </motion.div>
              ))}
            </div>

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="relative w-full max-w-lg glass-panel-rose p-6 md:p-10 rounded-3xl border-rose-500/40 shadow-2xl z-10 max-h-[85vh] flex flex-col overflow-hidden"
            >
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2.5 text-rose-400 hover:text-white rounded-full bg-rose-500/10 hover:bg-rose-500/20 transition-all cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-2 mb-6">
                <Heart className="w-5 h-5 text-rose-400 fill-rose-500/30 animate-heartbeat" />
                <span className="font-serif italic text-rose-300 text-sm tracking-wide">A Message for My Love</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-sparkle" />
              </div>

              {/* Scrollable Letter Body */}
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar paper-texture">
                <p className="text-zinc-100 font-serif font-light text-base md:text-lg leading-relaxed whitespace-pre-line text-left">
                  {message}
                </p>
              </div>

              {/* Footer */}
              <div className="mt-8 pt-4 border-t border-rose-500/10 flex items-center justify-between text-xs text-rose-400/50">
                <span className="font-cursive italic text-sm">Sending all my love...</span>
                <div className="flex items-center gap-1.5 opacity-60">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Audio coming soon</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
