"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Bot, Building2, Layers3 } from "lucide-react";
import { useState } from "react";

const trustPartners = [
  "Vertex",
  "Northstar",
  "Lumina",
  "Aster",
  "Nexora",
  "Kinetiq",
];

const services = [
  {
    title: "Web Architecture",
    description:
      "Scalable frontend and backend systems designed for speed, resilience, and premium digital performance.",
    icon: Layers3,
  },
  {
    title: "AI-Powered UI/UX",
    description:
      "Adaptive user journeys and intelligent interfaces that anticipate behavior and improve conversion flow.",
    icon: Bot,
  },
  {
    title: "Custom Business Ecosystems",
    description:
      "Connected platforms that unify operations, marketing, and customer intelligence into one strategic engine.",
    icon: Building2,
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.2,
      },
    },
  };

  const revealItem = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-white">
      <header className="mx-auto w-full max-w-7xl px-6 pt-6 lg:px-20">
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/2 px-5 py-4">
          <span className="text-sm font-bold tracking-[0.18em] text-white uppercase">
            Regensia Lab
          </span>
          <nav className="hidden items-center gap-8 text-sm text-white/75 md:flex">
            <a href="#services" className="transition hover:text-white">
              Services
            </a>
            <a href="#contact" className="transition hover:text-white">
              Contact
            </a>
          </nav>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="inline-flex items-center justify-center rounded-md border border-white/20 px-3 py-2 text-xs font-semibold tracking-[0.14em] text-white uppercase md:hidden"
            aria-label="Open menu"
          >
            Menu
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/55 md:hidden"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="fixed top-0 right-0 z-50 h-full w-72 border-l border-white/15 bg-[#0b1020] p-6 md:hidden"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs tracking-[0.2em] text-white/60 uppercase">
                  Navigation
                </span>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-md border border-white/20 px-2 py-1 text-xs text-white/80"
                >
                  Close
                </button>
              </div>
              <div className="mt-10 flex flex-col gap-6 text-lg">
                <a href="#services" onClick={() => setMenuOpen(false)}>
                  Services
                </a>
                <a href="#contact" onClick={() => setMenuOpen(false)}>
                  Contact
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <main className="mx-auto flex w-full max-w-7xl flex-col px-6 pb-20 pt-8 lg:px-20 lg:pt-12">
        <section className="relative overflow-visible rounded-3xl border border-white/10 bg-linear-to-b from-white/5 to-transparent p-6 sm:p-10 lg:p-14">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="z-10 lg:-mr-14"
            >
              <motion.span
                variants={revealItem}
                className="mb-4 inline-flex rounded-full border border-[#3b82f6]/40 bg-[#3b82f6]/10 px-4 py-1 text-xs tracking-[0.2em] text-[#8ec5ff] uppercase"
              >
                Premium Brand Studio
              </motion.span>
              <motion.h1
                variants={revealItem}
                className="max-w-xl text-4xl font-black leading-[0.95] tracking-tight text-white md:text-7xl"
              >
                Strategies
                <br />
                For Branding
              </motion.h1>
              <motion.p
                variants={revealItem}
                className="mt-6 max-w-md text-base leading-7 text-[#b7c0d4] sm:text-lg"
              >
                We craft premium visual systems and campaign architecture for
                ambitious companies ready to own attention.
              </motion.p>
              <motion.div variants={revealItem} className="mt-8 flex flex-wrap gap-4">
                <button className="rounded-full bg-[#3b82f6] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2563eb]">
                  Start a Project
                </button>
                <button className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/90 transition hover:border-white/40 hover:bg-white/5">
                  View Work
                </button>
              </motion.div>
            </motion.div>

            <div className="relative lg:-ml-6">
              <div className="absolute -inset-4 rounded-3xl bg-[#3b82f6]/20 blur-3xl" />
              <Image
                src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1400&q=80"
                alt="Creative team planning brand strategy"
                width={1400}
                height={900}
                priority
                className="relative h-[330px] w-full rounded-3xl object-cover sm:h-[420px] lg:h-[520px]"
              />
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-white/10 bg-[#090d18] px-6 py-7 sm:px-10">
          <p className="mb-5 text-xs tracking-[0.2em] text-white/45 uppercase">
            Trusted by category leaders
          </p>
          <div className="flex flex-wrap gap-3 md:grid md:grid-cols-3 md:gap-4 lg:grid-cols-6">
            {trustPartners.map((partner) => (
              <div
                key={partner}
                className="flex min-w-[140px] flex-1 items-center justify-center gap-2 rounded-xl border border-white/8 bg-white/2 px-3 py-4 text-[#8f98aa] grayscale"
              >
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#8f98aa]" />
                <span className="text-sm font-semibold tracking-wide">{partner}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="services" className="mt-12">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.16,
                  delayChildren: 0.08,
                },
              },
            }}
          >
            <div className="mb-6">
              <p className="text-xs tracking-[0.2em] text-[#8ec5ff] uppercase">Services</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Growth Systems Built for Ambitious Brands
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {services.map((service) => {
                const Icon = service.icon;

                return (
                  <motion.article
                    key={service.title}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      show: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.6, ease: "easeOut" },
                      },
                    }}
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                    className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition duration-300 hover:-translate-y-2 hover:border-blue-500"
                  >
                    <motion.div
                      variants={{
                        rest: { scale: 1, rotate: 0 },
                        hover: {
                          scale: 1.06,
                          rotate: -3,
                          transition: { duration: 0.28, ease: "easeOut" },
                        },
                      }}
                      className="inline-flex"
                    >
                      <Icon className="h-8 w-8 text-blue-500" aria-hidden="true" />
                    </motion.div>
                    <h3 className="mt-5 text-2xl font-bold text-white">{service.title}</h3>
                    <p className="mt-3 leading-7 text-slate-400">{service.description}</p>
                  </motion.article>
                );
              })}
            </div>
          </motion.div>
        </section>

        <section id="contact" className="mt-14 rounded-3xl border border-white/10 bg-[#090d18] p-6 lg:p-12">
          <div className="grid gap-10 md:grid-cols-2 md:items-start">
            <div>
              <p className="text-xs tracking-[0.2em] text-[#8ec5ff] uppercase">Contact</p>
              <h2 className="mt-4 text-4xl font-black leading-tight text-white md:text-6xl">
                Let&apos;s Build the Future
              </h2>
              <a
                href="mailto:hello@regensialab.com"
                className="mt-6 inline-block text-lg text-slate-300 transition hover:text-white"
              >
                hello@regensialab.com
              </a>
            </div>

            <form className="space-y-7">
              <label className="block">
                <span className="text-sm text-slate-400">Name</span>
                <input
                  type="text"
                  className="mt-2 w-full border-0 border-b border-slate-700 bg-transparent px-0 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500"
                  placeholder="Your name"
                />
              </label>
              <label className="block">
                <span className="text-sm text-slate-400">Email</span>
                <input
                  type="email"
                  className="mt-2 w-full border-0 border-b border-slate-700 bg-transparent px-0 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500"
                  placeholder="your@email.com"
                />
              </label>
              <label className="block">
                <span className="text-sm text-slate-400">Project Details</span>
                <textarea
                  rows={4}
                  className="mt-2 w-full resize-none border-0 border-b border-slate-700 bg-transparent px-0 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500"
                  placeholder="Tell us about your project goals."
                />
              </label>
              <button
                type="submit"
                className="rounded-full bg-blue-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
              >
                Send Inquiry
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
