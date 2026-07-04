import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import DemoToggle from "@/components/DemoToggle";
import { PlusProvider } from "@/components/PlusContext";

export const metadata: Metadata = {
  title: "FINN.no — mulighetenes marked",
  description: "Prototype: FINN+ premium-medlemskap (konsept, ikke tilknyttet FINN.no)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nb">
      <body>
        <PlusProvider>
          <Header />
          {children}
          <DemoToggle />
          <footer className="mt-16 border-t border-finn-border bg-finn-bg py-8 text-center text-xs text-finn-gray-2">
            Konseptprototype for demonstrasjon — ikke tilknyttet FINN.no / Schibsted.{" "}
            <a href="/pitch" className="text-finn-blue hover:underline">
              Forretningscase →
            </a>
          </footer>
        </PlusProvider>
      </body>
    </html>
  );
}
