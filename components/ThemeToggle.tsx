"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

const icon = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, className: "size-[18px]", viewBox: "0 0 24 24", "aria-hidden": true };

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  useEffect(() => setTheme((document.documentElement.dataset.theme as "dark" | "light") || "dark"), []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("vidyst-theme", next); } catch {}
  };

  return (
    <button onClick={toggle} aria-label="Switch color theme" aria-pressed={theme === "light"}
      className="grid size-9 place-items-center rounded-full text-mute transition hover:bg-soft2 hover:text-fg">
      <motion.span key={theme} initial={{ rotate: -90, scale: 0.5, opacity: 0 }} animate={{ rotate: 0, scale: 1, opacity: 1 }} transition={{ duration: 0.35 }}>
        {theme === "dark" ? (
          <svg {...icon}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
        ) : (
          <svg {...icon}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
        )}
      </motion.span>
    </button>
  );
}
