"use client";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <SessionProvider>
      <Head>
        <title>Next.js App</title>
      </Head>
      <html lang="en">
        <body className={inter.className}>
          <div className="min-h-[80vh]">{children}</div>
        </body>
      </html>
    </SessionProvider>
  );
}
