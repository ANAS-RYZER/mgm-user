import type { Metadata } from "next";
import { Suspense } from "react";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";


const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import NetworkStatus from "@/components/NetworkStatus";
export const metadata: Metadata = {
  title: "MGM Mega Gold Mart",
  description: "MGM Mega Gold Mart",
  icons: {
    icon: "/mgm-white-gold.svg",
  },
};

function LoadingFallback(): JSX.Element {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en" className={montserrat.variable}>
      <body>
        <ReactQueryProvider>
          <NetworkStatus />
          <Toaster />
          <Suspense fallback={<LoadingFallback />}>
            {children}
          </Suspense>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
