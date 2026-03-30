"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const HeroSection = () => {
  const containerRef = useRef(null);

  // Tracking scroll progress of this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax Math: [Input Range 0 to 1] -> [Output Movement in Pixels]
  const textY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const videoY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      style={{ position: "relative" }} //Forced inline style
      className="h-[120vh] w-full flex items-center justify-center overflow-hidden bg-black"
    >
      {/* 1. The Hero Asset (Background) */}
      <motion.div
        style={{ y: videoY }}
        className="absolute inset-0 z-0 w-full h-full"
      >
        <div className="absolute inset-0 bg-black/50 z-10" />{" "}
        {/* Overlay for readability */}
        {/* Replace the 'src' with your high-res video or image URL */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="hreo-creative.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* 2. The Floating Fonts (Foreground) */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-20 text-center px-6"
      >
        <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white leading-none">
          CRAFTING <br />
          <span className="text-transparent bg-clip-text bg-electric-gradient">
            DIGITAL DEPTH
          </span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-medium">
          A highly interactive 3D portfolio experience built with Next.js and
          Framer Motion.
        </p>
      </motion.div>

      {/* 3. The "Scroll Down" Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 text-white/50 text-sm font-bold tracking-widest uppercase"
      >
        Scroll to Explore
      </motion.div>
    </section>
  );
};

export default HeroSection;
