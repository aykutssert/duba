import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Davar — Kural İhlali Bildirim Platformu",
  description:
    "Kaldırım ve engelli yollarındaki usulsüz park ihlallerini fotoğrafla, bildir, farkındalık yarat.",
  keywords: ["davar", "kaldırım ihlali", "erişilebilirlik", "bildirim", "engelsiz park"],
  openGraph: {
    title: "Davar — Kural İhlali Bildirim Platformu",
    description: "Kaldırım ve engelli yollarındaki usulsüz parkları fotoğrafla, farkındalık yarat.",
    url: "https://davar.com",
    siteName: "Davar",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Davar — Kural İhlali Bildirim Platformu",
    description: "Kaldırım ve engelli yollarındaki usulsüz parkları fotoğrafla, farkındalık yarat.",
  },
  icons: {
    icon: "/davar.svg",
    apple: "/davar.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
