import { ReactNode } from "react";

//seo tags
import { Metadata } from "next";
import { AppLayout } from "@/components/layout/app-layout";

export const metadata: Metadata = {
  title: "OnlyFounders | Quests",
  description: "Learn. Earn. Unlock Possibilities.",
  openGraph: {
    title: "Quests",
    description: "Learn. Earn. Unlock Possibilities.",
    images: [
      {
        url: "/quest-seo.jpg",
        width: 1200,
        height: 630,
        alt: "OnlyFounders Quests",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OnlyFounders | Quests",
    images: ["/quest-seo.jpg"],
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