import type { Metadata } from "next";
import { Be_Vietnam_Pro, Space_Grotesk, Fira_Code } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { ToastProvider } from "@/shared/components/ui/toast";
import { AuthProvider } from "@/features/auth/context/auth-context";
import { MockInit } from "@/shared/components/mock-init";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-be-vietnam",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-fira-code",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SmartHire - AI Recruitment Platform",
  description: "Next-generation hiring platform powered by AI. Connect with top talent and find your dream job.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>

      <body
        suppressHydrationWarning
        className={`${beVietnamPro.variable} ${spaceGrotesk.variable} ${firaCode.variable} font-body antialiased flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ToastProvider>
            <AuthProvider>
              <MockInit />
              <Suspense fallback={null}>
                {children}
              </Suspense>
            </AuthProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
