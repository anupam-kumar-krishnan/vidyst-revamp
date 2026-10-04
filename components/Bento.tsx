"use client";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";

/* ---------- helpers ---------- */
function useJitter(base: number, ms = 1200, spread = 0.8) {
  const [v, setV] = useState(base);
  useEffect(() => { const i = setInterval(() => setV(base + (Math.random() - 0.5) * spread), ms); return () => clearInterval(i); }, [base, ms, spread]);
  return v;
}

function Card({ title, text, className = "", children }: { title: string; text: string; className?: string; children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onPointerMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`); e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`); }}
      className={`spot glass flex flex-col rounded-2xl p-6 ${className}`}>
      <h3 className="font-medium">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-mute">{text}</p>
      {children}
    </motion.div>
  );
}

const Orbs = () => (<>
  <i className="orb size-20" style={{ left: 12, top: 10, background: "rgba(246,196,69,.75)" }} />
  <i className="orb size-24" style={{ right: -6, bottom: -10, background: "rgba(234,88,12,.6)", animationDelay: "-3s" }} />
</>);

function Scene({ label, lt, avatar, className }: { label: string; lt: string; avatar: string; className: string }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-zinc-900 text-white ring-1 ring-white/15 ${className}`}>
      <Orbs />
      <div className={`absolute left-1/2 top-[44%] ${avatar} -translate-x-1/2 -translate-y-1/2 rounded-full`} style={{ background: "linear-gradient(135deg,rgba(255,255,255,.9),rgba(255,255,255,.2))", boxShadow: "0 0 30px rgba(255,255,255,.3)" }} />
      <span className="absolute left-2.5 top-2.5 flex items-center gap-1.5 rounded-full bg-black/45 px-2 py-0.5 text-[10px]"><i className="size-1.5 animate-pulse rounded-full bg-live" />{label}</span>
      <span className="lt absolute bottom-2.5 left-2.5 rounded-lg bg-white/90 px-2 py-1 text-[10px] font-semibold text-black">{lt}</span>
    </div>
  );
}

const DELAYS = ["0s", "-6s", "-3s"];

/* ---------- 1. Dual canvas ---------- */
function Dual() {
  const scenes: [string, string][] = [["Intro", "#f6c445"], ["Interview", "#fb7185"], ["Screen share", "#60a5fa"]];
  return (
    <div className="mt-6 grid items-stretch gap-4 md:grid-cols-[1fr_120px_190px]">
      <Scene label="16:9 · 1920×1080" lt="Maya · Host" avatar="size-16" className="glowp aspect-video" />
      <div className="relative hidden rounded-2xl border border-dashed border-mute/40 md:block">
        <Scene label="9:16" lt="Maya" avatar="size-11" className="slidep2 absolute inset-0" />
      </div>
      <div className="flex flex-col gap-1.5 rounded-2xl bg-soft p-3 text-xs">
        <div className="mb-0.5 text-[10px] uppercase tracking-wider text-mute">Scenes</div>
        {scenes.map(([n, c], i) => (
          <div key={n} className="pa flex items-center gap-2 rounded-lg px-2 py-1.5" style={{ animationDelay: DELAYS[i] }}>
            <i className="h-5 w-8 rounded" style={{ background: `${c}aa` }} />{n}
          </div>
        ))}
        <div className="mt-auto space-y-1.5 border-t border-soft2 pt-2.5">
          <div className="flex justify-between"><span>16:9</span><span className="text-mute">60 fps</span></div>
          <div className="flex justify-between"><span>9:16</span><span className="text-mute">60 fps</span></div>
          <div className="flex h-7 items-end gap-1" aria-hidden>
            {Array.from({ length: 14 }, (_, i) => <i key={i} className="bar w-full rounded-sm bg-emerald-400/80" style={{ height: `${30 + ((i * 37) % 70)}%`, animationDelay: `${i * 0.09}s` }} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- 2. Metal compositor ---------- */
function Stage({ name, ms, w, i }: { name: string; ms: number; w: number; i: number }) {
  const v = useJitter(ms, 1100, ms * 0.2);
  return (
    <div>
      <div className="mb-1.5 flex justify-between"><span>{name}</span><span className="text-mute"><b className="text-fg">{v.toFixed(1)}</b> ms</span></div>
      <div className="h-1.5 overflow-hidden rounded-full bg-soft2"><i className="load block h-full rounded-full bg-linear-to-r from-brand to-orange-400" style={{ width: `${w * 100}%`, animationDelay: `${i * 0.4}s` }} /></div>
    </div>
  );
}

function Gpu() {
  const z = (v: number, d = 0) => ({ "--z": `${v}px`, animationDelay: `${d}s` }) as CSSProperties;
  return (
    <div className="mt-6 flex flex-1 flex-col gap-4">
      <div className="flex h-32 items-center justify-between gap-4">
        <div className="relative h-full flex-1" style={{ perspective: 500 }}>
          <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
            <i className="lay border border-white/20 bg-linear-to-br from-brand/70 to-orange-700/40" style={z(0)} />
            <i className="lay border border-white/30 bg-linear-to-br from-brand/60 to-transparent backdrop-blur" style={z(22, -0.15)} />
            <i className="lay border border-mute/50 bg-soft2" style={z(44, -0.3)} />
          </div>
        </div>
        <div className="relative grid shrink-0 place-items-center">
          <svg viewBox="0 0 64 64" className="size-24 -rotate-90" aria-hidden>
            <circle cx="32" cy="32" r="24" fill="none" stroke="currentColor" strokeOpacity=".12" strokeWidth="6" />
            <circle className="ringp" cx="32" cy="32" r="24" fill="none" stroke="#f6c445" strokeWidth="6" strokeLinecap="round" strokeDasharray="151" strokeDashoffset="140" />
          </svg>
          <div className="absolute text-center"><b className="text-lg">4%</b><div className="text-[9px] text-mute">CPU</div></div>
        </div>
      </div>
      <div className="mt-auto space-y-3 rounded-xl bg-soft p-3.5 text-xs">
        {([["Capture", 0.4, 0.4], ["Composite", 1.1, 0.75], ["Encode", 0.9, 0.6]] as const).map(([n, ms, w], i) => <Stage key={n} name={n} ms={ms} w={w} i={i} />)}
        <div className="flex items-center justify-between border-t border-soft2 pt-2.5 text-mute"><span>Frame budget 16.6 ms</span><span className="text-emerald-400">● On time</span></div>
      </div>
    </div>
  );
}

/* ---------- 3. Crash-safe ---------- */
function Safe() {
  return (
    <div className="relative mt-6 h-28">
      <div className="relative" style={{ animation: "shk 9s infinite" }}>
        <div className="flex gap-1.5">{Array.from({ length: 12 }, (_, i) => <span key={i} className={`seg ${i < 9 ? "f" : ""}`} style={{ animationDelay: `${i * 0.3}s` }} />)}</div>
        <i className="absolute -inset-1.5 rounded-xl bg-live/25 opacity-0" style={{ animation: "fl2 9s infinite" }} />
      </div>
      <span className="lb text-mute" style={{ animation: "l1 9s infinite", opacity: 1 }}>Recording…</span>
      <span className="lb font-medium text-live" style={{ animation: "l2 9s infinite" }}>⚠ App crashed</span>
      <span className="lb font-medium text-emerald-400" style={{ animation: "l3 9s infinite" }}>🛡 9 segments recovered</span>
    </div>
  );
}

/* ---------- 4. Gapless split ---------- */
function Split() {
  const mask = "linear-gradient(90deg,transparent,#000 18%,#000 82%,transparent)";
  return (
    <div className="mt-6">
      <div className="relative overflow-hidden rounded-xl" style={{ WebkitMaskImage: mask, maskImage: mask }}>
        <div className="film">
          {[0, 1].flatMap((k) => Array.from({ length: 14 }, (_, i) => (
            <span key={`${k}-${i}`} className="frame" style={{ background: `linear-gradient(135deg,hsl(${28 + ((i * 11) % 24)} 85% ${38 + ((i * 17) % 22)}%),#1a1a1f)` }} />
          )))}
        </div>
        <i className="absolute inset-y-0 left-1/2 w-0.5 bg-brand" style={{ boxShadow: "0 0 14px #f6c445" }} />
      </div>
      <div className="relative mt-4 h-[2.6rem]">
        {[1, 2, 3].map((i) => <div key={i} className="chip" style={{ left: `calc(${(i - 1) * 33.33}% + ${(i - 1) * 2}px)`, animation: `s${i} 7s linear infinite` }}>part-0{i}.mp4</div>)}
      </div>
      <p className="mt-3 text-[11px] text-mute">0 frames dropped at every split</p>
    </div>
  );
}

