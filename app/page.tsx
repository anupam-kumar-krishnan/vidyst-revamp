"use client";
import Image from "next/image";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import Studio from "@/components/Studio";
import Bento from "@/components/Bento";
import Faq from "@/components/Faq";

const wrap = "mx-auto max-w-6xl px-5";
const ease = [0.22, 1, 0.36, 1] as const;

const Reveal = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, ease }}>{children}</motion.div>
);

const Heading = ({ title, sub }: { title: string; sub?: string }) => (
  <Reveal className="mx-auto mb-14 max-w-2xl text-center">
    <h2 className="grad text-3xl font-semibold tracking-[-0.03em] text-balance md:text-5xl">{title}</h2>
    {sub && <p className="mt-4 text-mute">{sub}</p>}
  </Reveal>
);

const Btn = ({ href, children, ghost }: { href: string; children: ReactNode; ghost?: boolean }) => (
  <motion.a href={href} whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
    className={`inline-flex h-12 items-center rounded-full px-7 text-sm font-semibold ${ghost ? "glass hover:bg-soft2" : "bg-brand text-black shadow-[0_0_40px_-8px_#f6c445]"}`}>{children}</motion.a>
);

const Logo = ({ size }: { size: number }) => (
  <a href="#" className="flex items-center gap-2 font-semibold"><Image src="/logo.png" alt="" width={size} height={size} priority />Vidyst</a>
);

const stats = [["2", "canvases per session"], ["4K", "source capture"], ["HEVC", "hardware encode"], ["0", "plugins needed"]];
const steps = [["Add sources", "Pick a display, window, camera, microphone or system audio."], ["Build scenes", "Arrange sources into scenes for each camera, slide deck or guest layout."], ["Go live and record", "Stream to every destination while a crash-safe master file records."]];
const rows = [["Native Apple Silicon app", "Yes", "Partial", "No"], ["Horizontal and vertical in one session", "Yes", "No", "Partial"], ["Hardware HEVC encoding", "Yes", "Partial", "No"], ["Crash-safe local recording", "Yes", "No", "No"], ["YouTube broadcasts created for you", "Yes", "No", "Yes"], ["Merged multi-platform chat", "Yes", "No", "Yes"], ["Works without a browser tab", "Yes", "Yes", "No"]];
const privacy = [["Your media stays on your Mac", "Capture, compositing, encoding and recording all happen locally."], ["No passwords in the app", "Sign in with Apple, Google or email in your browser. The app never sees them."], ["Encrypted platform tokens", "Your YouTube refresh token is AES-GCM encrypted on our server and never sent to your browser."]];
const plans = [
  { name: "Basic", price: "₹999", blurb: "Everything you need to go live and record on your Mac.", hot: false, list: ["Dual canvas: horizontal + vertical", "Record to MP4 and MKV", "Hardware HEVC encoding", "Merged live chat", "Up to 2 destinations at once", "1 guest in your room"] },
  { name: "Creator", price: "₹2,999", blurb: "Every destination at once, and a bigger guest room.", hot: true, list: ["Everything in Basic", "Unlimited destinations at once", "Up to 10 guests in your room"] },
];
const faqs: [string, string][] = [
  ["What is Vidyst?", "Vidyst is a macOS studio for live streaming and recording. It composites your scenes on the GPU and sends them to YouTube and any RTMP destination, in horizontal, vertical or both."],
  ["Which Macs does Vidyst support?", "Any Mac with Apple Silicon running macOS 14.2 or later."],
  ["Can I stream horizontal and vertical at the same time?", "Yes. Vidyst renders a 1920×1080 and a 1080×1920 canvas side by side in one session."],
  ["Where can I stream to?", "YouTube, plus any custom RTMP or RTMPS destination."],
  ["What happens to my recording if the app crashes?", "Recordings are written in fragments, so everything captured up to the crash stays playable."],
  ["Is there a free trial?", "Yes. Every plan includes a 14-day free trial."],
];

