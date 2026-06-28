import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reface — audit & redesign any website",
  description:
    "Paste a website URL. Reface captures it, audits its UX/UI, and generates an improved redesign.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
