import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zona Creativa",
  description: "Zona Creativa",
  icons: {
    icon: "/images/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="relative min-h-dvh flex flex-col">
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <Image
            src="/images/fondoamanda.webp"
            alt="Niño con pelotas"
            fill
            priority
            quality={100}
            className="
    object-cover
    brightness-100
    contrast-70
    saturate-105
  "
          />
        </div>

        <Navbar />

        <main className="flex-1 flex flex-col">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
