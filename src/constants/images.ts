import { ImageAsset, BannerImage } from '../types/images';

export const IMAGES = {
  logo: {
    src: '/images/logo.png',
    alt: 'AMARU Logo',
    width: 32,
    height: 32,
  } as ImageAsset,

  hero: {
    src: '/images/hero-banner.jpg',
    alt: 'AMARU Premium Streetwear',
    width: 1920,
    height: 600,
  } as BannerImage,

  productPlaceholder: {
    src: '/images/product-placeholder.png',
    alt: 'Product Image Not Found',
    width: 400,
    height: 500,
  } as ImageAsset,

  about: {
    src: 'https://images.unsplash.com/photo-1544022613-e879a7935ed9?q=80&w=2000',
    alt: 'About AMARU',
    width: 2000,
    height: 1200,
  } as ImageAsset,

  loginBg: {
    src: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1200&auto=format&fit=crop',
    alt: 'Security Background',
    width: 1200,
    height: 800,
  } as ImageAsset,
} as const;

export const GALLERY_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=400&auto=format&fit=crop',
    alt: 'Gallery Image 1',
  },
  {
    src: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=400&auto=format&fit=crop',
    alt: 'Gallery Image 2',
  },
  {
    src: 'https://images.unsplash.com/photo-1523398363243-ce9bbbd06948?q=80&w=400&auto=format&fit=crop',
    alt: 'Gallery Image 3',
  },
  {
    src: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=400&auto=format&fit=crop',
    alt: 'Gallery Image 4',
  },
];