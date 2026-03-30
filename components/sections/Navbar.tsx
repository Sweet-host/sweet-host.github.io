"use client"; // Required for Framer Motion animations

import { motion } from "framer-motion";
import Link from "next/link";
import Magnetic from "../ui/Magnetic";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-white/5 backdrop-blur-lg border border-white/10 px-6 py-3 rounded-2xl shadow-2xl">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-black tracking-tighter text-white hover:text-blue-400 transition-colors"
        >
          SWEET<span className="text-blue-500">HOST</span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <Link href="#work" className="hover:text-white transition-colors">
            Work
          </Link>
          <Link href="#about" className="hover:text-white transition-colors">
            About
          </Link>
          <Link href="#contact" className="hover:text-white transition-colors">
            Contact
          </Link>
        </div>

        {/* Bold CTA Button */}
        <Magnetic>
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 20px rgba(59, 130, 246, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-5 py-2 rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20"
          >
            {"Let's Talk"}
          </motion.button>
        </Magnetic>
      </div>
    </motion.nav>
  );
};

export default Navbar;
