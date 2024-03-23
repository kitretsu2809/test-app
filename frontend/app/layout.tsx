import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quizo",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <header>
        <div>
          
        </div>
      </header>
      <body>{children}</body>
    </html>
  );
}
