"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image"; // Import the specialized component
import React from "react";

interface Props {
  title: string;
  description: string;
  tag: string;
  image: string;
}

const ProjectCard = ({ title, description, tag, image }: Props) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const opacity = useMotionValue(0);
  const shineX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const shineY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    x.set((e.clientX - rect.left) / width - 0.5);
    y.set((e.clientY - rect.top) / height - 0.5);
    opacity.set(1);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    opacity.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
      className="relative h-[450px] w-80 rounded-4xl bg-white/5 backdrop-blur-2xl border border-white/10 cursor-pointer overflow-hidden group"
    >
      {/* 1. THE IMAGE (Using Next.js Image Component) */}
      <motion.div
        style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}
        className="absolute inset-4 rounded-2xl overflow-hidden z-0"
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw" // Add this line
          className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
          priority={true}
        />
        <div className="absolute inset-0 bg-black/40 z-10" />
      </motion.div>

      {/* 2. THE SHINE */}
      <motion.div
        style={{
          background: `radial-gradient(circle at ${shineX} ${shineY}, rgba(255,255,255,0.4) 0%, transparent 60%)`,
          opacity,
        }}
        className="absolute inset-0 z-10 pointer-events-none"
      />

      {/* 3. THE TEXT */}
      <div
        style={{ transform: "translateZ(90px)", transformStyle: "preserve-3d" }}
        className="relative z-20 flex flex-col h-full justify-between p-8 pointer-events-none"
      >
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400 drop-shadow-md">
            {tag}
          </span>
          <h3 className="mt-2 text-3xl font-black text-white leading-tight drop-shadow-xl">
            {title}
          </h3>
        </div>
        <p className="text-gray-200 text-sm font-medium leading-relaxed drop-shadow-md">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
