import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/ui/CartDrawer';
import WishlistDrawer from '@/components/ui/WishlistDrawer';
import FloatingActions from '@/components/layout/FloatingActions';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "L'Art du Parfum | Haute Parfumerie & Flacons de Luxe",
    template: "%s | L'Art du Parfum Paris",
  },
  description:
    "Boutique en ligne d'exception dédiée aux fragrances de haute parfumerie. Retrouvez Dior, Chanel, Tom Ford, Creed, Guerlain et nos collections exclusives.",
  keywords: [
    'Parfum de luxe',
    'Haute parfumerie',
    'Dior Sauvage',
    'Bleu de Chanel',
    'Creed Aventus',
    'Tom Ford Oud Wood',
    'Baccarat Rouge 540',
    'Parfum homme',
    'Parfum femme',
    'Parfum unisexe',
  ],
  authors: [{ name: "L'Art du Parfum Paris" }],
  creator: "L'Art du Parfum",
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://lartduparfum-luxe.com',
    title: "L'Art du Parfum | Haute Parfumerie & Flacons de Luxe",
    description: "Boutique en ligne d'exception dédiée aux fragrances de haute parfumerie.",
    siteName: "L'Art du Parfum Paris",
    images: [
      {
        url: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: "L'Art du Parfum Flacon de Luxe",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "L'Art du Parfum | Haute Parfumerie",
    description: "Boutique d'exception de parfums de luxe.",
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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'PerfumeStore',
    name: "L'Art du Parfum Paris",
    image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=1200&q=80',
    url: 'https://lartduparfum-luxe.com',
    telephone: '+33 1 42 68 00 00',
    priceRange: '€€€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '12 Place Vendôme',
      addressLocality: 'Paris',
      postalCode: '75001',
      addressCountry: 'FR',
    },
  };

  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased selection:bg-[#D4AF37] selection:text-[#111111]">
        <ThemeProvider>
          <CartProvider>
            <WishlistProvider>
              <Navbar />
              <main>{children}</main>
              <Footer />
              <CartDrawer />
              <WishlistDrawer />
              <FloatingActions />
            </WishlistProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
