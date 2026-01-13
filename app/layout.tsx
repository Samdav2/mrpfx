import type { Metadata } from "next";
import { Inter, DM_Sans, Palanquin_Dark, Nova_Flat } from "next/font/google";
import "./globals.css";
import "./homepage-post.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "700"],
  display: "swap",
});

const palanquinDark = Palanquin_Dark({
  subsets: ["latin"],
  variable: "--font-palanquin-dark",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const novaFlat = Nova_Flat({
  subsets: ["latin"],
  variable: "--font-nova-flat",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mr P FX - Master Forex Trading",
  description: "Master forex trading through precision, strategy, and discipline.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${dmSans.variable} ${palanquinDark.variable} ${novaFlat.variable} font-sans bg-black text-white min-h-screen flex flex-col antialiased`}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
