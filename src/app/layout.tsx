import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cairo, Heebo, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-en",
  display: "swap"
});

const heebo = Heebo({
  subsets: ["latin", "hebrew"],
  variable: "--font-he",
  display: "swap"
});

const cairo = Cairo({
  subsets: ["latin", "arabic"],
  variable: "--font-ar",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Cee+ | AI Performance Creative Agency",
  description:
    "Modern AI-powered creative systems for businesses in Israel."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${heebo.variable} ${cairo.variable}`}>
        {children}
      </body>
    </html>
  );
}
