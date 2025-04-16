
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
<<<<<<< HEAD
import { Providers } from "./providers";
=======
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";
>>>>>>> 0f45ce625b3b78df86083be31fb85fa3be6477e2

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LazyDev AI",
  description: "Your AI assistant for dev workflows",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
<<<<<<< HEAD
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
=======
        <ThemeProvider>
          <AuthProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
>>>>>>> 0f45ce625b3b78df86083be31fb85fa3be6477e2
      </body>
    </html>
  );
}
