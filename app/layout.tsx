import "./globals.css";
import Navbar from "@/components/sections/Navbar";
import Cursor from "@/components/ui/Cursor";
import ScrollRestoration from "@/components/ScrollRestoration";
import { HERO_POSTER_SRC, HERO_VIDEO_SRC } from "@/lib/hero-assets";

// 1. Import Archivo_Black for massive headers, and keep a clean sans for regular text if needed
import { Archivo_Black } from "next/font/google";

// 2. Configure the font
const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400", // Archivo Black only has one massive baseline weight
  variable: "--font-inter", // Keeping your existing CSS variable name so we don't have to rewrite globals.css!
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 3. Inject it straight into the root
    <html lang="en" className={`${archivoBlack.variable} h-full antialiased`}>
      <head>
        <link rel="preload" href={HERO_POSTER_SRC} as="image" />
        <link rel="preload" href={HERO_VIDEO_SRC} as="video" type="video/mp4" />
      </head>
      <body className="min-h-full flex flex-col bg-black cursor-none overflow-x-hidden">
        <ScrollRestoration />
        <Cursor />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
