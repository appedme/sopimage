import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create AI Images | Free AI Image Generator - Unlimited & High Quality',
  description: 'Create stunning AI-generated images with 12+ powerful models including GPT-Image-1, DALL-E-3, Flux, and more. Free, unlimited, and high-quality image generation.',
  keywords: [
    'AI image generator',
    'create images',
    'DALL-E',
    'GPT-Image',
    'Flux',
    'artificial intelligence',
    'image creation',
    'free AI art',
    'AI art generator',
    'text to image',
    'AI artwork',
    'image synthesis'
  ],
  authors: [{ name: 'AI Image Generator Team' }],
  creator: 'AI Image Generator',
  publisher: 'AI Image Generator',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://yourapp.com'),
  alternates: {
    canonical: '/create',
  },
  openGraph: {
    title: 'Create AI Images | Free AI Image Generator',
    description: 'Create stunning AI-generated images with 12+ powerful models. Free, unlimited, and high-quality image generation.',
    url: 'https://yourapp.com/create',
    siteName: 'AI Image Generator',
    images: [
      {
        url: '/og-create.png',
        width: 1200,
        height: 630,
        alt: 'Create AI Images - Free AI Image Generator',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Create AI Images | Free AI Image Generator',
    description: 'Create stunning AI-generated images with 12+ powerful models. Free, unlimited, and high-quality image generation.',
    images: ['/og-create.png'],
    creator: '@yourusername',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};
