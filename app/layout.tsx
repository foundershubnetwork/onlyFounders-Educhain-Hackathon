import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Providers from "./web3/Providers";
import "@rainbow-me/rainbowkit/styles.css";
import AuthTracking from "./MIXPanel/AuthTracking";
import AuthProvider from "../components/AuthProvider"; // Use AuthProvider instead of UserProvider
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Optimus AI - Web3 Fundraising Platform",
  description:
    "AI-powered Web3 fundraising platform connecting innovative blockchain projects with global investors",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <AuthProvider>
          <AuthTracking /> {/* Tracking user login */}
          <Providers>
            {children}
            <Toaster/>
            <Analytics />
            <SpeedInsights />
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
