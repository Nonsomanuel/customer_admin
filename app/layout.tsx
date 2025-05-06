import type { Metadata } from "next";
import "./globals.css";
import { LayoutClient } from "./layoutclient";

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
      <body>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
