import { AuthProvider } from "@/features/auth/context/auth-context";
import { ThemeProvider } from "@/providers/theme-provider";
import { MockInit } from "@/shared/components/mock-init";
import { ToastProvider } from "@/shared/components/ui/toast";
import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";

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
        className="font-body antialiased flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden"
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
