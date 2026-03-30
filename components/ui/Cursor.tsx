"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function Cursor() {
  const [isHovered, setIsHovered] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 300 }; // Slightly snappier
  const edgeX = useSpring(cursorX, springConfig);
  const edgeY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest(".cursor-pointer")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleHover);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleHover);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* 1. Outer Ring - Changed to 'difference' blend and crisp border */}
      <motion.div
        style={{
          left: edgeX,
          top: edgeY,
          translateX: "-50%",
          translateY: "-50%",
          mixBlendMode: "difference", // PREVENTS BLIND SPOTS
        }}
        animate={{
          width: isHovered ? 90 : 35,
          height: isHovered ? 90 : 35,
          border: isHovered ? "1px solid #00f2ff" : "1.5px solid #ffffff",
        }}
        className="fixed pointer-events-none z-9999 rounded-full hidden md:block"
      />

      {/* 2. Center Dot - Increased size for better targeting */}
      <motion.div
        style={{
          left: cursorX,
          top: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="fixed w-2 h-2 bg-electric-blue rounded-full pointer-events-none z-9999 hidden md:block"
      />
    </>
  );
}
