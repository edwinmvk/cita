import type { Metadata } from "next";
import "./globals.css";
import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";
import { poppins } from "@/lib/fonts";

export const metadata: Metadata = {
  // inorder for the "title.template" to work, the pages in that specific route must also have a "title" in its metadata.
  // if the pages in that specific route have no "title", then "title.default" of the closest parent Layout will be shown for that particular page
  title: { default: "CITA", template: "%s | CITA" },
  description: "Conversational Interview and Training Assistant",
  keywords: [
    "talking",
    "ai",
    "talkingPDF",
    "pdf",
    "free",
    "chatbot",
    "scrapper",
    "easy",
  ],
  generator: "Next.js",
  applicationName: "CITA",
  referrer: "origin-when-cross-origin",
  authors: [{ name: "" }],
  creator: "",
  publisher: "",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(`http://localhost:3000`),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  openGraph: {
    title: "talkingPDF",
    description: "Talk with your pdf for free",
    url: `http://localhost:3000`,
    siteName: "talkingPDF",
    // images: [
    //   {
    //     url: "/images/logo-background.jpg",
    //     width: 800,
    //     height: 600,
    //   },
    // ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    // icon: "/images/logo-background.jpg",
  },
  category: "interview virtual ai chat bot free",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="icon" href="/images/favicon.ico" />
      </head>
      <body
        className={cn(
          "min-h-screen font-sans antialiased bg-white",
          poppins.className
        )}
      >
        {children}
      </body>
    </html>
  );
}
