"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "../ui/Magnetic";
import { scrollToSection } from "@/lib/scrollToSection";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const scrollToTop = () => {
    window.history.replaceState(null, "", "/");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const navLinkClass =
    "hover:text-white transition-colors bg-transparent border-0 p-0 font-inherit text-inherit inline-block";

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        // Tightened mobile padding: px-3 py-3 for mobile, thicker on md+
        className="fixed top-0 left-0 w-full z-50 px-3 py-3 md:px-6 md:py-4 pointer-events-none"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between bg-white/5 backdrop-blur-lg border border-white/10 px-4 py-3 md:px-6 rounded-2xl shadow-2xl pointer-events-auto relative z-50">
          {/* LOGO */}
          <div
            onClick={scrollToTop}
            className="cursor-pointer flex items-center select-none text-xl font-black tracking-tighter group"
          >
            <span className="text-white transition-all duration-300 ease-out group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-fuchsia-500 group-hover:to-pink-500">
              SWEET
            </span>
            <span className="text-blue-600">HOST</span>
          </div>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <a
              href="#work"
              className={navLinkClass}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("work");
              }}
            >
              Work
            </a>
            <a
              href="#about"
              className={navLinkClass}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("about");
              }}
            >
              About
            </a>
            <a
              href="#contact"
              className={navLinkClass}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
            >
              Contact
            </a>
          </div>

          {/* RIGHT SIDE: Let's Talk Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <Magnetic>
              {/* Hidden on ultra-small screens so it doesn't crowd the hamburger menu */}
              <motion.span
                whileTap={{ scale: 0.95 }}
                className="hidden sm:inline-flex"
              >
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("contact");
                  }}
                  className="inline-flex items-center justify-center bg-blue-600 text-white px-5 py-2 rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20 transition-all duration-300 hover:scale-105 hover:bg-cyber-pink hover:shadow-[0_0_24px_rgba(255,0,193,0.55)]"
                >
                  {"Let's Talk"}
                </a>
              </motion.span>
            </Magnetic>

            {/* MOBILE HAMBURGER BUTTON */}
            <button
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              type="button"
              className="md:hidden relative flex flex-col gap-1.5 items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white z-50 transition-colors active:bg-white/20"
              aria-expanded={isDrawerOpen}
              aria-label={isDrawerOpen ? "Close menu" : "Open menu"}
            >
              <motion.span
                animate={{
                  rotate: isDrawerOpen ? 45 : 0,
                  y: isDrawerOpen ? 6 : 0,
                }}
                className="w-5 h-0.5 bg-white block rounded-full"
              />
              <motion.span
                animate={{ opacity: isDrawerOpen ? 0 : 1 }}
                className="w-5 h-0.5 bg-white block rounded-full"
              />
              <motion.span
                animate={{
                  rotate: isDrawerOpen ? -45 : 0,
                  y: isDrawerOpen ? -6 : 0,
                }}
                className="w-5 h-0.5 bg-white block rounded-full"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE DRAWER OVERLAY (Slides from top) */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="md:hidden fixed inset-x-0 top-0 pt-28 pb-10 bg-black/90 backdrop-blur-xl border-b border-white/10 z-40 rounded-b-3xl flex flex-col items-center justify-center gap-6 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
          >
            {(
              [
                ["Work", "work"],
                ["About", "about"],
                ["Contact", "contact"],
              ] as const
            ).map((item, i) => (
              <motion.div
                key={item[0]}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <a
                  href={`#${item[1]}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item[1], {
                      onDone: () => setIsDrawerOpen(false),
                    });
                  }}
                  className="text-3xl font-black text-white tracking-tighter active:text-fuchsia-500 transition-colors py-3 px-8 block"
                >
                  {item[0]}
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
