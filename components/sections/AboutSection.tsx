"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";

const roles = ["DEVELOPER", "DESIGNER", "ADVISOR", "CONSULTANT"];

const AboutSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // 1. Create a state to hold the timing array (default to desktop)
  const [scrollRange, setScrollRange] = useState([0.28, 0.5]);

  // 2. Check the screen size when the component loads and if it resizes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setScrollRange([0.15, 0.4]); // Mobile: Hurry up
      } else {
        setScrollRange([0.28, 0.5]); // Desktop: Take your time
      }
    };

    handleResize(); // Run once immediately
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 3. The Master Tracker now uses the dynamic 'scrollRange'
  const scanProgress = useTransform(scrollYProgress, scrollRange, [0, 100]);
  const laserX = useTransform(scanProgress, (val) => `${val}%`);
  const clipPath = useTransform(
    scanProgress,
    (val) => `inset(0 ${100 - val}% 0 0)`,
  );

  const quoteY = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={containerRef}
      style={{ position: "relative" }}
      className="relative min-h-screen w-full bg-black flex flex-col justify-center px-6 md:px-24 py-32 overflow-hidden"
    >
      <div className="max-w-6xl w-full relative">
        {/* 1. The Parallax Quote */}
        <motion.span
          style={{ y: quoteY }}
          className="absolute -top-32 -left-20 text-[25rem] font-black text-white/5 pointer-events-none select-none leading-none z-0"
        >
          &ldquo;
        </motion.span>

        {/* 2. The Laser Beam */}
        <motion.div
          style={{ left: laserX }}
          className="absolute top-0 bottom-0 w-[2px] bg-electric-blue shadow-[0_0_20px_rgba(0,242,255,0.8)] z-30"
        />

        {/* 3. The Revealed Content (ClipPath Wrapper) */}
        <motion.div style={{ clipPath }} className="relative z-20 w-full">
          {/* PERSONA FLIPPER HEADLINE */}
          {/* Scaled down to text-5xl for mobile, md:text-7xl for tablet, lg:text-8xl for desktop */}
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-none mb-8 md:mb-12">
            REI IS A <br />
            <div className="h-[1.1em] overflow-hidden relative inline-block align-bottom">
              <motion.div
                key={index}
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                className="text-electric-blue italic"
              >
                {roles[index]}
              </motion.div>
            </div>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <p className="text-lg md:text-2xl text-gray-400 font-medium leading-relaxed">
              I am a developer who believes the web {"shouldn't"} be flat. By
              merging <span className="text-white">3D motion</span> with clean
              code, I build digital experiences that feel physical, responsive,
              and unforgettable.
            </p>

            <div className="space-y-6">
              <div className="border-l-2 border-neon-purple pl-6">
                <h4 className="text-white font-bold uppercase tracking-widest text-sm">
                  Vision
                </h4>
                <p className="text-gray-500">
                  To bridge the gap between imagination and the browser.
                </p>
              </div>
              <div className="border-l-2 border-cyber-pink pl-6">
                <h4 className="text-white font-bold uppercase tracking-widest text-sm">
                  Focus
                </h4>
                <p className="text-gray-500">
                  Next.js, Framer Motion, and 3D Interaction.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
