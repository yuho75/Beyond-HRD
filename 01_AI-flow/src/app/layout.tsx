import type { Metadata } from "next";
import { Nanum_Myeongjo } from "next/font/google";
import "./globals.css";

const nanumMyeongjo = Nanum_Myeongjo({
  weight: ["400", "700", "800"],
  subsets: ["latin"],
  variable: "--font-nanum-myeongjo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI Flow | Curated AI Insights",
  description: "Bi-weekly insights from top AI creators, summarized for you.",
};

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body
        className={`${nanumMyeongjo.variable} font-body-md antialiased bg-[#f8f9fa] text-gray-900 flex flex-col min-h-screen`}
      >
        <Header />
        <main className="flex-grow flex flex-col items-center w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

