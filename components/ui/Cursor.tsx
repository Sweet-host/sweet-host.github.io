"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const RING_LERP = 0.16;

function subscribePointerFine(onChange: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(pointer: fine)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getPointerFine(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;
}

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const hasMoved = useRef(false);

  const [isOverLink, setIsOverLink] = useState(false);
  const [mouseInWindow, setMouseInWindow] = useState(true);
  const [movedOnce, setMovedOnce] = useState(false);
  const useCustom = useSyncExternalStore(subscribePointerFine, getPointerFine, () => false);

  /** Dot + ring always while pointer is inside the viewport (after first move). Link hover only changes ring size/color. */
  const showChrome = mouseInWindow && movedOnce;

  useEffect(() => {
    if (!useCustom) return;

    const syncLinkState = (clientX: number, clientY: number) => {
      const under = document.elementFromPoint(clientX, clientY);
      const link = under?.closest("a[href]");
      setIsOverLink(Boolean(link));
    };

    const onMove = (e: MouseEvent) => {
      dotPos.current.x = e.clientX;
      dotPos.current.y = e.clientY;
      if (!hasMoved.current) {
        hasMoved.current = true;
        ringPos.current = { x: e.clientX, y: e.clientY };
        setMovedOnce(true);
      }
      syncLinkState(e.clientX, e.clientY);
    };

    const onLeave = () => {
      setMouseInWindow(false);
    };
    const onEnter = () => setMouseInWindow(true);

    const tick = () => {
      const { x: dx, y: dy } = dotPos.current;
      ringPos.current.x += (dx - ringPos.current.x) * RING_LERP;
      ringPos.current.y += (dy - ringPos.current.y) * RING_LERP;

      const dot = dotRef.current;
      const ring = ringRef.current;
      if (dot) {
        dot.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%)`;
      }
      if (ring) {
        const { x: rx, y: ry } = ringPos.current;
        ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(rafRef.current);
    };
  }, [useCustom]);

  if (!useCustom) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className={`pointer-events-none fixed top-0 left-0 z-9999 will-change-transform rounded-full border-[3px] shadow-[0_0_18px_rgba(59,130,246,0.35)] transition-[opacity,width,height,border-color,box-shadow] duration-200 ease-out ${
          isOverLink
            ? "h-[5.25rem] w-[5.25rem] border-cyber-pink/90 shadow-[0_0_34px_rgba(255,0,193,0.5)] md:h-[6.5rem] md:w-[6.5rem]"
            : "h-11 w-11 border-[#60a5fa]/65 md:h-[3.35rem] md:w-[3.35rem]"
        } ${showChrome ? "opacity-100" : "opacity-0"}`}
      />
      <div
        ref={dotRef}
        aria-hidden
        className={`pointer-events-none fixed top-0 left-0 z-10000 h-2.5 w-2.5 rounded-full bg-[#3b82f6] shadow-[0_0_12px_rgba(59,130,246,0.95)] will-change-transform ${
          showChrome ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
}
