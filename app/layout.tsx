import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  title: "Vidyst – Go live everywhere, in both formats",
  description: "A native Mac studio for live streaming and recording.",
};

const init = `(function(){var s;try{s=localStorage.getItem("vidyst-theme")}catch(e){}document.documentElement.dataset.theme=s==="light"?"light":"dark"})()`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={geist.variable}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: init }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
