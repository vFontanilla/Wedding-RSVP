// app/layout.tsx
import type React from "react";
import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "700"], // keep only main weights
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://wedding-rsvp-flax.vercel.app/"), // update with real domain
  title: "You're Invited! — John & Dowy's Wedding",
  description:
    "Join John & Dowy as they celebrate their wedding. Find all the details and RSVP here.",
  openGraph: {
    title: "You're Invited! — John & Dowy's Wedding",
    description: "All wedding details in one place—venue, schedule, and RSVP.",
    url: "/",
    type: "website",
    images: ["/og/og-cover.jpg"], // 1200x630
  },
  twitter: {
    card: "summary_large_image",
    title: "You're Invited! — John & Dowy's Wedding",
    description: "Find all the details and RSVP in one place.",
    images: ["/og/og-cover.jpg"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/images/pexels-edurawpro-32060022.jpg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(inter.variable, playfair.variable)}
    >
      <body className="min-h-screen bg-weddingCream font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
