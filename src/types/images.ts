export interface ImageAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  placeholder?: string;
  srcSet?: string;
}

export interface ProductImage extends ImageAsset {
  productId: string;
  isPrimary?: boolean;
  order?: number;
}

export interface BannerImage extends ImageAsset {
  title?: string;
  link?: string;
}