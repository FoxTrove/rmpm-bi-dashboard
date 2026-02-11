import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import DashboardShell from "@/components/DashboardShell";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RPM Rockies Command Center",
  description: "Unified Operations Platform for Real Property Management of the Rockies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrains.variable} antialiased`}>
        <DashboardShell>{children}</DashboardShell>
      </body>
    </html>
  );
}
