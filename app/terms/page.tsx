import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "Terms of Service | Vidyst",
  description: "The terms that govern your use of Vidyst.",
};

const LAST_UPDATED = "September 29, 2026";

const link = "text-accent underline-offset-4 hover:underline";

type Section = {
  title: string;
  body?: React.ReactNode;
  bullets?: React.ReactNode[];
};

const Logo = ({ size }: { size: number }) => (
  <a href="/" className="flex items-center gap-2 font-semibold">
    <Image src="/logo.png" alt="" width={size} height={size} priority />
    Vidyst
  </a>
);

const sections: Section[] = [
  {
    title: "Your account",
    body: "You need an account to use Vidyst. You are responsible for activity under your account and for keeping your sign-in method secure. You must be old enough to form a binding contract where you live.",
  },
  {
    title: "License",
    body: "We grant you a personal, non-exclusive, non-transferable license to install and use the app on Macs you own or control, according to your plan. You may not reverse engineer, resell or redistribute the app except where the law allows it.",
  },
  {
    title: "Your content",
    body: "You own everything you stream and record. We do not claim any rights to your content. You are responsible for having the rights to what you broadcast and for complying with the terms of every platform you stream to, including the YouTube Terms of Service.",
  },
  {
    title: "Plans and billing",
    bullets: [
      "Vidyst requires a paid plan. Each plan starts with a 14-day free trial, which you can cancel before it ends without being charged.",
      "Plans renew automatically until cancelled. You can cancel at any time; your plan stays active until the end of the current billing period.",
      <>
        Prices are shown on the{" "}
        <Link href="/#pricing" className={link}>
          pricing page
        </Link>{" "}
        and may change with notice before your next renewal.
      </>,
      "Except where required by law, payments are non-refundable.",
    ],
  },
  {
    title: "Acceptable use",
    body: "Do not use the Service to break the law, infringe others' rights, distribute malware, or interfere with the Service or any platform it connects to.",
  },
  {
    title: "Third-party services",
    body: "The Service connects to platforms such as YouTube and custom RTMP servers. We are not responsible for those services, their availability or how they handle your content.",
  },
  {
    title: "Disclaimers",
    body: 'The Service is provided "as is". Live streaming depends on your hardware, network and third-party platforms, and we cannot guarantee that every stream or recording will be uninterrupted or error-free.',
  },
  {
    title: "Limitation of liability",
    body: "To the fullest extent permitted by law, Vidyst is not liable for indirect, incidental or consequential damages, or for lost profits or data. Our total liability is limited to the amount you paid us in the 12 months before the claim.",
  },
  {
    title: "Termination",
    body: "You can stop using the Service at any time. We may suspend or terminate accounts that violate these terms.",
  },
  {
    title: "Changes",
    body: "We may update these terms. If changes are material, we will update the date above and notify you in the app. Continuing to use the Service means you accept the updated terms.",
  },
  {
    title: "Contact",
    body: (
      <>
        Questions about these terms? Email{" "}
        <a href="mailto:hello@vidyst.com" className={link}>
          hello@vidyst.com
        </a>
        . See also our{" "}
        <Link href="/privacy" className={link}>
          Privacy Policy
        </Link>
        .
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <>
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
      <main className="mx-auto w-full max-w-4xl px-6 pb-24 pt-15">
        <header className="border-b border-soft2 pb-8">
          <p className="text-xs font-medium uppercase tracking-widest text-accent">
            Legal
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-3 text-sm text-mute">Last updated {LAST_UPDATED}</p>
        </header>

        <p className="mt-8 leading-7 text-mute">
          These terms govern your use of the Vidyst app for macOS, your Vidyst
          account and this website (together, the &quot;Service&quot;). By using
          the Service you agree to these terms.
        </p>

        {sections.map((s) => (
          <section key={s.title} className="mt-12">
            <h2 className="text-xl font-semibold tracking-tight">{s.title}</h2>
            {s.body && <p className="mt-4 leading-7 text-mute">{s.body}</p>}
            {s.bullets && (
              <ul className="mt-4 list-disc space-y-3 pl-5 leading-7 text-mute marker:text-mute">
                {s.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </main>
    </>
  );
}
