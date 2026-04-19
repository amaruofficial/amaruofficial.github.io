import React, { useState } from 'react';
import { ProductImage } from '../types/images';
import OptimizedImage from './OptimizedImage';
import { motion } from 'motion/react';

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images, productName }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const selectedImage = images[selectedImageIndex] || images[0];

  if (!images || images.length === 0) {
    return (
      <div className="bg-neutral-900 rounded-lg overflow-hidden aspect-square flex items-center justify-center">
        <p className="text-neutral-600">No images available</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-4"
    >
      <div className="bg-neutral-900 rounded-lg overflow-hidden aspect-square relative group">
        <OptimizedImage
          image={selectedImage}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={``
                flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden
                transition-all ${
                  index === selectedImageIndex
                    ? 'border-[#0096ff] shadow-lg shadow-[#0096ff]/40'
                    : 'border-neutral-700 hover:border-neutral-600'
                }
              ``}
            >
              <OptimizedImage
                image={image}
                className="w-full h-full object-cover"
              />
            </motion.button>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ProductGallery;