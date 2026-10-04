"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function Faq({ items }: { items: [string, string][] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="glass divide-y divide-soft2 rounded-2xl">
      {items.map(([q, a], i) => (
        <div key={q}>
          <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-4 p-5 text-left font-medium">
            {q}<motion.span animate={{ rotate: open === i ? 45 : 0 }} className="text-xl text-mute">+</motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                <p className="px-5 pb-5 text-sm text-mute">{a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
