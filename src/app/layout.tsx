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
  metadataBase: new URL("https://davar-sand.vercel.app"),
  title: {
    default: "Davar — Kural İhlali Bildirim Platformu",
    template: "%s — Davar",
  },
  description:
    "Kaldırım ve engelli yollarındaki usulsüz park ihlallerini fotoğrafla, bildir, farkındalık yarat.",
  keywords: [
    "davar",
    "kaldırım ihlali",
    "erişilebilirlik",
    "bildirim",
    "engelsiz park",
    "engelli yolu",
    "bisiklet yolu",
    "usulsüz park",
    "park ihlali bildirimi",
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover",
  },
  openGraph: {
    title: "Davar — Kural İhlali Bildirim Platformu",
    description: "Kaldırım ve engelli yollarındaki usulsüz parkları fotoğrafla, farkındalık yarat.",
    url: "https://davar-sand.vercel.app",
    siteName: "Davar",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Davar — Kural İhlali Bildirim Platformu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Davar — Kural İhlali Bildirim Platformu",
    description: "Kaldırım ve engelli yollarındaki usulsüz parkları fotoğrafla, farkındalık yarat.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/davar.svg", type: "image/svg+xml" },
      { url: "/davar.png", type: "image/png" },
    ],
    apple: "/davar.png",
  },
  alternates: {
    canonical: "https://davar-sand.vercel.app",
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
