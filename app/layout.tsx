import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import { getSiteData } from "@/lib/catalog";

// El contenido viene del portal administrativo. Las páginas se regeneran solas
// cada 60 segundos y al instante cuando el portal avisa (ver app/api/revalidate).
export const revalidate = 60;

// Fuentes alojadas en el proyecto (subconjunto latino de Google Fonts, licencia OFL).
const jakarta = localFont({
  src: "./fonts/plus-jakarta-sans-latin.woff2",
  weight: "200 800",
  variable: "--font-jakarta",
  display: "swap",
});
const baloo = localFont({
  src: "./fonts/baloo-2-latin.woff2",
  weight: "600 800",
  variable: "--font-baloo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: SITE_URL ? new URL(SITE_URL) : undefined,
  title: {
    default: `${SITE_NAME} | Arriendo de servicios infantiles e inflables`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "arriendo de servicios infantiles",
    "arriendo de inflables",
    "castillo inflable",
    "piscina de pelotas",
    "cumpleaños infantiles",
    "Zona Creativa",
  ],
  icons: {
    icon: "/images/favicon-192.png",
    apple: "/images/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Arriendo de servicios infantiles e inflables`,
    description: SITE_DESCRIPTION,
    images: [{ url: "/images/pack 2 piscina.webp", alt: "Servicios infantiles Zona Creativa" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#1838b4",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { contact } = await getSiteData();
  return (
    <html lang="es" className={`${jakarta.variable} ${baloo.variable}`}>
      <body className="relative min-h-dvh flex flex-col">
        <Navbar contact={contact} />

        <main className="flex-1 flex flex-col">{children}</main>

        <Footer contact={contact} />
        <WhatsAppFloatingButton number={contact.whatsappNumber} />
      </body>
    </html>
  );
}
