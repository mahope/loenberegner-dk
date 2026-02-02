import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SharedFooter from "@/components/SharedFooter";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lønberegner 2025 - Beregn din nettoløn gratis | Dansk skatteberegner",
  description: "Gratis dansk lønberegner med opdaterede skattesatser for 2025. Beregn præcist hvad du får udbetalt efter skat, AM-bidrag, pension og kommuneskat.",
  keywords: "lønberegner, skatteberegner, nettoløn, bruttoløn, dansk skat, 2025, beregn løn, hvad får jeg udbetalt, løn efter skat",
  authors: [{ name: "Lønberegner.dk" }],
  openGraph: {
    title: "Lønberegner 2025 - Beregn din nettoløn gratis",
    description: "Gratis dansk lønberegner med opdaterede skattesatser. Se hvad du får udbetalt.",
    type: "website",
    locale: "da_DK",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="da">
      <head>
        <link rel="canonical" href="https://loenberegner.dk" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Lønberegner 2025",
              "description": "Gratis dansk lønberegner med opdaterede skattesatser for 2025",
              "url": "https://loenberegner.dk",
              "applicationCategory": "FinanceApplication",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "DKK"
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
        <SharedFooter />
      </body>
    </html>
  );
}
