"use client";

import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout-comp/navbar";
import Footer from "@/components/layout-comp/footer";
import { Toaster } from "@/components/ui/toaster";
import { Provider as StoreProvider } from "react-redux";
import store from "@/redux/store";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider store={store}>
          <Navbar />
          <main className="pt-40">{children}</main>
          <Footer />
        </StoreProvider>
      </body>
      <Toaster />
    </html>
  );
}
