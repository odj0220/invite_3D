import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "3D 청첩장",
  description: "특별한 날을 위한 3D 청첩장",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
