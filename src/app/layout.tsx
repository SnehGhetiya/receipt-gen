import CreateReceiptContextProvider from "@/context/InputFormContext";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Receipt Gen",
  description: "All in one app to generate flat maintenance receipt",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="w-full min-h-screen overflow-x-hidden box-border m-0 p-0"
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} w-full min-h-screen overflow-x-hidden box-border m-0 p-0`}
      >
        <div className="flex mx-auto p-4">
          <CreateReceiptContextProvider>
            {children}
          </CreateReceiptContextProvider>
        </div>
      </body>
    </html>
  );
}
