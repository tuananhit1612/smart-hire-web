import type { Metadata } from "next";
import { Be_Vietnam_Pro, Orbitron } from "next/font/google"; // Added Orbitron
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { ToastProvider } from "@/shared/components/ui/toast";

import { ParticleBackground } from "@/shared/components/effects/ParticleBackground";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-be-vietnam",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SmartHire Ultra - AI Recruitment",
  description: "Next-generation hiring platform powered by Holographic AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${beVietnamPro.variable} ${orbitron.variable} font-sans antialiased flex flex-col min-h-screen bg-slate-50 dark:bg-[#0B0F19]`}
      >
        <ParticleBackground />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ToastProvider>
            {children}
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

