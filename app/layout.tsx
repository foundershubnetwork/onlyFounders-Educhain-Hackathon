import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Providers from "../web3/Providers";
import "@rainbow-me/rainbowkit/styles.css";
import AuthTracking from "./MIXPanel/AuthTracking";
import AuthProvider from "../components/AuthProvider"; // Use AuthProvider instead of UserProvider
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";



const inter = Inter({ subsets: ["latin"] });


//social Preview settings
export const metadata: Metadata = {
  metadataBase: new URL("https://www.onlyfounders.xyz"),
  title: "OnlyFounders - Web3 Fundraising Platform",
  description: "AI-powered Web3 fundraising platform connecting innovative blockchain projects with global investors",
  openGraph: {
    title: "Welcome to OnlyFounders",
    description: "Discover amazing experiences and quests.",
    images: [
      {
        url: "/founders-verida-mobile.png",
        width: 1200,
        height: 630,
        alt: "Home Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Welcome to Our OnlyFounders",
    images: ["/home.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-R97GNL407V"
        ></Script>
        <Script id="google-analytics">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-R97GNL407V');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <AuthTracking /> {/* Tracking user login */}
          <Providers>
            {children}
            <Analytics />
            <SpeedInsights />
            <Toaster />
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
