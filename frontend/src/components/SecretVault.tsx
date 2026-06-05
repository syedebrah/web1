"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, Mail, Eye, EyeOff, Shield, Sparkles } from "lucide-react";
import { secretPassword, secretVaultMessage } from "@/config";

export default function SecretVault() {
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase().trim() === secretPassword.toLowerCase().trim()) {
      setIsUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <section
      id="secret-vault"
      className="relative w-full py-28 px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 aurora-bg pointer-events-none opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-3"
          >
            <span className="font-cursive text-2xl md:text-3xl text-rose-400 text-glow-rose block">
              Protected Memories
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-light tracking-wide text-zinc-100">
              The Secret Message Vault
            </h2>
            <p className="text-zinc-500 text-xs md:text-sm tracking-widest uppercase font-light max-w-sm mx-auto mt-2">
              A private letter locked in our digital star-field. Only you hold the key.
            </p>
          </motion.div>
        </div>

        {/* Vault container */}
        <motion.div
          layout
          className="glass-panel p-8 rounded-3xl border-rose-500/10 relative overflow-hidden flex flex-col items-center gradient-border-animated"
        >
          <AnimatePresence mode="wait">
            {!isUnlocked ? (
              <motion.div
                key="locked-state"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="w-full flex flex-col items-center text-center space-y-6"
              >
                {/* Lock icon */}
                <motion.div
                  animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  className={`p-5 rounded-full border transition-all duration-300 ${
                    error
                      ? "bg-red-950/40 border-red-500/50 text-red-400"
                      : "bg-rose-500/10 border-rose-500/20 text-rose-400"
                  }`}
                >
                  <motion.div
                    animate={{ rotate: error ? [0, -15, 15, -15, 0] : 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Lock className="w-8 h-8" />
                  </motion.div>
                </motion.div>

                <div className="space-y-2">
                  <h3 className="text-xl font-serif font-light text-zinc-200">
                    Only You Can Open This
                  </h3>
                  <div className="flex items-center justify-center gap-2 text-xs text-zinc-500">
                    <Shield className="w-3.5 h-3.5 text-purple-400/60" />
                    <span className="tracking-widest uppercase font-light">Encrypted with love</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter the secret key..."
                      className={`w-full px-5 py-4 bg-zinc-950/80 border rounded-2xl text-center text-sm font-medium tracking-widest text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-2 transition-all duration-300 ${
                        error
                          ? "border-red-500/50 focus:ring-red-500/35"
                          : "border-rose-500/20 focus:border-rose-500/40 focus:ring-rose-500/20"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-rose-400 transition-colors cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-400 font-medium tracking-wide"
                    >
                      Key incorrect. Hint: It&apos;s what we share.
                    </motion.p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-rose-500 via-purple-600 to-rose-500 bg-[length:200%_auto] hover:bg-right text-white font-medium text-xs tracking-widest uppercase rounded-2xl shadow-lg transition-all duration-700 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Unlock className="w-4 h-4" />
                    Unlock Vault
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="unlocked-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full flex flex-col items-center"
              >
                <div className="relative w-full max-w-md bg-zinc-950/50 rounded-2xl border border-rose-500/20 p-6 md:p-8 flex flex-col items-center overflow-visible">
                  <motion.div
                    initial={{ y: -20, scale: 0.8, opacity: 0 }}
                    animate={{ y: 0, scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="p-3 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 mb-6"
                  >
                    <Mail className="w-6 h-6" />
                  </motion.div>

                  <div className="w-full bg-[#0a0612] border border-rose-500/10 rounded-2xl p-6 relative overflow-hidden shadow-2xl paper-texture">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-purple-500 to-amber-500" />
                    
                    <motion.div
                      initial={{ y: 100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.8, type: "spring", stiffness: 70 }}
                      className="text-zinc-300 text-sm md:text-base leading-relaxed font-light text-left font-serif space-y-4 whitespace-pre-line"
                    >
                      {secretVaultMessage}
                    </motion.div>
                  </div>

                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    onClick={() => {
                      setIsUnlocked(false);
                      setPassword("");
                    }}
                    className="mt-6 text-xs text-rose-400/60 hover:text-rose-400 font-semibold uppercase tracking-widest cursor-pointer underline underline-offset-4 transition-colors flex items-center gap-2"
                  >
                    <Lock className="w-3 h-3" />
                    Lock Vault Again
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