export default function Page() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[900px] overflow-hidden"
        aria-hidden
      >
        <div className="grid-bg absolute inset-0" />
        <div className="absolute left-1/2 top-[-220px] h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-brand/20 blur-[130px]" />
        <div className="absolute left-[60%] top-[-120px] h-[360px] w-[520px] rounded-full bg-amber-500/20 blur-[120px]" />
      </div>

      <header className="sticky top-3 z-50 px-4">
        <div className="glass mx-auto flex h-12 max-w-4xl items-center justify-between rounded-full bg-ink/60 pl-4 pr-1.5">
          <Logo size={28} />
          <nav className="hidden gap-6 text-sm text-mute md:flex">
            {["Features", "Compare", "Pricing", "FAQ"].map((n) => (
              <a key={n} href={`#${n.toLowerCase()}`} className="hover:text-fg">
                {n}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <a
              href="#download"
              className="rounded-full bg-fg px-4 py-1.5 text-sm font-medium text-ink"
            >
              Download
            </a>
          </div>
        </div>
      </header>

      <main className="relative">
        <section className={`${wrap} pb-28 pt-24 text-center`}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <a
              href="#features"
              className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-mute"
            >
              <span className="rounded-full bg-brand px-1.5 py-0.5 font-semibold text-black">
                New
              </span>
              Dual-canvas streaming for Apple Silicon
            </a>
            <h1 className="grad mx-auto mt-7 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-0.04em] text-balance md:text-8xl">
              Go live everywhere, in both formats.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-pretty text-mute">
              Vidyst is a native Mac studio for live streaming and recording.
              Stream to YouTube and any RTMP destination, record crash-safe 4K,
              and produce horizontal and vertical video from one session.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Btn href="#download">Download for macOS</Btn>
              <Btn href="#pricing" ghost>
                View pricing
              </Btn>
            </div>
            <p className="mt-4 text-xs text-mute">
              14-day free trial · Apple Silicon · macOS 14.2+
            </p>
          </motion.div>
          <Studio />
        </section>

        <Reveal className={`${wrap} max-w-5xl pb-24`}>
          <div className="glass grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-soft2 text-center md:grid-cols-4">
            {stats.map(([n, l]) => (
              <div key={l} className="bg-ink/80 px-4 py-7">
                <div className="text-3xl font-semibold tracking-tight">{n}</div>
                <div className="mt-1 text-xs text-mute">{l}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <section id="features" className={`${wrap} py-24`}>
          <Heading
            title="A broadcast truck, in one Mac app."
            sub="Everything a live show needs, running natively."
          />
          <Bento />
        </section>

        <section className={`${wrap} py-24`}>
          <Heading title="Three steps. No plugins." />
          <div className="grid gap-4 md:grid-cols-3">
            {steps.map(([t, d], i) => (
              <Reveal key={t}>
                <div className="glass h-full rounded-2xl p-6">
                  <div className="mb-5 grid size-9 place-items-center rounded-full bg-linear-to-br from-brand to-amber-600 text-sm font-bold text-black">
                    {i + 1}
                  </div>
                  <h3 className="font-medium">{t}</h3>
                  <p className="mt-2 text-sm text-mute">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="compare" className={`${wrap} py-24`}>
          <Heading title="Built for the way you actually stream." />
          <Reveal>
            <div className="glass overflow-x-auto rounded-2xl">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead className="text-mute">
                  <tr className="border-b border-soft2">
                    <th className="p-4 font-normal">Capability</th>
                    <th className="bg-brand/10 p-4 font-semibold text-accent">
                      Vidyst
                    </th>
                    <th className="p-4 font-normal">OBS</th>
                    <th className="p-4 font-normal">Browser studios</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(([c, ...v]) => (
                    <tr key={c} className="border-b border-soft2 last:border-0">
                      <td className="p-4">{c}</td>
                      {v.map((x, i) => (
                        <td
                          key={i}
                          className={`p-4 ${i ? "text-mute" : "bg-brand/5 font-medium text-accent"}`}
                        >
                          {x === "Yes" && !i ? "✓ Yes" : x}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </section>

        <section className={`${wrap} py-24`}>
          <Heading
            title="Private by design."
            sub="Your cameras, screen and audio are processed on your Mac, not in a cloud studio."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {privacy.map(([t, d]) => (
              <Reveal key={t}>
                <div className="glass h-full rounded-2xl p-6">
                  <h3 className="font-medium">{t}</h3>
                  <p className="mt-2 text-sm text-mute">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="pricing" className={`${wrap} py-24`}>
          <Heading
            title="14 days on us."
            sub="Billed in INR by Razorpay. Pay with UPI, cards or netbanking. Cancel any time."
          />
          <div className="mx-auto grid max-w-3xl gap-4 md:grid-cols-2">
            {plans.map((p) => (
              <Reveal key={p.name}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className={`h-full rounded-3xl p-7 ${p.hot ? "bg-linear-to-b from-brand/15 to-transparent shadow-[0_0_80px_-30px_#f6c445] ring-1 ring-brand/50" : "glass"}`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{p.name}</h3>
                    {p.hot && (
                      <span className="rounded-full bg-brand px-2.5 py-0.5 text-xs font-semibold text-black">
                        Most popular
                      </span>
                    )}
                  </div>
                  <p className="mt-5 text-5xl font-semibold tracking-tight">
                    {p.price}
                    <span className="text-sm font-normal text-mute">
                      {" "}
                      /month
                    </span>
                  </p>
                  <p className="mt-2 text-sm text-mute">{p.blurb}</p>
                  <a
                    href="#download"
                    className={`mt-6 block rounded-full py-3 text-center text-sm font-semibold ${p.hot ? "bg-brand text-black" : "bg-fg text-ink"}`}
                  >
                    Start 14-day free trial
                  </a>
                  <ul className="mt-7 space-y-3 text-sm">
                    {p.list.map((l) => (
                      <li key={l} className="flex gap-2.5">
                        <span className="text-accent">✓</span>
                        {l}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="faq" className={`${wrap} max-w-3xl py-24`}>
          <Heading title="Common questions." />
          <Reveal>
            <Faq items={faqs} />
          </Reveal>
        </section>

        <section id="download" className={`${wrap} pb-24`}>
          <Reveal>
            <div className="glass relative overflow-hidden rounded-[2rem] px-6 py-24 text-center">
              <div className="absolute left-1/2 top-[-120px] h-72 w-[600px] -translate-x-1/2 rounded-full bg-brand/25 blur-[110px]" />
              <div className="absolute bottom-[-140px] left-[55%] h-60 w-[400px] rounded-full bg-amber-500/25 blur-[110px]" />
              <h2 className="grad relative mx-auto max-w-2xl text-4xl font-semibold tracking-[-0.03em] text-balance md:text-6xl">
                Start streaming in both formats.
              </h2>
              <p className="relative mx-auto mt-4 max-w-md text-mute">
                Download Vidyst and go live on every platform, in both formats,
                from your Mac. First 14 days free.
              </p>
              <div className="relative mt-9">
                <Btn href="#download">Download for macOS</Btn>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-soft2 py-10 text-sm text-mute">
        <div
          className={`${wrap} flex flex-col justify-between gap-4 md:flex-row`}
        >
          <div className="flex items-center gap-2.5 text-fg">
            <Logo size={24} />
            <span className="font-normal text-mute">
              © 2026 All rights reserved.
            </span>
          </div>
          <div className="flex gap-6">
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
          </div>
        </div>
      </footer>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease }}
        className="pointer-events-none overflow-hidden px-2 pt-4"
        aria-hidden
      >
        <div className="mark">Vidyst</div>
      </motion.div>
    </>
  );
}
