"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Music, Volume2, VolumeX, RotateCcw } from "lucide-react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  // Try to autoplay on first user interaction with the page
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted && audioRef.current) {
        setHasInteracted(true);
        audioRef.current.volume = 0.5;
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Autoplay blocked — user needs to click play
          setIsPlaying(false);
        });
      }
    };

    // Listen for any user interaction
    window.addEventListener("click", handleFirstInteraction, { once: true });
    window.addEventListener("touchstart", handleFirstInteraction, { once: true });
    window.addEventListener("scroll", handleFirstInteraction, { once: true });
    window.addEventListener("keydown", handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("scroll", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };
  }, [hasInteracted]);

  // Hide tooltip after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Track progress
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", () => {
      // Loop the song
      audio.currentTime = 0;
      audio.play();
    });

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setHasInteracted(true);
      }).catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const restartSong = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    if (!isPlaying) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setHasInteracted(true);
      }).catch(() => {});
    }
  };

  return (
    <>
      {/* Audio Element */}
      <audio ref={audioRef} src="/love.mp3" preload="auto" loop autoPlay />

      {/* Floating Music Player — Bottom Left */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col items-center gap-2">
        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && !isPlaying && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="px-3 py-1.5 glossy-card rounded-xl text-[10px] text-rose-300 font-medium tracking-wider uppercase whitespace-nowrap"
            >
              🎵 Tap to play our song
            </motion.div>
          )}
        </AnimatePresence>

        {/* Player Controls */}
        <div className="flex items-center gap-2 glossy-card p-2 rounded-full shadow-lg shadow-black/40">
          {/* Restart */}
          <button
            onClick={restartSong}
            className="p-2.5 rounded-full text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all duration-300 cursor-pointer"
            title="Restart Song"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Mute/Unmute */}
          <button
            onClick={toggleMute}
            className="p-2.5 rounded-full text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all duration-300 cursor-pointer"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>

          {/* Play/Pause Button with circular progress */}
          <button
            onClick={togglePlay}
            className="relative p-3 rounded-full cursor-pointer group"
            title={isPlaying ? "Pause" : "Play"}
          >
            {/* Circular progress ring */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90"
              viewBox="0 0 44 44"
            >
              {/* Background track */}
              <circle
                cx="22"
                cy="22"
                r="19"
                fill="transparent"
                stroke="rgba(255,42,122,0.1)"
                strokeWidth="2"
              />
              {/* Progress arc */}
              <circle
                cx="22"
                cy="22"
                r="19"
                fill="transparent"
                stroke="url(#musicProgress)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 19}`}
                strokeDashoffset={`${2 * Math.PI * 19 * (1 - progress / 100)}`}
                className="transition-all duration-300"
              />
              <defs>
                <linearGradient id="musicProgress" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff2a7a" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>

            {/* Icon */}
            <div className="relative z-10 text-rose-400 group-hover:text-rose-300 transition-colors">
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current" />
              )}
            </div>

            {/* Pulsing glow when playing */}
            {isPlaying && (
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full bg-rose-500/20"
              />
            )}
          </button>

          {/* Music icon indicator */}
          <div className="p-2.5 rounded-full text-zinc-500">
            <motion.div
              animate={isPlaying ? { rotate: [0, 360] } : {}}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Music className="w-4 h-4" />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
