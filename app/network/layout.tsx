import { ReactNode } from "react";

//seo tags
import { Metadata } from "next";
import { AppLayout } from "@/components/layout/app-layout";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.onlyfounders.xyz/network"),
  title: "OnlyFounders | Network",
  description: "Browse, network, connect, and build with industry experts and leaders.",
  openGraph: {
    title: "Network",
    description: "Browse, network, connect, and build with industry experts and leaders.",
    images: [
      {
        url: "/network-seo.jpg",
        width: 1200,
        height: 630,
        alt: "OnlyFounders Network",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OnlyFounders | Network",
    images: ["/network-seo.jpg"],
  },
};

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <AppLayout className="">
        {children}
    </AppLayout>
  );
};

export default Layout;