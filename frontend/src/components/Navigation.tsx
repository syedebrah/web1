"use client";

import { useState, useEffect } from "react";
import { Menu, X, Heart, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { girlfriendName } from "@/config";

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: "Home", href: "#home" },
  { name: "Anniversary", href: "#anniversary-wishes" },
  { name: "Reasons", href: "#reasons" },
  { name: "Dreams", href: "#dreams" },
  { name: "Special Letter", href: "#special-letter" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Cache the elements once to avoid layout thrashing during scroll reflows
    const elements = navItems.map((item) => ({
      href: item.href,
      id: item.href.replace("#", ""),
      el: document.querySelector(item.href) as HTMLElement | null,
    })).filter((x) => x.el !== null);

    const handleScroll = () => {
      // Toggle scrolled state
      setScrolled(window.scrollY > 50);

      // Determine active section
      const scrollPosition = window.scrollY + 150;
      for (const item of elements) {
        const el = item.el;
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
          }
        }
      }
    };

    // Use passive listener to improve scroll response times
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-[#030008]/80 backdrop-blur-2xl border-b border-rose-500/8 py-3 shadow-xl shadow-black/30"
          : "bg-transparent border-b border-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={(e) => handleScrollTo(e, "#home")}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500/30 group-hover:fill-rose-500 transition-all duration-300" />
          </motion.div>
          <span className="font-serif font-semibold text-lg tracking-wider shimmer-text select-none">
            Our Universe
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace("#", "");
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleScrollTo(e, item.href)}
                className={`relative px-4 py-2 rounded-full font-medium text-xs tracking-widest uppercase transition-all duration-500 hover:text-rose-400 ${
                  isActive
                    ? "text-rose-400 font-semibold bg-rose-500/8"
                    : "text-zinc-400 hover:bg-white/3"
                }`}
              >
                {item.name}
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-0.5 left-3 right-3 h-[2px] bg-gradient-to-r from-rose-500 via-purple-500 to-rose-500 rounded-full"
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-zinc-300 hover:text-rose-400 transition-colors p-2 rounded-full hover:bg-rose-500/10"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-x-0 top-[60px] h-screen bg-[#030008]/95 backdrop-blur-2xl md:hidden flex flex-col items-center justify-start pt-16 gap-6 px-6 z-40 border-t border-rose-500/10"
          >
            {navItems.map((item, idx) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleScrollTo(e, item.href)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08, duration: 0.4 }}
                  className={`text-xl font-medium tracking-wider transition-all duration-300 px-6 py-3 rounded-2xl ${
                    isActive
                      ? "text-rose-400 font-bold text-glow-rose bg-rose-500/10 scale-105"
                      : "text-zinc-400 hover:text-rose-300 hover:bg-white/3"
                  }`}
                >
                  {item.name}
                </motion.a>
              );
            })}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 text-center text-xs text-rose-500/50 font-serif italic flex items-center gap-2"
            >
              <Sparkles className="w-3 h-3 text-rose-500/30" />
              Made with love for {girlfriendName}
              <Heart className="w-3 h-3 text-rose-500/40 fill-rose-500/20" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
