import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KAFOTEC",
  description: "KAFOTEC Milling Technologies Uganda specializes in high-quality, precision-milled maize flour and grains, using advanced technology to deliver top-notch products to both local and international markets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>KAFOTEC</title>
        <meta name="KAFOTEC" content="KAFOTEC Milling Technologies Uganda specializes in high-quality, precision-milled maize flour and grains, using advanced technology to deliver top-notch products to both local and international markets." />
        <link rel="icon" href="/favicon.ico"/>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="top-center" reverseOrder={false} />
        {children}
      </body>
    </html>
  );
}
