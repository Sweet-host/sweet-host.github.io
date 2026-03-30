"use client";

import { motion } from "framer-motion";
import Magnetic from "../ui/Magnetic";
import { Reveal } from "../ui/Reveal";
import ParticleBackground from "../ui/ParticleBackground"; // 1. Import the 3D Component

const ContactSection = () => {
  return (
    <section className="relative py-32 px-6 flex flex-col items-center justify-center bg-black overflow-hidden min-h-screen">
      {/* 2. The 3D Particle Field Background */}
      <ParticleBackground />

      {/* 3. The Content (Notice the relative z-10 to stay above the 3D canvas) */}
      <div className="relative z-10 flex flex-col items-center w-full">
        <Reveal>
          {/* Shrunk to 5xl on mobile, scales back to 9xl on large screens */}
          <h2 className="text-5xl md:text-7xl lg:text-9xl font-black text-white text-center tracking-tighter leading-none mb-8 md:mb-12">
            LET{"'"}S BUILD <br />
            <span className="text-transparent bg-clip-text bg-electric-gradient">
              SOMETHING BOLD.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.4}>
          {/* Increased gap from 6 to 12 on mobile, and added a top margin (mt-6) */}
          <div className="flex flex-col items-center gap-12 md:gap-12 mt-6 md:mt-0">
            <p className="text-gray-400 text-base md:text-xl font-medium text-center max-w-lg px-4">
              Currently accepting new freelance projects and collaborations for
              2026.
            </p>

            <Magnetic>
              <motion.a
                href="mailto:your-email@example.com"
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0px 0px 40px rgba(0, 242, 255, 0.4)",
                }}
                whileTap={{ scale: 0.9 }}
                className="px-6 py-3 md:px-10 md:py-5 bg-white text-black font-black uppercase tracking-widest rounded-full text-sm md:text-lg shadow-2xl transition-all cursor-none"
              >
                Get in Touch
              </motion.a>
            </Magnetic>
          </div>
        </Reveal>

        {/* Footer Note - Reduced the top margin (mt-16 on mobile, mt-32 on desktop) */}
        <div className="mt-16 md:mt-32 border-t border-white/5 pt-8 w-full max-w-5xl flex flex-col md:flex-row justify-between items-center text-gray-600 text-[10px] md:text-xs font-bold tracking-widest uppercase gap-4 md:gap-0 text-center md:text-left">
          <p>© 2026 SWEETHOST</p>
          <p>CHENNAI / INDIA</p>
          <p>BUILT WITH NEXT.JS & MOTION</p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
