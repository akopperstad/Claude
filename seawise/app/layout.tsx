import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz"],
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://seawise.no"),
  title: "Seawise — Maritime operations, finally built for this century",
  description:
    "Seawise is the modern operating system for fleet operators. Nautech unifies operations, compliance, crew, maintenance and intelligence in one maritime ERP — built by maritime operators.",
  keywords: [
    "maritime software",
    "fleet management",
    "maritime ERP",
    "safety management system",
    "SMS",
    "ship operations",
    "Nautech",
    "Seawise",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Seawise — The modern maritime fleet OS",
    description:
      "The modern operating system for fleet operators. Built by maritime operators.",
    type: "website",
    url: "https://seawise.no",
    siteName: "Seawise",
    images: ["/hero-deep.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seawise — The modern maritime fleet OS",
    description: "The modern operating system for fleet operators.",
    images: ["/hero-deep.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Seawise",
              legalName: "Seawise AS",
              url: "https://seawise.no",
              email: "hello@seawise.no",
              foundingDate: "2025",
              address: { "@type": "PostalAddress", addressCountry: "NO" },
              description:
                "The modern operating system for fleet operators. Nautech is the Seawise maritime ERP.",
            }),
          }}
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
