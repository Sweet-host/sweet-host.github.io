"use client";

import { useEffect } from "react";

/**
 * Prevents the browser from restoring a deep scroll position on reload
 * (e.g. jumping straight to #work). Hash-only URLs still scroll to their section.
 */
export default function ScrollRestoration() {
  useEffect(() => {
    window.history.scrollRestoration = "manual";

    const hash = window.location.hash.slice(1);

    requestAnimationFrame(() => {
      if (hash) {
        const el = document.getElementById(hash);
        el?.scrollIntoView({ behavior: "auto", block: "start" });
        return;
      }

      if (window.location.pathname === "/") {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }
    });
  }, []);

  return null;
}
