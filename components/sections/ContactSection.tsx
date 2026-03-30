"use client";

import { motion } from "framer-motion";
import Magnetic from "../ui/Magnetic";
import { Reveal } from "../ui/Reveal";

const ContactSection = () => {
  return (
    <section className="relative py-32 px-6 flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <Reveal>
        <h2 className="text-7xl md:text-9xl font-black text-white text-center tracking-tighter leading-none mb-12">
          LET{"'"}S BUILD <br />
          <span className="text-transparent bg-clip-text bg-electric-gradient">
            SOMETHING BOLD.
          </span>
        </h2>
      </Reveal>

      <Reveal delay={0.4}>
        <div className="flex flex-col items-center gap-8">
          <p className="text-gray-400 text-xl font-medium text-center max-w-lg">
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
              className="px-10 py-5 bg-white text-black font-black uppercase tracking-widest rounded-full text-lg shadow-2xl transition-all"
            >
              Get in Touch
            </motion.a>
          </Magnetic>
        </div>
      </Reveal>

      {/* Footer Note */}
      <div className="mt-32 border-t border-white/5 pt-8 w-full max-w-5xl flex flex-col md:flex-row justify-between items-center text-gray-600 text-xs font-bold tracking-widest uppercase">
        <p>© 2026 SWEETHOST</p>
        <p>CHENNAI / INDIA</p>
        <p>BUILT WITH NEXT.JS & MOTION</p>
      </div>
    </section>
  );
};

export default ContactSection;
