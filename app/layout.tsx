import type { Metadata } from "next";
import { WodProvider } from "./context/WodContext";
import Header from "@/components/header";
import "./globals.css";

export const metadata: Metadata = {
  title: "WOD Log",
  description: "Website to log your WODs",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-nunito">
        <Header />
        <WodProvider>{children}</WodProvider>
      </body>
    </html>
  );
}
