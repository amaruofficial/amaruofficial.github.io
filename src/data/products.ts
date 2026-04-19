/**
 * AMARU PRODUCT ARCHIVE COMMAND CENTER
 * 
 * --- HOW TO MANUALLY ADD PRODUCTS & IMAGES VIA GITHUB ---
 * 
 * 1. FOLDER SETUP:
 *    - All product images should be placed in: /public/images/ (or you can create /public/assets/products/)
 *    - Example naming: "puffy-jacket-black.jpg", "beanie-limited.png"
 * 
 * 2. UPDATING THIS FILE:
 *    - Copy an existing product block below.
 *    - Update the 'id' (make it unique, e.g., "p3", "sh5").
 *    - Update 'image' path to match your folder (e.g., "/images/your-new-image.jpg").
 *    - Adjust 'price', 'category', and 'description'.
 * 
 * 3. CATEGORIES:
 *    - Ensure the 'category' matches one of the values in the 'categories' array at the bottom.
 * 
 * 4. GITHUB ACTION:
 *    - After uploading files and editing this script, commit and push to your repository.
 *    - GitHub Pages will automatically rebuild the site with your new drops.
 */

export const products = [
  // --- SWEATSHIRTS (750/-) ---
  {
    id: "s1",
    name: "Black Sweatshirt",
    price: 750,
    category: "SWEATSHIRTS",
    image: "/images/sweatshirt-black.png",
    badge: "BEST SELLER",
    rating: 4.8,
    reviews: 124,
    description: "Classic black sweatshirt. Heavyweight jersey for warmth and comfort. Perfect for lectures.",
    inStock: true,
    stockCount: 12,
    campusPickup: true,
    tags: ["essential", "campus"]
  },
  {
    id: "s2",
    name: "Navy Sweatshirt",
    price: 750,
    category: "SWEATSHIRTS",
    image: "/images/sweatshirt-navy.jpg",
    badge: "NEW",
    rating: 4.7,
    reviews: 89,
    description: "Deep navy blue sweatshirt. Soft inner lining for cold campus nights.",
    inStock: true,
    stockCount: 8,
    campusPickup: true
  },
  {
    id: "s3",
    name: "Grey Sweatshirt",
    price: 750,
    category: "SWEATSHIRTS",
    image: "/images/sweatshirt-grey.jpg",
    badge: null,
    rating: 4.6,
    reviews: 56,
    description: "Versatile grey sweatshirt. A campus classic for every wardrobe.",
    inStock: true,
    stockCount: 15,
    campusPickup: true
  },

  // --- CASUAL OFFICIAL (800/-) ---
  {
    id: "co1",
    name: "Official Grey Sweatshirt",
    price: 800,
    category: "OFFICIAL",
    image: "/images/official-eng.jpg",
    badge: "WORK READY",
    rating: 4.9,
    reviews: 156,
    description: "Premium casual official sweatshirt in grey. Sharp look for presentations or office work.",
    inStock: true,
    stockCount: 5,
    campusPickup: true
  },
  {
    id: "co2",
    name: "Official Black Sweatshirt",
    price: 800,
    category: "OFFICIAL",
    image: "/images/official-biz.jpg",
    badge: null,
    rating: 4.6,
    reviews: 92,
    description: "Structured official sweatshirt in jet black. Minimalist design for a professional edge.",
    inStock: true,
    stockCount: 15,
    campusPickup: true
  },

  // --- PUFFER & FLEECE (1500/- & 2000/-) ---
  {
    id: "p1",
    name: "Black Puffy Jacket",
    price: 1500,
    category: "OUTERWEAR",
    image: "/images/puffer-black.jpg",
    badge: "TOP PICK",
    rating: 4.7,
    reviews: 178,
    description: "Warm black puffy jacket. Lightweight yet insulated for maximum warmth.",
    inStock: true,
    stockCount: 6,
    campusPickup: true
  },
  {
    id: "p2",
    name: "Flame Puffy Jacket",
    price: 1800,
    category: "OUTERWEAR",
    image: "/images/puffer-flame.jpg",
    badge: "TRENDING",
    rating: 4.9,
    reviews: 45,
    description: "Distinctive flame design puffy jacket. Make a bold statement on campus.",
    inStock: true,
    stockCount: 3,
    campusPickup: true
  },
  {
    id: "f1",
    name: "Warm Fleece Jacket",
    price: 2000,
    category: "OUTERWEAR",
    image: "/images/fleece.jpg",
    badge: "ULTIMATE WARMTH",
    rating: 4.9,
    reviews: 203,
    description: "High-density fleece jacket. Keeps you warm during transitions and cold mornings.",
    inStock: true,
    stockCount: 7,
    campusPickup: true
  },

  // --- SHIRTS (900/- to 1200/-) ---
  {
    id: "sh1",
    name: "White Shirt",
    price: 950,
    category: "SHIRTS",
    image: "/images/shirt-white-plain.jpg",
    badge: "ESSENTIAL",
    rating: 4.8,
    reviews: 210,
    description: "Clean white shirt. Crisp cotton fabric, great for layering or wearing alone.",
    inStock: true,
    stockCount: 20,
    campusPickup: true
  },
  {
    id: "sh2",
    name: "Tropical Shirt",
    price: 1200,
    category: "SHIRTS",
    image: "/images/shirt-tropical.jpg",
    badge: null,
    rating: 4.7,
    reviews: 67,
    description: "Vibrant tropical patterned shirt. Light and breathable for warm days.",
    inStock: true,
    stockCount: 10,
    campusPickup: true
  },
  {
    id: "sh3",
    name: "Flannel Hooded Shirt",
    price: 1100,
    category: "SHIRTS",
    image: "/images/shirt-flannel-hood.jpg",
    badge: "STREETWEAR",
    rating: 4.9,
    reviews: 88,
    description: "Black and grey checked flannel shirt with an attached hood.",
    inStock: true,
    stockCount: 5,
    campusPickup: true
  },
  {
    id: "sh4",
    name: "Striped Shirt",
    price: 1000,
    category: "SHIRTS",
    image: "/images/shirt-striped-bw.jpg",
    badge: null,
    rating: 4.6,
    reviews: 34,
    description: "Vertically striped black and white shirt. Slim fit design.",
    inStock: true,
    stockCount: 12,
    campusPickup: true
  },

  // --- JEANS (1500/- to 2500/-) ---
  {
    id: "j1",
    name: "Simple Blue Jeans",
    price: 1500,
    category: "JEANS",
    image: "/images/jeans-blue-plain.jpg",
    badge: null,
    rating: 4.7,
    reviews: 145,
    description: "Classic blue denim jeans. Durable and comfortable for daily campus wear.",
    inStock: true,
    stockCount: 25,
    campusPickup: true
  },
  {
    id: "j2",
    name: "Black Ripped Jeans",
    price: 1800,
    category: "JEANS",
    image: "/images/jeans-black-ripped.jpg",
    badge: "POPULAR",
    rating: 4.8,
    reviews: 96,
    description: "Black slim-fit jeans with stylish rips at the knees.",
    inStock: true,
    stockCount: 10,
    campusPickup: true
  },
  {
    id: "j3",
    name: "Embroidered Jeans",
    price: 2500,
    category: "JEANS",
    image: "/images/jeans-embroidered.jpg",
    badge: "DESIGNER",
    rating: 5.0,
    reviews: 24,
    description: "Black jeans with red skeleton embroidery. A unique piece for the collection.",
    inStock: true,
    stockCount: 4,
    campusPickup: true
  },

  // --- BEANIES (300/-) ---
  {
    id: "b1",
    name: "Black Beanie",
    price: 300,
    category: "ACCESSORIES",
    image: "/images/beanie-black.jpg",
    badge: null,
    rating: 4.5,
    reviews: 267,
    description: "Soft-knit black beanie. Simple, effective, and warm.",
    inStock: true,
    stockCount: 40,
    campusPickup: true
  },
  {
    id: "b2",
    name: "Beanie Three-Pack",
    price: 800,
    category: "ACCESSORIES",
    image: "/images/beanie-pack.jpg",
    badge: "BUNDLE DEAL",
    rating: 4.9,
    reviews: 145,
    description: "Set of three beanies in core colors. Best value for students.",
    inStock: true,
    stockCount: 18,
    campusPickup: true
  },

  // --- SNEAKERS (2500/- to 4500/-) ---
  {
    id: "sn1",
    name: "White Sneakers",
    price: 2500,
    category: "FOOTWEAR",
    image: "/images/sneaker-white.jpg",
    badge: "CLEAN",
    rating: 4.7,
    reviews: 98,
    description: "Pristine white canvas sneakers. Lightweight and easy to style.",
    inStock: true,
    stockCount: 9,
    campusPickup: false
  },
  {
    id: "sn2",
    name: "Retro Sneakers",
    price: 3500,
    category: "FOOTWEAR",
    image: "/images/sneaker-retro.jpg",
    badge: "PREMIUM",
    rating: 4.8,
    reviews: 76,
    description: "Vintage inspired leather sneakers. High durability for long walks.",
    inStock: true,
    stockCount: 12,
    campusPickup: false
  }
];

export const categories = [
  "ALL DROPS",
  "CAMPUS ESSENTIALS",
  "UNDER 1K",
  "SWEATSHIRTS",
  "JEANS",
  "SHIRTS",
  "OUTERWEAR",
  "FOOTWEAR",
  "ACCESSORIES"
];
