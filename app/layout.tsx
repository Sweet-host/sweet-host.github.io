import "./globals.css";
import Navbar from "@/components/sections/Navbar"; // Import our new Navbar
import Cursor from "@/components/ui/Cursor";
import ScrollRestoration from "@/components/ScrollRestoration";
import { HERO_POSTER_SRC, HERO_VIDEO_SRC } from "@/lib/hero-assets";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        {/* Earliest possible fetch: hero poster + full-bleed video (before React hydrates). */}
        <link rel="preload" href={HERO_POSTER_SRC} as="image" />
        <link
          rel="preload"
          href={HERO_VIDEO_SRC}
          as="video"
          type="video/mp4"
        />
      </head>
      <body className="min-h-full flex flex-col bg-black cursor-none overflow-x-hidden">
        <ScrollRestoration />
        <Cursor />
        <Navbar /> {/* Place it here */}
        {children}
      </body>
    </html>
  );
}
