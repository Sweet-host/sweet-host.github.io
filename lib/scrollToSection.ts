/** In-page scroll used by the navbar (Next.js <Link hash> + scroll={false} skips scrollIntoView). */
export function scrollToSection(
  id: string,
  options?: { onDone?: () => void },
): void {
  const el = document.getElementById(id);
  if (!el) {
    options?.onDone?.();
    return;
  }

  const instant = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: instant ? "auto" : "smooth", block: "start" });
  window.history.replaceState(null, "", `#${id}`);
  options?.onDone?.();
}
