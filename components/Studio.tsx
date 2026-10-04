"use client";
import { motion } from "motion/react";

const dest = [["YouTube", "6.2 Mbps", "bg-live"], ["Custom RTMP", "4.0 Mbps", "bg-live"], ["Recording", "Saved", "bg-brand"]];

export default function Studio() {
  return (
    <div className="relative mx-auto mt-20 max-w-5xl text-left">
      <div className="glass float absolute -left-3 top-24 z-10 hidden items-center gap-2 rounded-xl bg-ink/80 px-3 py-2 text-xs shadow-xl md:flex"><span className="size-2 rounded-full bg-emerald-400" />1080p60 · HEVC · 4% CPU</div>
      <div className="glass float absolute -right-3 bottom-20 z-10 hidden rounded-xl bg-ink/80 px-3 py-2 text-xs shadow-xl [animation-delay:-3s] md:block"><b>@maya</b> <span className="text-mute">just joined the chat</span></div>
      <div className="glass overflow-hidden rounded-3xl shadow-[0_40px_120px_-30px_rgba(246,196,69,.4)]">
        <div className="flex items-center gap-2 border-b border-soft2 px-4 py-3">
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => <span key={c} className="size-3 rounded-full" style={{ background: c }} />)}
          <span className="ml-3 text-xs text-mute">Be right back</span>
          <span className="ml-auto flex items-center gap-2 rounded-full bg-live/15 px-2.5 py-1 text-xs font-medium text-live"><span className="size-1.5 animate-pulse rounded-full bg-live" />LIVE 00:24:18</span>
        </div>
        <div className="grid gap-4 p-4 md:grid-cols-[1fr_auto_230px]">
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
            className="relative grid aspect-video place-items-center overflow-hidden rounded-2xl bg-linear-to-br from-brand/40 via-zinc-900 to-zinc-950 text-2xl font-semibold text-white md:text-3xl">
            Be right back<span className="absolute bottom-3 left-3 rounded-md bg-black/50 px-2 py-0.5 text-[11px] font-normal text-white/70">16:9 · 1920×1080</span>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -60, width: 0 }} animate={{ opacity: 1, x: 0, width: 144 }} transition={{ delay: 0.9, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden aspect-9/16 max-h-64 place-items-center self-center overflow-hidden rounded-2xl bg-linear-to-b from-brand/40 to-zinc-950 text-sm text-white md:grid">
            Vertical<span className="absolute bottom-3 left-3 rounded-md bg-black/50 px-2 py-0.5 text-[11px] text-white/70">9:16</span>
          </motion.div>
          <div className="space-y-2 text-sm">
            {dest.map(([n, s, c], i) => (
              <motion.div key={n} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.12 }}
                className="flex items-center justify-between rounded-xl bg-soft px-3 py-3"><span className="flex items-center gap-2"><span className={`size-2 rounded-full ${c}`} />{n}</span><span className="text-xs text-mute">{s}</span></motion.div>
            ))}
            <div className="flex h-14 items-end gap-1 rounded-xl bg-soft p-3" aria-hidden>
              {[60, 90, 40, 75, 100, 55, 80, 45].map((h, i) => <span key={i} className="bar w-full rounded-sm bg-emerald-400/80" style={{ height: `${h}%`, animationDelay: `${i * 0.13}s` }} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
