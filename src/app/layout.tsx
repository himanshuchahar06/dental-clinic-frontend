import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LenisSmoothScroll from '../components/LenisSmoothScroll';
import AIChatbot from '../components/AIChatbot';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Aura Premium 3D Dental Clinic | Luxury Dental Care',
  description: 'Experience 8K aesthetic dentistry, digital veneers, bio-compatible implants, and Invisalign alignments at Aura Luxury Clinic.',
  keywords: 'aesthetic dentistry, porcelain veneers, dental implants, luxury dental clinic, beverly hills dentist, invisalign aligners',
  openGraph: {
    title: 'Aura Premium 3D Dental Clinic',
    description: 'Bespoke aesthetic dental treatments powered by 3D scans and micro-laser surgeries.',
    url: 'https://auradental.com',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=1200',
        width: 1200,
        height: 630,
        alt: 'Aura Luxury Clinical Suit',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aura Premium Dental Clinic',
    description: 'Ultra-realistic digital dentistry and reconstructive smile designs.',
  },
};

// --- Schema.org Structured SEO Data ---
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Dentist',
  'name': 'Aura Luxury Dental Clinic',
  'image': 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600',
  '@id': 'https://auradental.com/#dentist',
  'url': 'https://auradental.com',
  'telephone': '+13105550199',
  'priceRange': '$$$$',
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': '742 Evergreen Terrace',
    'addressLocality': 'Beverly Hills',
    'addressRegion': 'CA',
    'postalCode': '90210',
    'addressCountry': 'US',
  },
  'openingHoursSpecification': [
    {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      'opens': '09:00',
      'closes': '18:00',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased font-sans">
        <LenisSmoothScroll>
          <Navbar />
          <main className="min-h-screen pt-20">
            {children}
          </main>
          <Footer />
          <AIChatbot />
        </LenisSmoothScroll>
      </body>
    </html>
  );
}
