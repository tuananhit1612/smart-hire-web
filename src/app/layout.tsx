import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Orbitron } from "next/font/google"; // Added Orbitron
import "./globals.css";
import { Header } from "@/shared/components/layout/Header";
import { Footer } from "@/shared/components/layout/Footer";
import { ThemeProvider } from "@/providers/theme-provider";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
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
        className={`${plusJakarta.variable} ${orbitron.variable} font-sans antialiased flex flex-col min-h-screen bg-slate-50 dark:bg-[#0B0F19]`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
