import { AppLayout } from "@/components/layout/app-layout";
import { ReactNode } from "react";

//seo tags
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.onlyfounders.xyz/resources"),
  title: "OnlyFounders | Resources",
  description: "Educate. Elevate. Empower.",
  openGraph: {
    title: "Resources",
    description: "Educate. Elevate. Empower.",
    images: [
      {
        url: "/resources-seo.jpg",
        width: 1200,
        height: 630,
        alt: "OnlyFounders Resources",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OnlyFounders | Resources",
    images: ["/resources-seo.jpg"],
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