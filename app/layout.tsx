import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BushMilli | Lagos Streetwear",
  description: "BushMilli streetwear, graphic tees, and culture-led drops in Lagos, Nigeria."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
