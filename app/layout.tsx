import "./globals.css";
import Navbar from "@/components/sections/Navbar"; // Import our new Navbar
import Cursor from "@/components/ui/Cursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-black cursor-none overflow-x-hidden">
        <Cursor />
        <Navbar /> {/* Place it here */}
        {children}
      </body>
    </html>
  );
}
