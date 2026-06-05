"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Heart, Sparkles, MessageCircleHeart } from "lucide-react";
import confetti from "canvas-confetti";

interface ActiveEasterEgg {
  title: string;
  message: string;
  type: "hug" | "cosmic" | "spam";
}

interface MiniHeart {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  wobble: number;
}

export default function EasterEggs() {
  const [activeEgg, setActiveEgg] = useState<ActiveEasterEgg | null>(null);
  const [miniHearts, setMiniHearts] = useState<MiniHeart[]>([]);
  const [heartClicks, setHeartClicks] = useState(0);
  const heartTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Trigger a shower of mini hearts across the screen
  const triggerHeartShower = (xPos?: number, yPos?: number) => {
    const colors = ["#ff2a7a", "#ff529a", "#a855f7", "#ec4899", "#f43f5e", "#ff85a7"];
    const count = 25;
    const newHearts: MiniHeart[] = [];
    
    for (let i = 0; i < count; i++) {
      newHearts.push({
        id: Math.random() + i,
        // If xPos/yPos are provided (mouse click), spawn there, otherwise randomize screen width
        x: xPos !== undefined ? xPos + (Math.random() - 0.5) * 80 : Math.random() * window.innerWidth,
        y: yPos !== undefined ? yPos + (Math.random() - 0.5) * 80 : window.innerHeight + 50,
        size: Math.random() * 20 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: 2.2 + Math.random() * 0.8,
        wobble: Math.random() * 120 - 60,
      });
    }

    setMiniHearts((prev) => [...prev, ...newHearts]);

    // Cleanup after animation completes
    setTimeout(() => {
      setMiniHearts((prev) => prev.filter((h) => !newHearts.includes(h)));
    }, 3000);
  };

  useEffect(() => {
    // Key listener for "H" key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "h") {
        // Prevent key spam triggering overlays on top of each other
        if (activeEgg) return;

        // Trigger hearts
        triggerHeartShower();
        // Trigger confetti
        confetti({
          particleCount: 40,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#ff2a7a", "#a855f7"],
        });
        confetti({
          particleCount: 40,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#ff2a7a", "#a855f7"],
        });

        // Activate notification
        setActiveEgg({
          title: "Secret Easter Egg Unlocked!",
          message: "You pressed the 'H' key! Sending you a virtual hug and infinite warmth! 🤗💖",
          type: "hug",
        });

        setTimeout(() => setActiveEgg(null), 5000);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeEgg]);

  // Handle clicking the heart icon multiple times
  const handleHeartClick = (e: React.MouseEvent) => {
    // Spawn a heart at pointer location
    triggerHeartShower(e.clientX, e.clientY);

    if (heartTimeoutRef.current) {
      clearTimeout(heartTimeoutRef.current);
    }

    setHeartClicks((prev) => {
      const newVal = prev + 1;
      if (newVal >= 6) {
        // Trigger massive explosion
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
          colors: ["#ff2a7a", "#a855f7", "#ec4899"],
        });

        setActiveEgg({
          title: "Overload of Affection!",
          message: "You clicked the heart too many times! My database is overflowing with love metrics! 📈❤️",
          type: "spam",
        });

        setTimeout(() => setActiveEgg(null), 5000);
        return 0; // reset
      }
      return newVal;
    });

    // Reset heart clicks if user stops clicking for 3 seconds
    heartTimeoutRef.current = setTimeout(() => setHeartClicks(0), 3000);
  };

  // Double click Moon
  const handleMoonDoubleClick = () => {
    confetti({
      particleCount: 80,
      spread: 100,
      colors: ["#eab308", "#ffffff", "#c084fc"],
    });

    setActiveEgg({
      title: "Cosmic Connection Activated!",
      message: "You double-clicked the Moon! Even in the darkest nights, my love for you shines brighter than the stars. 🌌🌙",
      type: "cosmic",
    });

    // Make a temporary style change to body background particles via custom event if we want,
    // or just let the easter egg notification carry the vibe.
    setTimeout(() => setActiveEgg(null), 6000);
  };

  return (
    <>
      {/* Floating widgets at bottom right */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
        {/* Heart click tracker indicator */}
        {heartClicks > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="px-2 py-1 bg-[#ff2a7a]/20 border border-[#ff2a7a]/30 rounded-lg text-[10px] text-rose-300 font-bold tracking-widest uppercase font-mono"
          >
            Love combo: x{heartClicks}
          </motion.div>
        )}

        <div className="flex items-center gap-3 bg-[#0d0618]/80 backdrop-blur-xl border border-rose-500/10 p-2.5 rounded-full shadow-lg shadow-black/50">
          {/* Moon Icon (Double Click) */}
          <button
            onDoubleClick={handleMoonDoubleClick}
            title="Double-click me for a cosmic surprise"
            className="p-3 bg-zinc-950/60 hover:bg-[#eab308]/10 text-zinc-400 hover:text-amber-400 rounded-full transition-colors cursor-pointer group"
          >
            <Moon className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
          </button>

          {/* Heart Icon (Spam clicks) */}
          <button
            onClick={handleHeartClick}
            onDoubleClick={() => {
              triggerHeartShower();
              setActiveEgg({
                title: "Double Heart Action!",
                message: "You double clicked the heart. A rain of love falls from the heavens! 🌧️💖",
                type: "spam",
              });
              setTimeout(() => setActiveEgg(null), 5000);
            }}
            title="Click me repeatedly or double-click"
            className="p-3 bg-zinc-950/60 hover:bg-[#ff2a7a]/10 text-zinc-400 hover:text-rose-400 rounded-full transition-colors cursor-pointer group relative"
          >
            <Heart className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
          </button>
        </div>
      </div>

      {/* Floating mini hearts rendering */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        <AnimatePresence>
          {miniHearts.map((h) => (
            <motion.div
              key={h.id}
              initial={{ opacity: 0, y: h.y, x: h.x, scale: 0.3 }}
              animate={{
                opacity: [0, 1, 1, 0],
                y: -100, // rise up
                x: h.x + (Math.sin(h.id) * h.wobble), // stable wobble
                scale: [0.3, 1.2, 1, 0.5],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: h.duration,
                ease: "easeOut",
              }}
              className="absolute pointer-events-none"
              style={{ color: h.color }}
            >
              <Heart className="fill-current" style={{ width: h.size, height: h.size }} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Active Easter Egg Notification banner */}
      <AnimatePresence>
        {activeEgg && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-50 pointer-events-auto"
          >
            <div className="glass-panel-rose p-5 rounded-2xl border-rose-500/40 shadow-2xl flex gap-4 items-start">
              <div className="p-2 bg-rose-500/20 border border-rose-500/30 rounded-xl text-rose-400 shrink-0">
                {activeEgg.type === "cosmic" ? (
                  <Sparkles className="w-5 h-5 text-amber-400" />
                ) : (
                  <MessageCircleHeart className="w-5 h-5" />
                )}
              </div>
              <div className="space-y-1.5">
                <h4 className="text-sm font-bold uppercase tracking-wider text-rose-300 font-serif">
                  {activeEgg.title}
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed font-light">
                  {activeEgg.message}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
