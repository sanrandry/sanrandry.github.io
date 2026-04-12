import type { Metadata } from "next";
import { Roboto, Inknut_Antiqua } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const inknutAntiqua = Inknut_Antiqua({
  variable: "--font-inknut",
  subsets: ["latin"],
  weight: ["600"],
});

export const metadata: Metadata = {
  title: "Santatraina Sitraka RANDRY — Portfolio",
  description: "Software engineer specializing in building exceptional digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${inknutAntiqua.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white font-roboto">{children}</body>
    </html>
  );
}
