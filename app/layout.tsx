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
  const ogImage = "https://fomofy.vercel.app/og-image.png";
  return (
    <html lang="en" data-theme="pastel">
      <head>
        <meta property="og:url" content="https://fomofy.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Fomofy" />
        <meta
          property="og:description"
          content="Convert more visitors into customers with a call-to-action."
        />
        <meta property="og:image" content={ogImage} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="fomofy.vercel.app" />
        <meta property="twitter:url" content="https://fomofy.vercel.app/" />
        <meta name="twitter:title" content="Fomofy" />
        <meta
          name="twitter:description"
          content="Convert more visitors into customers with a call-to-action."
        />
        <meta name="twitter:image" content={ogImage} />
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
