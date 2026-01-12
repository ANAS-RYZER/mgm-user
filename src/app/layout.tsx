import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MGM Mega Gold Mart",
  description: "MGM Mega Gold Mart",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
