import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { profile, siteUrl } from "@/data/content";
import Providers from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // metadataBase: og:image gibi göreli adresleri mutlak URL'e çevirir.
  metadataBase: new URL(siteUrl),
  title: `${profile.name} — ${profile.title}`,
  description: profile.summary,
  openGraph: {
    title: `${profile.name} — ${profile.tagline}`,
    description: profile.summary,
    type: "website",
    locale: "tr_TR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: next-themes <html>'e .dark sınıfını
    // tarayıcıda ekliyor, bu da sunucu çıktısıyla küçük bir fark yaratıyor.
    // Bu uyarıyı yalnızca burada susturmak next-themes'in önerdiği yöntem.
    <html
      lang="tr"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-fg">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
