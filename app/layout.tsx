import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { ThemeProvider } from './components/theme-provider';
import DarkThemeHandler from "./components/theme-handler";
import { DebugProvider } from "./components/debug-provider";
import DebugFloatingButton from "./components/DebugFloatingButton";
import { siteConfig } from "@/config/site";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head><DarkThemeHandler /></head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen flex-col px-30 `}>
        <ThemeProvider>
          <DebugProvider>
          <Nav />
            <main className="flex-1 flex">{children}</main>

          <Footer />
            <DebugFloatingButton />
          </DebugProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
