import type { Metadata } from "next";
import "./globals.css";
import { LayoutClient } from "./layoutclient";
import { Radio_Canada } from "next/font/google";
import { Toaster } from "sonner";

const radio_canada = Radio_Canada({
  variable: "--font-radio-canada",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Business Admin",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={` ${radio_canada.variable} antialiased`}>
        <LayoutClient>{children}</LayoutClient>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