/* ---------- 5. Multistream ---------- */
const DEST: [string, number, string, number][] = [["YouTube", 20, "6.2", 6.2], ["Custom RTMP", 65, "4.0", 4.0], ["Recording", 110, "Saved", 0]];

function Rate({ y, b, label }: { y: number; b: number; label: string }) {
  const v = useJitter(b || 1, 1200, 0.8);
  return <text x="244" y={y + 9} fill="currentColor" fillOpacity=".55" fontSize="7.5">{b ? `${v.toFixed(1)} Mbps` : label}</text>;
}

function Multi() {
  return (
    <div className="mt-6 h-34">
      <svg viewBox="0 0 320 130" className="h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="fg" x1="0" x2="1"><stop offset="0" stopColor="#f6c445" /><stop offset="1" stopColor="#f6c445" stopOpacity=".15" /></linearGradient>
          <filter id="gl"><feGaussianBlur stdDeviation="2.5" /></filter>
        </defs>
        {DEST.map(([, y], i) => {
          const p = `M52 65 C130 65 150 ${y} 222 ${y}`;
          const m = <animateMotion dur="2.4s" begin={`${i * 0.6}s`} repeatCount="indefinite" path={p} />;
          return (
            <g key={y}>
              <path d={p} stroke="url(#fg)" strokeWidth="1.5" fill="none" opacity=".45" />
              <path className="flow" d={p} stroke="#f6c445" strokeWidth="1.5" fill="none" />
              <circle r="6" fill="#f6c445" opacity=".6" filter="url(#gl)">{m}</circle>
              <circle r="2.5" fill="#fff">{m}</circle>
            </g>
          );
        })}
        <circle cx="34" cy="65" r="20" fill="#f6c445" fillOpacity=".14"><animate attributeName="r" values="18;25;18" dur="2.4s" repeatCount="indefinite" /></circle>
        <circle cx="34" cy="65" r="15" fill="#f6c445" />
        <path d="M30 59l10 6-10 6z" fill="#000" />
        {DEST.map(([n, y, label, b]) => (
          <g key={n}>
            <rect x="222" y={y - 15} width="94" height="30" rx="9" fill="currentColor" fillOpacity=".08" stroke="currentColor" strokeOpacity=".12" />
            <circle cx="234" cy={y} r="3" fill={b ? "#ff4d5e" : "#f6c445"}><animate attributeName="opacity" values="1;.3;1" dur="1.6s" repeatCount="indefinite" /></circle>
            <text x="244" y={y - 1.5} fill="currentColor" fontSize="9" fontWeight="600">{n}</text>
            <Rate y={y} b={b} label={label} />
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ---------- 6. Merged live chat ---------- */
const MSG = [
  ["M", "maya", "Love this layout!", "YouTube", "#f6c445"], ["A", "arjun", "Audio is crisp 🔥", "RTMP", "#34d399"],
  ["S", "sana", "Is the vertical live too?", "YouTube", "#fb7185"], ["R", "raj", "Yes, both at once", "RTMP", "#60a5fa"],
  ["T", "tia", "Mac only? Nice.", "YouTube", "#c084fc"],
] as const;

function Chat() {
  const [feed, setFeed] = useState([0, 1]);
  const [pin, setPin] = useState(0);
  const [viewers, setViewers] = useState(1240);
  const [cpm, setCpm] = useState(86);

  useEffect(() => {
    let n = 2;
    const a = setInterval(() => { const id = n++; setFeed((f) => [...f.slice(-3), id]); }, 1700);
    const b = setInterval(() => setPin((p) => (p + 1) % MSG.length), 3400);
    const c = setInterval(() => { setViewers((v) => v + Math.round(Math.random() * 18 - 5)); setCpm((v) => v + Math.round(Math.random() * 8 - 3)); }, 1500);
    return () => { clearInterval(a); clearInterval(b); clearInterval(c); };
  }, []);

  const mask = "linear-gradient(180deg,transparent,#000 35%)";
  const spark = "M0 40L20 34 40 38 60 24 80 28 100 16 120 22 140 10 160 16 180 6 200 9";

  return (
    <div className="mt-6 grid gap-4 md:grid-cols-[1.25fr_1fr_1fr]">
      <div className="rounded-2xl bg-soft p-4">
        <div className="flex gap-1.5">{["All", "YouTube", "RTMP"].map((n, i) => <span key={n} className="pa rounded-full px-3 py-1 text-[11px]" style={{ animationDelay: DELAYS[i] }}>{n}</span>)}</div>
        <div className="mt-3 flex h-52 flex-col justify-end gap-2.5 overflow-hidden text-xs" style={{ WebkitMaskImage: mask, maskImage: mask }}>
          <AnimatePresence initial={false}>
            {feed.map((id) => {
              const [a, n, m, p, c] = MSG[id % MSG.length];
              return (
                <motion.div key={id} layout initial={{ opacity: 0, x: -16, scale: 0.94 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="flex items-start gap-2">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full text-[11px] font-bold text-black" style={{ background: c }}>{a}</span>
                  <div className="rounded-2xl rounded-tl-sm bg-soft2 px-3 py-1.5"><div className="flex items-center gap-1.5"><b>{n}</b><span className="text-[9px] uppercase tracking-wide text-mute">{p}</span></div><div>{m}</div></div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex flex-col rounded-2xl bg-soft p-4">
        <div className="flex items-center justify-between text-xs text-mute"><span>Pinned to stream</span><span className="pin">📌</span></div>
        <div className="relative mt-3 min-h-36 flex-1 overflow-hidden rounded-xl bg-zinc-900 text-white ring-1 ring-white/10">
          <Orbs />
          <motion.div key={pin} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-x-3 bottom-3 rounded-xl bg-white/90 px-3 py-2 text-[11px] text-black">
            <b>@{MSG[pin][1]}</b><div>{MSG[pin][2]}</div>
          </motion.div>
        </div>
        <p className="mt-3 text-[11px] text-mute">Pin any message and it appears on screen, live.</p>
      </div>

      <div className="relative flex flex-col overflow-hidden rounded-2xl bg-soft p-4">
        <div className="flex items-center justify-between text-xs text-mute"><span className="flex items-center gap-1.5"><i className="size-1.5 animate-pulse rounded-full bg-live" />Viewers</span><span>all platforms</span></div>
        <div className="mt-1 text-4xl font-semibold tracking-tight tabular-nums">{viewers.toLocaleString("en-US")}</div>
        <svg viewBox="0 0 200 50" preserveAspectRatio="none" className="mt-2 h-14 w-full" aria-hidden>
          <defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f6c445" stopOpacity=".35" /><stop offset="1" stopColor="#f6c445" stopOpacity="0" /></linearGradient></defs>
          <path d={`${spark}V50H0Z`} fill="url(#sg)" />
          <path className="spark" pathLength={1} d={spark} fill="none" stroke="#f6c445" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        </svg>
        <div className="mt-3 flex justify-between text-xs"><span className="text-mute">Chat / min</span><b className="tabular-nums">{cpm}</b></div>
        <div className="mt-3 flex h-2 overflow-hidden rounded-full bg-soft2"><i className="psplit h-full bg-live" style={{ width: "58%" }} /><i className="h-full flex-1 bg-brand" /></div>
        <div className="mt-1 flex justify-between text-[10px] text-mute"><span>YouTube</span><span>RTMP</span></div>
        {["🔥", "❤️", "👏"].map((e, i) => <span key={e} className="emo" style={{ right: 16 + i * 24, animationDelay: `${i * 1.1}s` }}>{e}</span>)}
      </div>
    </div>
  );
}

/* ---------- grid ---------- */
export default function Bento() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="md:col-span-2" title="Dual canvas" text="Render 16:9 and 9:16 from one session. No second app, no second encode."><Dual /></Card>
      <Card title="Metal compositor" text="GPU-composited scenes keep CPU use low, even with several 4K sources."><Gpu /></Card>
      <Card title="Crash-safe recording" text="Fragmented MP4 and MKV files stay playable if the app or Mac crashes."><Safe /></Card>
      <Card title="Gapless file split" text="Roll over to a new file every N minutes without dropping a frame."><Split /></Card>
      <Card title="Multistream" text="Send to YouTube and any custom RTMP destination at once."><Multi /></Card>
      <Card className="md:col-span-3" title="Merged live chat" text="Read every platform's chat in one panel. Pin, hide or pop out messages."><Chat /></Card>
    </div>
  );
}
