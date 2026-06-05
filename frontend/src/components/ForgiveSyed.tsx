"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Heart, Sparkles, Check } from "lucide-react";
import confetti from "canvas-confetti";
import { yourName } from "@/config";

interface FloatingHeart {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
}

interface ExplosionHeart {
  id: number;
  x: number;
  y: number;
  scale: number;
  rotate: number;
}

interface YesHeart {
  id: number;
  x: number;
  y: number;
}

export default function ForgiveSyed() {
  const [step, setStep] = useState(0); // 0: before leave, 1: final question, 2: forgive question + buttons, 3: success
  const [hasStarted, setHasStarted] = useState(false);
  const [hasNoHovered, setHasNoHovered] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [noStage, setNoStage] = useState(0);
  const [yesScale, setYesScale] = useState(1);
  const [yesGlow, setYesGlow] = useState(0);
  const [yesHearts, setYesHearts] = useState<YesHeart[]>([]);
  const [explosionHearts, setExplosionHearts] = useState<ExplosionHeart[]>([]);
  const [bgHearts, setBgHearts] = useState<FloatingHeart[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Triggers the sequence when 40% of the section is visible
  const isInView = useInView(sectionRef, { once: true, amount: 0.4 });

  useEffect(() => {
    if (isInView && !hasStarted) {
      setHasStarted(true);
    }
  }, [isInView, hasStarted]);

  // Handle the intro text transitions
  useEffect(() => {
    if (!hasStarted) return;

    const t1 = setTimeout(() => {
      setStep(1);
    }, 2500);

    const t2 = setTimeout(() => {
      setStep(2);
    }, 5000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [hasStarted]);

  // Continuous background hearts
  useEffect(() => {
    const hearts = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 16 + 8,
      delay: Math.random() * 5,
      duration: Math.random() * 5 + 5,
    }));
    setBgHearts(hearts);
  }, []);

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.5 },
      colors: ["#ff2a7a", "#a855f7", "#ec4899", "#fb7185", "#fbbf24"],
    });

    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#ff2a7a", "#a855f7"],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#ff2a7a", "#fbbf24"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const triggerYesHearts = () => {
    const newHearts = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      x: (Math.random() - 0.5) * 120,
      y: -50 - Math.random() * 80,
    }));
    setYesHearts((prev) => [...prev, ...newHearts].slice(-30));
  };

  const handleNoHover = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;

    if (e.type === "touchstart") {
      e.preventDefault();
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const buttonWidth = 140; // Max estimated button width
    const buttonHeight = 48;

    const maxW = containerRect.width - buttonWidth - 20;
    const maxH = containerRect.height - buttonHeight - 20;

    let newX = Math.random() * maxW + 10;
    let newY = Math.random() * maxH + 10;

    // Ensure it jumps away from center / current position
    if (Math.abs(newX - noPosition.x) < 40) newX = (newX + 80) % maxW;
    if (Math.abs(newY - noPosition.y) < 40) newY = (newY + 60) % maxH;

    setNoPosition({ x: newX, y: newY });
    setNoStage((prev) => prev + 1);
    setYesScale((prev) => Math.min(2.2, prev + 0.15));
    setYesGlow((prev) => Math.min(100, prev + 15));
    setHasNoHovered(true);
    triggerYesHearts();
  };

  const handleYesClick = () => {
    setStep(3);
    triggerConfetti();

    // Spawn heart explosion coordinates radiating outwards
    const hearts = Array.from({ length: 45 }).map((_, i) => {
      const angle = (i / 45) * 2 * Math.PI + (Math.random() - 0.5) * 0.15;
      const velocity = 120 + Math.random() * 320;
      return {
        id: i,
        x: Math.cos(angle) * velocity,
        y: Math.sin(angle) * velocity,
        scale: 0.6 + Math.random() * 1.2,
        rotate: Math.random() * 360,
      };
    });
    setExplosionHearts(hearts);
  };

  const getNoButtonText = () => {
    if (noStage < 4) return "NO 😏";
    if (noStage === 4) return "Are You Sure? 🥺";
    if (noStage === 5) return "Think Again 😭";
    if (noStage === 6) return "Please? ❤️";
    return "Pretty Please? 🌹";
  };

  const getNoButtonScale = () => {
    if (noStage < 3) return 1;
    return Math.max(0.55, 1 - (noStage - 2) * 0.08);
  };

  return (
    <section
      id="forgive-syed"
      ref={sectionRef}
      className="relative w-full min-h-screen py-28 px-6 flex flex-col items-center justify-center overflow-hidden scroll-mt-28"
    >
      {/* Background atmosphere */}
      <div className="absolute inset-0 aurora-bg pointer-events-none opacity-25" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-500/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Floating continuous bg hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {bgHearts.map((heart) => (
          <motion.div
            key={`forgive-bg-heart-${heart.id}`}
            initial={{ y: "110%", x: `${heart.x}%`, opacity: 0, rotate: 0 }}
            animate={{
              y: ["110%", "-10%"],
              opacity: [0, 0.25, 0.25, 0],
              rotate: [0, 45, -45, 0],
            }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute bottom-0 text-[#ff2a7a]"
          >
            <Heart style={{ width: heart.size, height: heart.size }} className="fill-rose-500/10" />
          </motion.div>
        ))}
      </div>

      <div className="w-full max-w-xl relative z-10 flex flex-col items-center justify-center min-h-[350px]">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.h3
              key="step0"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.8 }}
              className="text-2xl md:text-3xl font-serif font-light tracking-wider text-zinc-300 italic select-none"
            >
              Before you leave...
            </motion.h3>
          )}

          {step === 1 && (
            <motion.h3
              key="step1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.8 }}
              className="text-2xl md:text-3xl font-serif font-light tracking-wider text-zinc-300 italic select-none"
            >
              I have one final question.
            </motion.h3>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8 }}
              className="w-full text-center space-y-10"
            >
              <div className="space-y-4">
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-flex p-3 bg-rose-500/10 border border-rose-500/20 rounded-full"
                >
                  <Heart className="w-7 h-7 text-rose-500 fill-rose-500/10" />
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-zinc-100 tracking-wide leading-tight">
                  Will you forgive {yourName}? ❤️
                </h2>
              </div>

              {/* Interaction Panel */}
              <div
                ref={containerRef}
                className="relative w-full h-[260px] bg-zinc-950/35 border border-white/5 rounded-3xl overflow-hidden flex items-center justify-center p-6 backdrop-blur-sm"
              >
                {/* YES Button Container */}
                <div className="flex items-center justify-center relative">
                  {/* Sprouted floating hearts from YES button */}
                  {yesHearts.map((h) => (
                    <motion.div
                      key={h.id}
                      initial={{ opacity: 1, y: 0, x: 0, scale: 0.8 }}
                      animate={{ opacity: 0, y: h.y, x: h.x, scale: 0.4 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="absolute w-4 h-4 text-rose-400 pointer-events-none"
                    >
                      <Heart className="fill-current w-full h-full" />
                    </motion.div>
                  ))}

                  <motion.button
                    animate={{ scale: yesScale }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    style={{
                      boxShadow: `0 0 ${20 + yesGlow}px rgba(255, 42, 122, ${0.45 + yesGlow * 0.005})`,
                    }}
                    onClick={handleYesClick}
                    className="relative px-8 py-3.5 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 text-white font-bold tracking-wider rounded-full cursor-pointer z-20 border border-white/10 select-none"
                  >
                    YES ❤️
                  </motion.button>
                </div>

                {/* NO Button */}
                <motion.button
                  onMouseEnter={handleNoHover}
                  onTouchStart={handleNoHover}
                  animate={
                    hasNoHovered
                      ? { x: noPosition.x, y: noPosition.y, scale: getNoButtonScale() }
                      : { scale: 1 }
                  }
                  transition={{ type: "spring", stiffness: 220, damping: 19 }}
                  className={`${
                    hasNoHovered ? "absolute left-0 top-0 z-30" : "ml-6"
                  } px-6 py-3.5 bg-zinc-900 border border-zinc-700 hover:border-zinc-500 text-zinc-400 font-bold tracking-wider rounded-full cursor-pointer select-none`}
                >
                  {getNoButtonText()}
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full text-center space-y-10 flex flex-col items-center justify-center relative"
            >
              {/* Explosion Hearts */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-visible">
                {explosionHearts.map((h) => (
                  <motion.div
                    key={`expl-heart-${h.id}`}
                    initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
                    animate={{ x: h.x, y: h.y, scale: h.scale, opacity: [1, 1, 0], rotate: h.rotate }}
                    transition={{ duration: 2.2, ease: "easeOut" }}
                    className="absolute text-rose-500 pointer-events-none"
                  >
                    <Heart className="w-8 h-8 fill-current" />
                  </motion.div>
                ))}
              </div>

              {/* Title & Celebration */}
              <div className="space-y-3">
                <motion.h1
                  initial={{ scale: 0.8 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, type: "spring" }}
                  className="text-5xl md:text-6xl font-black font-serif shimmer-text tracking-wide select-none"
                >
                  YAYYYYY ❤️
                </motion.h1>
                <p className="text-rose-400 font-bold tracking-widest uppercase text-xs">
                  Mission Successful.
                </p>
              </div>

              {/* Animated Official Seal */}
              <motion.div
                initial={{ rotate: -10, scale: 0 }}
                animate={{ rotate: 5, scale: 1 }}
                transition={{ type: "spring", delay: 0.3, stiffness: 200, damping: 15 }}
                className="flex flex-col items-center justify-center gap-3 px-8 py-6 bg-emerald-950/20 border-2 border-emerald-500/30 rounded-2xl backdrop-blur-md relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-emerald-500/5 pointer-events-none animate-pulse" />
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <svg className="w-full h-full text-emerald-400" viewBox="0 0 100 100">
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="42"
                      stroke="currentColor"
                      strokeWidth="5"
                      fill="transparent"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    />
                    <motion.path
                      d="M32 50 L45 63 L68 35"
                      stroke="currentColor"
                      strokeWidth="7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="transparent"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.8, ease: "easeInOut" }}
                    />
                  </svg>
                </div>
                <span className="text-emerald-400 text-sm font-bold uppercase tracking-[0.2em] font-sans">
                  Forgiveness Approved
                </span>
              </motion.div>

              {/* Final Apology Acceptance Details */}
              <div className="glass-panel p-8 rounded-3xl w-full max-w-md space-y-4 border border-rose-500/10">
                <p className="text-zinc-200 text-lg font-serif italic font-light">
                  "{yourName} has been officially forgiven."
                </p>
                <p className="text-zinc-400 text-sm font-light leading-relaxed">
                  Thank you for taking this journey. You mean more to me than words can explain.
                </p>
                <p className="text-rose-400 font-bold text-sm tracking-wide mt-2">
                  Now go text me back. 😘❤️
                </p>
              </div>

              {/* Send Whatsapp Text Direct Callback */}
              <motion.a
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(16, 185, 129, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/?text=I%20forgive%20you%20Syed%20%E2%9D%A4%EF%B8%8F%20Let%27s%20make%20up%21"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold tracking-wider uppercase text-xs rounded-full shadow-lg shadow-emerald-600/20 cursor-pointer flex items-center justify-center gap-2 border border-white/10"
              >
                <span>Text Syed Back 📱</span>
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
