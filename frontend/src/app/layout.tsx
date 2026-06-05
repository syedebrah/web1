import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "A Universe Built For You ❤️",
  description: "An extraordinary romantic single-page interactive journey designed to celebrate our love, timeline, reasons, and future dreams.",
  authors: [{ name: "Alex" }],
  keywords: ["love letter", "romance web app", "anniversary memory website", "interactive story timeline"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#030008] text-zinc-100">
        {children}
      </body>
    </html>
  );
}
