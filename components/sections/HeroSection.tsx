"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { HERO_POSTER_SRC, HERO_VIDEO_SRC } from "@/lib/hero-assets";

const HeroSection = () => {
  const containerRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    // Hint to Chromium: prioritize this decode on the critical hero (not in React DOM types yet).
    v.setAttribute("fetchpriority", "high");

    const tryPlay = () => {
      void v.play().catch(() => {});
    };
    // Start playback as soon as enough data exists; `loadeddata` often fires before `canplay`.
    v.addEventListener("loadeddata", tryPlay, { once: true });
    v.addEventListener("canplay", tryPlay, { once: true });
    tryPlay();
    return () => {
      v.removeEventListener("loadeddata", tryPlay);
      v.removeEventListener("canplay", tryPlay);
    };
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-[120vh] w-full flex items-center justify-center overflow-hidden bg-black"
    >
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 z-0 w-full h-full scale-105"
      >
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover pointer-events-none"
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          disableRemotePlayback
        >
          <source src={HERO_VIDEO_SRC} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/45 to-black pointer-events-none z-10" />
      </motion.div>

      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-20 text-center px-6 pointer-events-none"
      >
        <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white leading-none drop-shadow-[0_2px_24px_rgba(0,0,0,0.75)]">
          CRAFTING <br />
          <span className="text-transparent bg-clip-text bg-electric-gradient">
            DIGITAL DEPTH
          </span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-medium drop-shadow-md">
          A cinematic portfolio built with Next.js and motion — fast loads,
          smooth scroll, and work that stays sharp at any size.
        </p>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 text-white/50 text-sm font-bold tracking-widest uppercase pointer-events-none"
      >
        Scroll to Explore
      </motion.div>
    </section>
  );
};

export default HeroSection;
