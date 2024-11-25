import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import ToastProvider from "@/components/toast-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fomofy",
  description: "Convert more visitors into customers with a call-to-action.",
  keywords:
    "FOMO marketing, popup builder, website conversion, sales popup, fomofy, landing page, call-to-action",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="pastel">
      <head>
        <meta title="og:site_name" content="Fomofy" />
        <meta title="og:type" content="website" />
        <meta
          title="og:image"
          content="https://fomofy.vercel/img/og-image.jpg"
        />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <ToastProvider />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
