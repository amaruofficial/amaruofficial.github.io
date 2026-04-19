import React, { useState } from 'react';
import { ImageAsset } from '../types/images';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  image: ImageAsset;
  isLazy?: boolean;
  onError?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  image,
  isLazy = true,
  onError,
  className = '',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
    console.warn(`Image failed to load: ${image.src}`);
    onError?.();
  };

  return (
    <img
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      srcSet={image.srcSet}
      loading={isLazy ? 'lazy' : 'eager'}
      onLoad={() => setIsLoaded(true)}
      onError={handleError}
      className={`
        ${className}
        ${isLoaded ? 'opacity-100' : 'opacity-0'}
        ${hasError ? 'bg-neutral-800' : ''}
        transition-opacity duration-300
      `}
      {...props}
    />
  );
};

export default OptimizedImage;