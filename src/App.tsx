import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  ChevronRight, 
  Instagram, 
  MessageCircle, 
  ArrowRight, 
  Plus, 
  Zap, 
  Package, 
  Crown, 
  Sparkles, 
  Shirt, 
  Award, 
  Camera, 
  Moon, 
  Sun,
  LogOut,
  Search,
  Heart,
  Filter,
  Truck,
  Youtube,
  Facebook,
  Twitter,
  ChevronDown,
  LayoutGrid,
  MapPin,
  Clock,
  ExternalLink,
  ShieldCheck,
  Star,
  Mail,
  Phone,
  Gem,
  CheckCircle
} from 'lucide-react';

// --- Types ---

type View = 'login' | 'customer' | 'admin' | 'shop' | 'about' | 'contact' | 'projects' | 'wishlist';

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Hoodies' | 'T-Shirts' | 'Outerwear' | 'Bottoms' | 'Accessories' | 'Signature';
  badge?: string;
  description: string;
  image: string;
  secondaryImage?: string; // Hover editorial view
  moreImages?: string[];
  isNew?: boolean;
  rating?: number;
  reviews?: Review[];
}

interface CartItem extends Product {
  quantity: number;
}

interface Order {
  id: string;
  customerName: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  trackingNumber?: string;
  courier?: string;
  milestones?: { date: string; status: string; description: string; }[];
  date: string;
}

// --- Constants ---

const BRAND_GRADIENT = "from-[#0096ff] to-[#00d4ff]";
const BRAND_TEXT = "text-[#0096ff]";

const MEDIA = {
  hero: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1200&auto=format&fit=crop",
  products: [
    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1576566582418-d0f50ec437e6?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop"
  ],
  gallery: [
    "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1523398363243-ce9bbbd06948?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=400&auto=format&fit=crop"
  ]
};

// --- Mock Data Based on Uploaded Images ---

const SAMPLE_PRODUCTS: Product[] = [
  // Signature & Grails
  {
    id: 'sig-1',
    name: 'AMARU "Masterpiece" Trench',
    price: 18500,
    category: 'Signature',
    badge: 'Grail',
    description: 'Double-breasted oversized wool coat with laser-etched silk lining. Crafted for those who define the future of fashion. Museum quality piece. The fit is perfect.',
    image: 'https://images.unsplash.com/photo-1544022613-e879a7935ed9?q=80&w=1200',
    secondaryImage: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1200',
    moreImages: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1200',
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1200'
    ],
    isNew: true,
    rating: 5.0,
    reviews: [
      { id: 'r1', userName: '@urban_king', rating: 5, comment: 'Museum quality piece. The fit is perfect.', date: 'APR 12, 2026' },
      { id: 'r2', userName: 'Kim_A', rating: 5, comment: 'Worth every shilling. Incredible detail.', date: 'MAR 28, 2026' }
    ]
  },
  {
    id: 'sig-2',
    name: 'Exquisite Leather Biker',
    price: 24000,
    category: 'Signature',
    badge: 'Limited',
    description: 'Italian full-grain leather with Nairobi-cast silver hardware. Each fragment is unique to its owner.',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1200',
    secondaryImage: 'https://images.unsplash.com/photo-1520975661595-6453be3f7070?q=80&w=1200',
    moreImages: [
      'https://images.unsplash.com/photo-1517441530263-633008779ef3?q=80&w=1200',
      'https://images.unsplash.com/photo-1549439602-43ebcb232811?q=80&w=1200'
    ],
    rating: 5.0,
    reviews: [
      { id: 'r3', userName: 'D. Njeri', rating: 5, comment: 'The cut is revolutionary.', date: 'FEB 15, 2026' },
      { id: 'r4', userName: 'Alex_V', rating: 4, comment: 'Premium leather, slightly tight fit but looks incredible.', date: 'JAN 20, 2026' }
    ]
  },

  // Hoodies
  {
    id: 'hood-1',
    name: 'Shadow Box Hoodie',
    price: 4500,
    category: 'Hoodies',
    badge: 'Best Seller',
    description: '450GSM ultra-heavy cotton. Boxy fit, drop shoulder. Designed for the urban silhouette.',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1200',
    secondaryImage: 'https://images.unsplash.com/photo-1556821896-0e104192b67d?q=80&w=1200',
    isNew: true,
    rating: 4.8,
    reviews: [
      { id: 'r5', userName: 'Mike_T', rating: 5, comment: 'Heaviest hoodie I own. Unreal quality.', date: 'MAY 02, 2026' }
    ]
  },
  {
    id: 'hood-2',
    name: 'Neon Rebel Pullover',
    price: 4200,
    category: 'Hoodies',
    description: 'Cyan glow screenprint on jet black base. Ribbed cuffs.',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600&auto=format&fit=crop',
    rating: 4.7
  },
  {
    id: 'hood-3',
    name: 'Acid Wash Archive',
    price: 5200,
    category: 'Hoodies',
    badge: 'Vintage',
    description: 'Hand-distressed finish. Every piece is unique.',
    image: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=600&auto=format&fit=crop',
    rating: 4.9
  },

  // T-Shirts
  {
    id: 'tee-1',
    name: 'Genesis Graphic Tee',
    price: 2800,
    category: 'T-Shirts',
    badge: 'Signature',
    description: '240GSM combed cotton with back puff-print.',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop',
    isNew: true,
    rating: 4.8
  },
  {
    id: 'tee-2',
    name: 'Minimal Logo Basic',
    price: 2200,
    category: 'T-Shirts',
    description: 'Embroidered AMARU crest on heavy jersey.',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600&auto=format&fit=crop',
    rating: 4.6
  },
  {
    id: 'tee-3',
    name: 'Concrete Jungle Oversize',
    price: 3200,
    category: 'T-Shirts',
    badge: 'Hot Drop',
    description: 'Brutalist typography inspired by Nairobi architecture.',
    image: 'https://images.unsplash.com/photo-1576566582418-d0f50ec437e6?q=80&w=600&auto=format&fit=crop',
    rating: 4.7
  },
  {
    id: 'tee-4',
    name: 'Pharaoh Spirit Tee',
    price: 2900,
    category: 'T-Shirts',
    description: 'Gold foil accents on charcoal grey.',
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=600&auto=format&fit=crop',
    rating: 4.8
  },

  // Outerwear
  {
    id: 'out-1',
    name: 'Nightshade Bomber',
    price: 8500,
    category: 'Outerwear',
    badge: 'Essential',
    description: 'Water-resistant tech nylon with orange lining.',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop',
    rating: 4.9
  },
  {
    id: 'out-2',
    name: 'Campus Varsity 2.0',
    price: 9200,
    category: 'Outerwear',
    badge: 'Popular',
    description: 'Satin finish with quilted interior. University exclusive.',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600&auto=format&fit=crop',
    rating: 4.7
  },
  {
    id: 'out-3',
    name: 'Desert Storm Windbreaker',
    price: 6800,
    category: 'Outerwear',
    description: 'Lightweight packable shell for unpredictable weather.',
    image: 'https://images.unsplash.com/photo-1504191467641-083bc75373a7?q=80&w=600&auto=format&fit=crop',
    rating: 4.6
  },

  // Bottoms
  {
    id: 'bot-1',
    name: 'Archive Stacked Denim',
    price: 6500,
    category: 'Bottoms',
    badge: 'New Fit',
    description: '14oz Japanese selvedge. Extra length for stacking.',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=600&auto=format&fit=crop',
    rating: 4.9
  },
  {
    id: 'bot-2',
    name: 'Urban Cargo V3',
    price: 5800,
    category: 'Bottoms',
    description: '8-pocket utility pants with velcro straps.',
    image: 'https://images.unsplash.com/photo-1624371414361-e6e8ea01c1e6?q=80&w=600&auto=format&fit=crop',
    rating: 4.5
  },
  {
    id: 'bot-3',
    name: 'Luxury Lounge Sweats',
    price: 4500,
    category: 'Bottoms',
    badge: 'Comfort',
    description: 'French terry with invisible zipper pockets.',
    image: 'https://images.unsplash.com/photo-1580906853203-f493cea9ff28?q=80&w=600&auto=format&fit=crop',
    rating: 4.8
  },
  {
    id: 'bot-4',
    name: 'Distressed Skinny',
    price: 5200,
    category: 'Bottoms',
    description: 'Super-stretch black denim with hand-cut rips.',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=600&auto=format&fit=crop',
    rating: 4.7
  },

  // Accessories
  {
    id: 'acc-1',
    name: 'Nairobi Trucker Cap',
    price: 1800,
    category: 'Accessories',
    badge: 'Classic',
    description: '3D embroidered crest with mesh back.',
    image: 'https://images.unsplash.com/photo-1588850567047-1845a9ee02f9?q=80&w=600&auto=format&fit=crop',
    rating: 4.5
  },
  {
    id: 'acc-2',
    name: 'Signature Utility Bag',
    price: 3500,
    category: 'Accessories',
    description: 'Cross-body nylon bag with metallic buckle.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop',
    rating: 4.6
  },
  {
    id: 'acc-3',
    name: 'Iconic Bucket Hat',
    price: 2200,
    category: 'Accessories',
    badge: 'Summer',
    description: 'Reversible velvet and denim finish.',
    image: 'https://images.unsplash.com/photo-1565839630761-e60932204ccb?q=80&w=600&auto=format&fit=crop',
    rating: 4.3
  },
  {
    id: 'acc-4',
    name: 'Solar Shade V1',
    price: 4800,
    category: 'Accessories',
    badge: 'Premium',
    description: 'Acetate frame with polarized cyan lenses.',
    image: 'https://images.unsplash.com/photo-1511499767390-91f99f73948c?q=80&w=600&auto=format&fit=crop',
    rating: 4.8
  }
];

const PROJECTS = [
  {
    id: 'p1',
    title: 'Midnight in Nairobi',
    year: '2024',
    description: 'A cinematic lookbook documenting the nocturnal pulse of the city.',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'p2',
    title: 'Archive Series: Denim',
    year: '2023',
    description: 'Restructuring vintage textures into modern architectural silhouettes.',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800&auto=format&fit=crop'
  }
];

// --- Shared Components ---

// --- Shared Components ---

/**
 * FOOTER COMPONENT
 * Design Principle: Professionalism & Clarity
 */
const Footer = ({ onPageChange }: { onPageChange: (v: View) => void }) => {
  return (
    <footer className="pt-32 pb-48 px-6 border-t bg-black border-white/5 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0096ff]/5 blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
        {/* Brand Info */}
        <div className="space-y-8">
          <button onClick={() => onPageChange('customer')} className="flex flex-col items-start gap-1 group">
            <span className={`text-4xl font-black bg-gradient-to-r ${BRAND_GRADIENT} bg-clip-text text-transparent tracking-[0.2em] leading-none transition-all group-hover:tracking-[0.25em] italic`}>
              AMARU
            </span>
            <span className="text-[10px] uppercase font-black tracking-[0.4em] text-neutral-500">Exquisite $$ Embraced</span>
          </button>
          <p className="text-neutral-500 font-light leading-relaxed max-w-sm text-sm">
            Revolutionary street luxury designed to empower identity and confidence. High-quality craftsmanship for those who define the culture.
          </p>
          <div className="flex gap-4">
            {[
              { icon: <Instagram size={18} />, link: "#", color: "hover:bg-gradient-to-tr hover:from-purple-500 hover:to-orange-500" },
              { icon: <Facebook size={18} />, link: "#", color: "hover:bg-[#1877F2]" },
              { icon: <MessageCircle size={18} />, link: "https://tiktok.com", color: "hover:bg-black" } // Using MessageCircle as placeholder for TikTok if icon not avail
            ].map((social, idx) => (
              <button key={idx} className={`w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-all ${social.color} shadow-xl`}>
                {social.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <div className="micro-label mb-10 text-white">Quick Links</div>
          <ul className="space-y-6">
            {['Home', 'Shop', 'About', 'Contact'].map((item) => (
              <li key={item}>
                <button 
                  onClick={() => onPageChange(item.toLowerCase() as View)}
                  className="text-neutral-500 hover:text-[#0096ff] font-black text-[11px] uppercase tracking-[0.3em] transition-all"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Details */}
        <div>
          <div className="micro-label mb-10 text-white">Contact Details</div>
          <ul className="space-y-6">
            <li className="flex items-center gap-4 group">
               <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#0096ff]"><Phone size={16} /></div>
               <div>
                  <div className="text-[9px] uppercase font-black text-neutral-600 mb-0.5">Phone</div>
                  <div className="text-[11px] font-black text-white">+254 746 746904</div>
               </div>
            </li>
            <li className="flex items-center gap-4 group">
               <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#0096ff]"><Mail size={16} /></div>
               <div>
                  <div className="text-[9px] uppercase font-black text-neutral-600 mb-0.5">Email</div>
                  <div className="text-[11px] font-black text-white uppercase tracking-tight">info@amaruofficial.com</div>
               </div>
            </li>
            <li className="flex items-center gap-4 group">
               <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#0096ff]"><MapPin size={16} /></div>
               <div>
                  <div className="text-[9px] uppercase font-black text-neutral-600 mb-0.5">Location</div>
                  <div className="text-[11px] font-black text-white">Kenya</div>
               </div>
            </li>
          </ul>
        </div>

        {/* Branding Message */}
        <div>
          <div className="micro-label mb-10 text-white">The Studio</div>
          <div className="bg-neutral-900/50 p-8 rounded-[2rem] border border-white/5">
             <p className="text-[11px] text-neutral-400 font-bold uppercase tracking-[0.2em] leading-relaxed mb-6">
               Need a website like this?
             </p>
             <a 
               href="https://macreativesstudio.github.io" 
               target="_blank" 
               rel="noopener noreferrer"
               className="inline-flex items-center gap-3 text-[#0096ff] font-black uppercase text-[10px] tracking-[0.3em] hover:tracking-[0.35em] transition-all"
             >
               Talk to Ma Creatives Studio <ArrowRight size={14} />
             </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-neutral-600">
          © 2026 AMARU OFFICIAL. All Rights Reserved.
        </p>
        <div className="flex items-center gap-4">
          <span className="text-[9px] font-black uppercase tracking-widest text-neutral-800">AMARU / ACCESS / GRIT</span>
        </div>
      </div>
    </footer>
  );
};

const Navbar = ({ onViewChange, currentView, onSearchOpen, wishlistCount }: { 
  onViewChange: (v: View) => void, 
  currentView: View,
  onSearchOpen: () => void,
  wishlistCount: number
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'customer', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    if (newTheme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/90 backdrop-blur-md py-4 border-b border-white/5 shadow-2xl shadow-black/50' 
        : 'bg-black py-8 border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Left Side: Brand Identity */}
        <button onClick={() => onViewChange('customer')} className="flex flex-col items-start gap-1 group">
          <span className={`text-2xl font-black bg-gradient-to-r ${BRAND_GRADIENT} bg-clip-text text-transparent tracking-[0.2em] leading-none transition-all group-hover:tracking-[0.25em]`}>
            AMARU
          </span>
          <span className="text-[9px] uppercase font-black tracking-[0.4em] text-neutral-400">Exquisite $$ Embraced</span>
        </button>

        {/* Center: Navigation */}
        <div className="hidden md:flex gap-12 items-center">
          {navLinks.map((link, idx) => (
            <button 
              key={`${link.id}-${idx}`}
              onClick={() => onViewChange(link.id as View)}
              className={`text-[10px] font-black tracking-[0.4em] transition-all uppercase relative group ${
                currentView === link.id ? BRAND_TEXT : 'text-neutral-500 hover:text-white'
              }`}
            >
              {link.label}
              <span className={`absolute -bottom-2 left-0 h-0.5 bg-[#0096ff] transition-all duration-300 ${currentView === link.id ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </button>
          ))}
        </div>

        {/* Right Side: Utils */}
        <div className="flex items-center gap-3 md:gap-6">
          <button 
            onClick={() => window.open('https://wa.me/254746746904', '_blank')}
            className="hidden sm:flex items-center gap-2 bg-[#25D366]/10 text-[#25D366] px-5 py-2.5 rounded-full border border-[#25D366]/20 text-[9px] font-black uppercase tracking-widest hover:bg-[#25D366] hover:text-white transition-all shadow-lg active:scale-95"
          >
            <MessageCircle size={14} /> WhatsApp
          </button>
          
          <button 
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-neutral-800 transition-all text-neutral-400 hover:text-white border border-white/5"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button 
            onClick={onSearchOpen}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-neutral-800 transition-all text-neutral-400 hover:text-white border border-white/5"
          >
            <Search size={18} />
          </button>
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center bg-neutral-900 border border-neutral-800 text-white"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-t border-white/5 overflow-hidden"
          >
            <div className="p-10 flex flex-col gap-8">
              {navLinks.map((link, idx) => (
                <button 
                  key={`mobile-${link.id}-${idx}`}
                  onClick={() => {
                    onViewChange(link.id as View);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-2xl font-black uppercase tracking-tighter italic text-left ${currentView === link.id ? 'text-[#0096ff]' : 'text-neutral-500'}`}
                >
                  {link.label}
                </button>
              ))}
              <hr className="border-white/5" />
              <button 
                onClick={() => {
                   onViewChange('login');
                   setIsMobileMenuOpen(false);
                }}
                className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-600 hover:text-[#0096ff] transition-colors self-start"
              >
                Access Nexus Portal
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- View Components ---

const LoginView = ({ onLogin }: { onLogin: (role: 'customer' | 'admin') => void, key?: string }) => {
  const [isEncrypted, setIsEncrypted] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');

  const handlePortalAccess = () => {
    if (accessCode === 'secure_password_2024') {
      onLogin('admin');
    } else {
      setError('ACCESS DENIED: INVALID KEY');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black overflow-hidden flex items-center justify-center font-mono">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        <img 
          src={MEDIA.hero} 
          className="w-full h-full object-cover opacity-10 grayscale brightness-50"
          alt="Security Background"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent" />
        {/* Animated Grid Line Overlay */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-lg w-full mx-6 p-1 bg-gradient-to-b from-[#0096ff]/20 to-transparent rounded-[2rem]"
      >
        <div className="bg-neutral-950/80 backdrop-blur-2xl rounded-[1.9rem] p-10 border border-white/5 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
             <div className={`w-2 h-2 rounded-full ${isEncrypted ? 'bg-green-500' : 'bg-[#0096ff] animate-pulse shadow-[0_0_10px_#0096ff]'}`} />
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-black italic tracking-tighter mb-2 text-gradient">ADMIN ACCESS</h1>
            <p className="text-[10px] uppercase font-black tracking-[0.4em] text-neutral-600">Encrypted Management Terminal</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[9px] uppercase font-black tracking-widest text-neutral-500 ml-1">Identity Token</label>
              <input 
                type="text" 
                placeholder="ADMINISTRATOR ID"
                className="w-full bg-black/40 border border-white/5 rounded-xl px-6 py-5 text-xs font-black tracking-widest focus:border-[#0096ff]/40 outline-none transition-all placeholder:text-neutral-800"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[9px] uppercase font-black tracking-widest text-neutral-500 ml-1">Access Fragment</label>
              <div className="relative">
                <input 
                  type="password" 
                  autoFocus
                  placeholder="••••••••••••"
                  className={`w-full bg-black/40 border ${error ? 'border-red-500/50' : 'border-white/5'} rounded-xl px-6 py-5 text-xs font-black tracking-widest focus:border-[#0096ff]/40 outline-none transition-all placeholder:text-neutral-800`}
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handlePortalAccess()}
                />
              </div>
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[9px] font-black text-red-500 text-center tracking-widest uppercase"
              >
                {error}
              </motion.p>
            )}
            
            <button 
              onClick={handlePortalAccess}
              className="w-full group relative py-6 bg-white text-black rounded-xl overflow-hidden font-black text-[10px] uppercase tracking-[0.4em] transition-all hover:bg-[#0096ff] hover:text-white"
            >
              <span className="relative z-10">Bypass Protocol</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#0096ff] to-[#00d4ff] opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            <button 
              onClick={() => onLogin('customer')}
              className="w-full py-4 text-neutral-600 hover:text-neutral-400 font-black text-[9px] uppercase tracking-[0.3em] transition-all"
            >
              Abord Transmission
            </button>
          </div>

          <div className="mt-12 flex justify-between items-center opacity-20">
             <div className="w-8 h-[1px] bg-white" />
             <div className="text-[8px] font-black tracking-widest uppercase">System Core v4.0.2</div>
             <div className="w-8 h-[1px] bg-white" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const QuickViewModal = ({ 
  product, 
  isOpen, 
  onClose, 
  onAdd, 
  onToggleWishlist, 
  isWishlisted 
}: { 
  product: Product | null, 
  isOpen: boolean, 
  onClose: () => void, 
  onAdd: (p: Product) => void,
  onToggleWishlist: (id: string) => void,
  isWishlisted: boolean
}) => {
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-[#050505] border border-neutral-800 w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-[2rem] md:rounded-[4rem] relative shadow-[0_0_100px_rgba(0,150,255,0.1)]"
          >
            <button 
              onClick={onClose}
              className="absolute top-8 right-8 z-10 p-4 bg-white/5 hover:bg-white/10 rounded-full transition-all text-white"
            >
              <X size={24} />
            </button>

            <div className="grid lg:grid-cols-2 gap-12 md:gap-20 p-8 md:p-20">
              <div className="space-y-6">
                 <div className="aspect-[4/5] rounded-[2rem] overflow-hidden border border-neutral-800 p-1 bg-neutral-900 group">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                 </div>
                 <div className="grid grid-cols-4 gap-4">
                    {[product.image, product.secondaryImage, ...(product.moreImages || [])].filter(Boolean).slice(0, 4).map((img, i) => (
                      <div key={i} className="aspect-square rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900 cursor-pointer hover:border-[#0096ff] transition-all">
                        <img src={img} alt="" className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" />
                      </div>
                    ))}
                 </div>
              </div>

              <div className="flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="micro-label mb-4 text-[#0096ff]">{product.category}</div>
                    <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none mb-4">{product.name}</h2>
                  </div>
                  <button 
                    onClick={() => onToggleWishlist(product.id)}
                    className={`p-5 rounded-full backdrop-blur-xl border border-white/5 transition-all
                      ${isWishlisted ? 'bg-[#0096ff] text-white shadow-lg' : 'bg-black/40 text-white hover:scale-110 hover:bg-neutral-800'}`}
                  >
                    <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} strokeWidth={isWishlisted ? 0 : 2} />
                  </button>
                </div>

                <div className="flex items-center gap-6 mb-12">
                   <div className="text-4xl font-black italic tracking-tighter uppercase whitespace-nowrap">Ksh {product.price.toLocaleString()}</div>
                   <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                      <Star size={16} className="text-yellow-400" fill="currentColor" />
                      <span className="text-sm font-black">{product.rating || '4.8'}</span>
                      <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest ml-2">{product.reviews?.length || '12'} Reviews</span>
                   </div>
                </div>

                <p className="text-neutral-500 text-lg leading-relaxed font-light mb-12">
                  {product.description}
                </p>

                <div className="space-y-4 mb-20">
                  <div className="micro-label opacity-40">Identity Dimensions</div>
                  <div className="flex gap-4">
                    {['S', 'M', 'L', 'XL'].map(s => (
                      <button key={s} className="w-16 h-16 rounded-2xl border border-neutral-800 hover:border-[#0096ff] transition-all font-black text-xs hover:text-white text-neutral-600">
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => { onAdd(product); onClose(); }}
                  className="bg-white text-black py-6 rounded-[2rem] font-black uppercase text-[10px] tracking-[0.4em] hover:bg-[#0096ff] hover:text-white transition-all shadow-2xl shadow-[#0096ff]/20 flex items-center justify-center gap-4 active:scale-95 mt-auto"
                >
                  Acquire Specimen <ShoppingBag size={18} />
                </button>
              </div>
            </div>

            {/* Review Section */}
            <div className="border-t border-neutral-800 p-8 md:p-20 bg-neutral-900/30">
               <div className="flex justify-between items-end mb-12">
                  <div>
                    <div className="micro-label mb-4 opacity-50">Transmissions</div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter italic">Vocal Feedback</h3>
                  </div>
                  <button className="text-[9px] font-black uppercase text-[#0096ff] tracking-[0.4em] hover:text-white transition-all">Submit Review</button>
               </div>

               <div className="grid md:grid-cols-2 gap-8">
                  {(product.reviews || []).length > 0 ? (
                    product.reviews?.map((review) => (
                      <div key={review.id} className="bg-black/40 border border-neutral-800 p-8 rounded-[2rem]">
                        <div className="flex justify-between items-center mb-4">
                          <div className="font-black text-sm uppercase italic tracking-widest">{review.userName}</div>
                          <div className="flex gap-1">
                            {[1,2,3,4,5].map(i => (
                              <Star key={i} size={10} className={i <= review.rating ? "text-yellow-400" : "text-neutral-800"} fill="currentColor" />
                            ))}
                          </div>
                        </div>
                        <p className="text-neutral-500 text-sm italic font-light leading-relaxed mb-4">"{review.comment}"</p>
                        <div className="text-[8px] font-mono text-neutral-800 uppercase tracking-widest">{review.date}</div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 py-12 text-center opacity-30 border border-dashed border-neutral-800 rounded-[2rem]">
                       <p className="text-[10px] font-black uppercase tracking-[0.4em]">Awaiting First Transmission</p>
                    </div>
                  )}
               </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const SearchOverlay = ({ isOpen, onClose, query, setQuery }: { isOpen: boolean, onClose: () => void, query: string, setQuery: (q: string) => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col p-6 md:p-20"
        >
          <div className="max-w-4xl mx-auto w-full">
            <div className="flex justify-between items-center mb-12">
               <span className="micro-label">Search Archive</span>
               <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-full transition-all">
                  <X size={32} />
               </button>
            </div>
            <div className="relative">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-neutral-500" size={32} />
              <input 
                autoFocus
                type="text" 
                placeholder="TYPE TO UNLOCK..."
                className="w-full bg-transparent border-b-2 border-neutral-800 focus:border-[#0096ff] py-8 pl-14 text-2xl md:text-5xl font-black uppercase tracking-tighter outline-none transition-all placeholder:text-neutral-900"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <span className="micro-label opacity-40">Suggestions:</span>
              {['Signature', 'Hoodies', 'Nairobi', 'Archive'].map(s => (
                <button 
                  key={s} 
                  onClick={() => setQuery(s)}
                  className="text-[10px] font-black uppercase tracking-widest text-[#0096ff] hover:text-white"
                >
                  #{s}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ProjectsView = () => {
  return (
    <section className="pt-32 md:pt-48 pb-20 md:pb-32 px-4 md:px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="micro-label mb-6">Archive</div>
        <h1 className="text-5xl md:text-8xl font-black mb-20 uppercase italic tracking-tighter">PROJECTS</h1>
        <div className="grid gap-20">
          {PROJECTS.map((project, idx) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-24 items-center`}
            >
              <div className="flex-1 w-full aspect-[4/3] overflow-hidden rounded-[3rem] border border-neutral-800 relative group">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-10 left-10">
                   <div className="text-4xl font-black italic uppercase tracking-tighter">{project.year}</div>
                </div>
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-4xl md:text-6xl font-black uppercase italic mb-8 tracking-tighter">{project.title}</h3>
                <p className="text-neutral-500 text-xl leading-relaxed font-light mb-12">{project.description}</p>
                <button className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-[#0096ff] hover:text-white transition-colors">
                  View Entry <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WishlistView = ({ products, onAdd, onToggleWishlist, onQuickView }: { products: Product[], onAdd: (p: Product) => void, onToggleWishlist: (id: string) => void, onQuickView: (p: Product) => void }) => {
  return (
    <section className="pt-32 md:pt-48 pb-20 md:pb-32 px-4 md:px-6 min-h-screen">
      <div className="max-w-7xl mx-auto text-center md:text-left">
        <div className="micro-label mb-6">Personal Collection</div>
        <h1 className="text-5xl md:text-8xl font-black mb-20 uppercase italic tracking-tighter">YOUR <span className="text-gradient">VAULT</span></h1>
        
        {products.length === 0 ? (
          <div className="py-20 text-center">
            <div className="w-24 h-24 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto mb-8 shadow-inner">
               <Heart size={40} className="text-neutral-700 animate-pulse" />
            </div>
            <p className="text-xl font-light uppercase tracking-widest text-neutral-500 mb-8 max-w-xs mx-auto">Your collection vault is currently empty.</p>
            <button 
              onClick={() => window.location.href = '#shop'} 
              className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0096ff] hover:text-white border border-[#0096ff]/30 px-8 py-4 rounded-full transition-all"
            >
              Explore Shop
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAdd={onAdd} 
                onToggleWishlist={onToggleWishlist} 
                isWishlisted={true}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
const CartDrawer = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQty, 
  onCheckout 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  items: CartItem[], 
  onUpdateQty: (id: string, delta: number) => void,
  onCheckout: () => void
}) => {
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-neutral-900 z-[101] border-l border-neutral-800 flex flex-col"
          >
            <div className="p-8 border-b border-neutral-800 flex justify-between items-center">
               <div className="flex items-center gap-3">
                  <ShoppingBag size={20} className="text-[#0096ff]" />
                  <h3 className="font-black tracking-widest uppercase text-sm">Your Bag</h3>
               </div>
               <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-all">
                  <X size={24} />
               </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-8 shadow-inner">
                     <ShoppingBag size={32} className="text-neutral-700 animate-pulse" />
                  </div>
                  <p className="text-xl font-light uppercase tracking-widest text-neutral-500 mb-8 max-w-[200px]">Your archive is silent.</p>
                  <button 
                    onClick={onClose} 
                    className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0096ff] hover:text-white border border-[#0096ff]/30 px-8 py-4 rounded-full transition-all"
                  >
                    Scout Drops
                  </button>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.id} className="flex gap-4 group">
                    <img src={item.image} className="w-24 h-32 object-cover rounded-2xl border border-neutral-800" alt="" />
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <h4 className="font-black uppercase text-xs tracking-tight mb-1">{item.name}</h4>
                        <div className="text-[10px] text-[#0096ff] font-bold uppercase tracking-widest">Ksh {item.price.toLocaleString()}</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => onUpdateQty(item.id, -1)}
                          className="w-10 h-10 rounded-xl border border-neutral-800 flex items-center justify-center hover:bg-white/5"
                        >
                          <ArrowRight size={14} className="rotate-180" />
                        </button>
                        <span className="font-black text-xs">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQty(item.id, 1)}
                          className="w-10 h-10 rounded-xl border border-neutral-800 flex items-center justify-center hover:bg-white/5"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-8 bg-black/40 border-t border-neutral-800">
               <div className="flex justify-between items-end mb-8">
                 <div className="micro-label">Account Balance</div>
                 <div className="text-3xl font-light italic">Ksh <span className="font-black text-gradient">{subtotal.toLocaleString()}</span></div>
               </div>
               <button 
                disabled={items.length === 0}
                onClick={onCheckout}
                className="w-full bg-[#0096ff] text-white py-6 rounded-[2rem] font-black uppercase text-[10px] tracking-[0.4em] shadow-2xl shadow-[#0096ff]/40 hover:scale-[1.02] transition-all disabled:opacity-50"
               >
                 Review Order & Pay
               </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const ProductCard = ({ 
  product, 
  onAdd, 
  onToggleWishlist, 
  isWishlisted,
  onQuickView
}: { 
  product: Product, 
  onAdd: (p: Product) => void,
  onToggleWishlist: (id: string) => void,
  isWishlisted: boolean,
  onQuickView?: (p: Product) => void,
  key?: string | number
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="group relative flex flex-col"
    >
      <div className="aspect-[3/4] md:aspect-[4/5] overflow-hidden relative rounded-[1.5rem] md:rounded-[2.5rem] bg-neutral-900 border border-neutral-800 transition-all duration-700 group-hover:border-[#0096ff]/50 group-hover:shadow-[0_0_30px_rgba(0,150,255,0.15)]">
        <img 
          src={product.image} 
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-1000 ${product.secondaryImage ? 'group-hover:opacity-0' : 'group-hover:scale-110'}`}
          referrerPolicy="no-referrer"
        />
        {product.secondaryImage && (
          <img 
            src={product.secondaryImage} 
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-1000 scale-110 group-hover:scale-100"
            alt=""
          />
        )}
        
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className={`absolute top-4 right-4 md:top-8 md:right-8 p-3 rounded-full backdrop-blur-xl border border-white/5 transition-all z-10
            ${isWishlisted ? 'bg-[#0096ff] text-white shadow-lg shadow-[#0096ff]/40 scale-110' : 'bg-black/40 text-white hover:scale-110 hover:bg-neutral-800'}`}
        >
          <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} strokeWidth={isWishlisted ? 0 : 2} />
        </button>

        {product.badge && (
          <span className={`absolute top-4 left-4 md:top-8 md:left-8 px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-lg backdrop-blur-xl border border-white/10 z-10 
            ${product.badge === 'Grail' ? 'bg-yellow-500 text-black border-yellow-400 font-black' : 'bg-black/80 text-white'}`}>
            {product.badge === 'Grail' ? (
              <span className="flex items-center gap-2 font-black"><Star size={10} fill="currentColor" /> {product.badge}</span>
            ) : product.badge}
          </span>
        )}

        <div className="absolute inset-x-4 bottom-4 md:inset-x-8 md:bottom-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex flex-col gap-2">
          {onQuickView && (
            <button 
              className="w-full bg-white/10 backdrop-blur-xl text-white py-4 rounded-xl font-black text-[9px] uppercase tracking-[0.4em] flex items-center justify-center gap-3 hover:bg-white/20 transition-all border border-white/10"
              onClick={() => onQuickView(product)}
            >
              Quick Perspective <ExternalLink size={14} />
            </button>
          )}
          <button 
            className="w-full bg-white text-black py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] flex items-center justify-center gap-3 hover:bg-[#0096ff] hover:text-white transition-all shadow-2xl active:scale-95"
            onClick={() => onAdd(product)}
          >
            Add to Bag <Plus size={16} />
          </button>
        </div>
      </div>
      
      <div className="px-2 pt-6 flex flex-col">
        <div className="flex justify-between items-start mb-2">
           <div className="micro-label text-neutral-500">{product.category}</div>
           <div className="flex items-center gap-1">
              <Star size={10} className="text-[#0096ff]" fill="currentColor" />
              <span className="text-[10px] font-black">{product.rating || '4.5'}</span>
           </div>
        </div>
        <h3 className="font-bold text-sm md:text-md mb-2 tracking-tight group-hover:text-[#0096ff] transition-colors uppercase">{product.name}</h3>
        <div className="flex justify-between items-baseline">
          <span className="text-xl font-black italic">Ksh {product.price.toLocaleString()}</span>
          {product.isNew && (
            <span className="text-[9px] font-black text-[#0096ff] uppercase tracking-widest">New Arrival</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// --- Page Views ---

const HomeView = ({ onPageChange, onCategoryChange, onAdd, onToggleWishlist, wishlist, onQuickView }: { 
  onPageChange: (v: View) => void, 
  onCategoryChange: (c: string) => void,
  onAdd: (p: Product) => void,
  onToggleWishlist: (id: string) => void,
  wishlist: string[],
  onQuickView: (p: Product) => void
}) => {
  return (
    <>
      <section className="relative min-h-[90vh] flex items-center pt-32 overflow-hidden">
        {/* Abstract Glow Elements */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#0096ff]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#00d4ff]/10 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 w-full z-10 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <div className="flex items-center gap-4 mb-10">
                <span className="micro-label">Global Access</span>
                <div className="h-px w-12 bg-white/20" />
                <span className="text-[10px] font-black uppercase text-[#0096ff] tracking-widest animate-pulse flex items-center gap-2">
                  <MapPin size={10} /> Nairobi Core
                </span>
              </div>
              <h1 className="text-6xl md:text-[8rem] font-light leading-[0.85] mb-12 tracking-tighter uppercase italic py-4">
                Own Your<br />
                <span className="text-gradient font-black">Attitude</span>
              </h1>
              <p className="text-neutral-500 text-lg md:text-xl mb-14 leading-relaxed max-w-lg font-light tracking-wide">
                Revolutionary streetwear designed near the pulse of the city. 
                Shipping worldwide from Nairobi, embracing those who refuse to blend in.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <button 
                  onClick={() => onPageChange('shop')}
                  className="bg-white text-black px-12 py-5 rounded-full font-black uppercase text-[10px] tracking-[0.3em] hover:bg-[#0096ff] hover:text-white transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-95"
                >
                  Explore Catalog <ArrowRight size={16} />
                </button>
                <div className="flex items-center gap-4 pt-4 sm:pt-0">
                  <div className="flex -space-x-4">
                     {[1,2,3].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-black overflow-hidden bg-neutral-800">
                           <img src={`https://picsum.photos/seed/user-${i}/100/100`} alt="" />
                        </div>
                     ))}
                  </div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-neutral-500">
                    JOINED BY <span className="text-white font-black italic">500+</span> REBELS
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1 }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-[#0096ff]/10 rounded-[4rem] rotate-6 -z-10" />
                <div className="w-full h-full bg-neutral-900 border border-neutral-800 rounded-[4rem] overflow-hidden group">
                  <img src={MEDIA.hero} alt="AMARU Streetwear" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brand Values */}
      <section className="py-24 px-6 bg-black border-y border-neutral-900 text-center">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: "Premium Materials", val: "Archive Denim", icon: <ShieldCheck size={16} /> },
              { label: "Local Production", val: "Nairobi Core", icon: <MapPin size={16} /> },
              { label: "Global Logistics", val: "Door-to-Door", icon: <Truck size={16} /> },
              { label: "Elite Support", val: "Concierge 24/7", icon: <Award size={16} /> }
            ].map((v, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-4 text-[#0096ff]">{v.icon}</div>
                <div className="micro-label mb-2 opacity-50">{v.label}</div>
                <div className="text-xl font-black uppercase font-display italic tracking-widest">{v.val}</div>
              </div>
            ))}
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-20 md:py-32 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-24 gap-6">
            <div>
              <div className="micro-label mb-4 text-gradient">Latest Inflow</div>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Featured Fragments</h2>
            </div>
            <button 
              onClick={() => onPageChange('shop')}
              className="group text-neutral-500 hover:text-white transition-all font-black tracking-[0.4em] flex items-center gap-4 text-[10px] uppercase"
            >
              PROJECT ACCESS <div className="p-3 md:p-4 rounded-full border border-neutral-800 group-hover:border-[#0096ff] transition-all"><ChevronRight size={16} /></div>
            </button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {SAMPLE_PRODUCTS.slice(0, 4).map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAdd={onAdd} 
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlist.includes(product.id)}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Invariants Section */}
      <section className="py-20 md:py-32 px-4 md:px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12">
            {[
              { 
                title: "Excellence", 
                body: "Every thread is chosen for longevity. Every design is crafted for impact. No shortcuts. Just AMARU.", 
                accent: BRAND_GRADIENT 
              },
              { 
                title: "Nairobi Soul", 
                body: "We represent the heart of East African creativity, taking local grit to a global stage.", 
                accent: "from-[#0096ff] to-cyan-400" 
              }
            ].map((card, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-neutral-900 border border-neutral-800 p-12 md:p-20 rounded-[2.5rem] md:rounded-[4rem] group hover:border-[#0096ff] transition-all"
              >
                <h3 className={`text-4xl md:text-6xl font-black italic uppercase mb-8 tracking-tighter group-hover:text-white transition-colors text-gradient`}>
                  {card.title}
                </h3>
                <p className="text-neutral-500 text-lg leading-relaxed font-light">
                  {card.body}
                </p>
              </motion.div>
            ))}
        </div>
      </section>

      {/* Categories Bento */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="micro-label mb-8 md:mb-12 text-center text-gradient">The Collection Types</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: <Shirt size={28} />, name: 'T-Shirts' },
              { icon: <Package size={28} />, name: 'Hoodies' },
              { icon: <Crown size={28} />, name: 'Jackets' },
              { icon: <Sparkles size={28} />, name: 'Jeans' },
            ].map((cat, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -8 }}
                onClick={() => {
                  onCategoryChange(cat.name);
                  onPageChange('shop');
                }}
                className="bg-neutral-900/40 border border-neutral-800 p-8 md:p-12 rounded-[1.5rem] md:rounded-[2.5rem] text-center cursor-pointer hover:border-[#0096ff] transition-all group"
              >
                <div className="text-[#0096ff] mb-4 md:mb-6 flex justify-center group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <h3 className="font-black text-sm md:text-lg uppercase tracking-tight">{cat.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Banner */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-neutral-900 border border-neutral-800 p-12 md:p-32 rounded-[4rem] overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[#0096ff]/5 to-transparent pointer-events-none" />
            <div className="micro-label mb-10">Signature Release</div>
            <h2 className="text-6xl md:text-[8rem] font-light uppercase mb-12 leading-none tracking-tighter italic">
              REBELLION<br />
              <span className="font-black">STUDIO</span>
            </h2>
            <button 
              onClick={() => onPageChange('shop')}
              className="bg-white text-black px-16 py-6 rounded-full font-black uppercase text-[10px] tracking-[0.4em] hover:bg-[#0096ff] hover:text-white transition-all shadow-xl"
            >
              Explore Drops
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

// --- Shop View ---
const ShopView = ({ 
  products, 
  onAdd, 
  activeCategory, 
  setActiveCategory, 
  onToggleWishlist, 
  wishlist,
  onQuickView
}: { 
  products: Product[], 
  onAdd: (p: Product) => void,
  activeCategory: string,
  setActiveCategory: (c: string) => void,
  onToggleWishlist: (id: string) => void,
  wishlist: string[],
  onQuickView: (p: Product) => void
}) => {
  const categories = ['All Drops', 'Signature', 'Hoodies', 'T-Shirts', 'Outerwear', 'Bottoms', 'Accessories'];

  return (
    <section className="pt-32 md:pt-48 pb-20 md:pb-32 px-4 md:px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-8">
          <div>
            <div className="micro-label mb-4 opacity-50">Retail Space</div>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter italic leading-none">
              THE <span className="text-gradient">CATALOG</span>
            </h1>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-full text-[9px] font-black uppercase tracking-widest transition-all
                  ${activeCategory === cat ? 'bg-[#0096ff] text-white shadow-lg shadow-[#0096ff]/30' : 'bg-neutral-900 text-neutral-500 hover:text-white border border-neutral-800'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        
        {products.length === 0 ? (
          <div className="py-40 text-center opacity-20">
            <h2 className="text-2xl font-black uppercase tracking-[0.3em]">No Fragments Found</h2>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12 md:gap-x-12 md:gap-y-20">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAdd={onAdd}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlist.includes(product.id)}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// --- About View ---
const AboutView = ({ onPageChange }: { onPageChange: (v: View) => void }) => {
  return (
    <div className="bg-black">
      {/* SECTION 1 — HERO BANNER */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544022613-e879a7935ed9?q=80&w=2000" 
            alt="About AMARU" 
            className="w-full h-full object-cover opacity-40 brightness-50"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter mb-8 leading-none">
              About <span className="text-gradient">AMARU</span>
            </h1>
            <p className="text-xl md:text-2xl font-light tracking-wide text-neutral-300 mb-12 max-w-2xl mx-auto leading-relaxed uppercase">
              More Than Fashion — A Movement of Confidence, Identity, and Style
            </p>
            <button 
              onClick={() => onPageChange('shop')}
              className="bg-white text-black px-12 py-5 rounded-full font-black uppercase text-[10px] tracking-[0.4em] hover:bg-[#0096ff] hover:text-white transition-all shadow-2xl active:scale-95"
            >
              Shop the Collection
            </button>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 — OUR STORY */}
      <section className="py-24 md:py-48 px-6 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col gap-12 text-center md:text-left">
            <div className="micro-label text-[#0096ff]">Legacy</div>
            <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase leading-none">Our Story</h2>
            <div className="space-y-8 text-neutral-400 text-xl md:text-2xl font-light leading-relaxed">
              <p>
                AMARU was created for individuals who refuse to blend in. 
                We believe clothing is more than fabric — it is identity, confidence, and expression.
              </p>
              <p>
                From our first design to every collection we release, our mission has remained the same: 
                to deliver bold, stylish, and high-quality apparel that empowers people to own their attitude and embrace their uniqueness.
              </p>
              <p>
                AMARU represents strength, creativity, and self-expression. 
                Every piece we create is designed to help you stand out, feel confident, and express your personality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 & 4 — MISSION & VISION */}
      <section className="py-24 px-6 border-y border-white/5 bg-[#050505]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
           <div className="bg-neutral-900/50 p-12 md:p-20 rounded-[3rem] border border-white/5 group hover:border-[#0096ff]/20 transition-all">
              <div className="w-12 h-12 rounded-full bg-[#0096ff]/10 flex items-center justify-center text-[#0096ff] mb-8"><Award size={24} /></div>
              <h3 className="text-3xl font-black uppercase italic mb-6 tracking-tighter">Our Mission</h3>
              <p className="text-neutral-500 text-lg leading-relaxed font-light">
                To deliver premium fashion that inspires confidence, creativity, and individuality while maintaining affordability and quality.
              </p>
           </div>
           <div className="bg-neutral-900/50 p-12 md:p-20 rounded-[3rem] border border-white/5 group hover:border-[#0096ff]/20 transition-all">
              <div className="w-12 h-12 rounded-full bg-[#0096ff]/10 flex items-center justify-center text-[#0096ff] mb-8"><Sparkles size={24} /></div>
              <h3 className="text-3xl font-black uppercase italic mb-6 tracking-tighter">Our Vision</h3>
              <p className="text-neutral-500 text-lg leading-relaxed font-light">
                To become a recognized fashion brand known for bold design, quality craftsmanship, and customer satisfaction across Africa and beyond.
              </p>
           </div>
        </div>
      </section>

      {/* SECTION 5 — OUR VALUES */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto text-center mb-24">
          <div className="micro-label mb-6 text-[#0096ff]">Foundation</div>
          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">What We Stand For</h2>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {[
             { title: "Quality", desc: "We use durable materials and modern design standards.", icon: <ShieldCheck size={32} /> },
             { title: "Creativity", desc: "We embrace originality and innovation in fashion.", icon: <Zap size={32} /> },
             { title: "Customer Satisfaction", desc: "We prioritize customer happiness and trust.", icon: <Heart size={32} /> },
             { title: "Confidence", desc: "We empower people to express themselves boldly.", icon: <Award size={32} /> }
           ].map((v, i) => (
             <div key={i} className="bg-neutral-900/40 p-12 rounded-[2.5rem] border border-white/5 hover:border-[#0096ff]/40 transition-all group text-center">
                <div className="text-[#0096ff] mb-8 flex justify-center group-hover:scale-110 transition-transform">{v.icon}</div>
                <h4 className="text-xl font-black uppercase italic mb-4 tracking-tighter">{v.title}</h4>
                <p className="text-neutral-500 text-sm font-light leading-relaxed">{v.desc}</p>
             </div>
           ))}
        </div>
      </section>

      {/* SECTION 6 — WHY CHOOSE AMARU */}
      <section className="py-32 px-6 bg-[#050505] border-y border-white/5">
        <div className="max-w-7xl mx-auto mb-24">
          <div className="micro-label mb-6 text-[#0096ff]">Value Proposition</div>
          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">Why Choose AMARU</h2>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
           {[
             { title: "Premium Quality Materials", desc: "Higher-tier fabrics sourced for durability and elite feel.", icon: <Gem size={24} /> },
             { title: "Modern Streetwear Designs", desc: "Cutting-edge silhouettes that redefine urban fashion.", icon: <LayoutGrid size={24} /> },
             { title: "Affordable Pricing", desc: "Premium luxury experience without the gatekept prices.", icon: <Package size={24} /> },
             { title: "Reliable Customer Support", desc: "Our concierge team is available to assist you 24/7.", icon: <MessageCircle size={24} /> },
             { title: "Fast Delivery", desc: "Prompt dispatch and delivery both locally and globally.", icon: <Truck size={24} /> },
             { title: "Trusted Brand", desc: "Join 500+ rebels who trust AMARU for their identity.", icon: <ShieldCheck size={24} /> }
           ].map((item, i) => (
             <div key={i} className="flex gap-8 p-10 bg-neutral-900 rounded-[2.5rem] border border-white/5 hover:border-[#0096ff]/20 transition-all backdrop-blur-xl">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-[#0096ff]/10 flex items-center justify-center text-[#0096ff]">{item.icon}</div>
                <div>
                   <h5 className="text-lg font-black uppercase mb-2 tracking-tight">{item.title}</h5>
                   <p className="text-neutral-500 text-sm font-light leading-relaxed">{item.desc}</p>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* SECTION 7 — CALL TO ACTION */}
      <section className="py-24 md:py-48 px-6 text-center">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-neutral-900 to-black p-12 md:p-32 rounded-[3.5rem] border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-[#0096ff]/5 blur-[100px] pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter mb-8 leading-none">Join the Movement</h2>
            <p className="text-neutral-400 text-xl md:text-2xl font-light mb-12 uppercase tracking-wide">
              Step into confidence. Wear your identity. Experience the power of style with AMARU.
            </p>
            <button 
              onClick={() => onPageChange('shop')}
              className="bg-white text-black px-12 py-5 rounded-full font-black uppercase text-[10px] tracking-[0.4em] hover:bg-[#0096ff] hover:text-white transition-all shadow-2xl active:scale-95"
            >
              Shop Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

// --- Contact View ---
const ContactView = () => {
  return (
    <div className="bg-black">
      {/* SECTION 1 — HERO SECTION */}
      <section className="pt-48 pb-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
             <div className="micro-label mb-6 text-[#0096ff]">Support Hub</div>
             <h1 className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter mb-8 leading-none">Contact <span className="text-gradient hover:animate-pulse cursor-default">AMARU</span></h1>
             <p className="text-xl md:text-2xl font-light text-neutral-400 mb-6 uppercase tracking-widest">We're Here to Help You</p>
             <p className="text-neutral-500 max-w-xl mx-auto font-light leading-relaxed">
               Have a question about our products, orders, or delivery? Our team is ready to assist you.
             </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 — CONTACT INFORMATION */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {[
             { label: "Phone", val: "+254 746 746904", sub: "Direct Line", icon: <Phone size={24} />, link: "tel:+254746746904" },
             { label: "WhatsApp", val: "Chat Online", sub: "Fast Response", icon: <MessageCircle size={24} />, link: "https://wa.me/254746746904" },
             { label: "Email", val: "info@amaruofficial.com", sub: "Official Queries", icon: <Mail size={24} />, link: "mailto:info@amaruofficial.com" },
             { label: "Location", val: "Kenya", sub: "Nairobi Core", icon: <MapPin size={24} /> }
           ].map((card, i) => (
             <a 
               key={i} 
               href={card.link}
               target={card.link?.startsWith('http') ? "_blank" : undefined}
               className="bg-neutral-900/50 p-10 rounded-[2.5rem] border border-white/5 hover:border-[#0096ff]/40 transition-all group flex flex-col items-center text-center"
             >
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-[#0096ff] mb-6 group-hover:scale-110 transition-transform">{card.icon}</div>
                <div className="micro-label mb-2 opacity-40">{card.label}</div>
                <div className="text-lg font-black uppercase mb-1">{card.val}</div>
                <div className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest">{card.sub}</div>
             </a>
           ))}
        </div>
        <div className="max-w-7xl mx-auto mt-12 bg-[#050505] p-10 rounded-[2.5rem] border border-white/5 text-center">
           <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="flex items-center gap-3">
                 <Clock size={20} className="text-[#0096ff]" />
                 <span className="micro-label">Business Hours:</span>
              </div>
              <div className="text-lg font-black uppercase italic tracking-widest">Monday — Saturday: 8:00 AM — 6:00 PM</div>
           </div>
        </div>
      </section>

      {/* SECTION 3 — CONTACT FORM */}
      <section className="py-24 px-6 bg-[#050505] border-y border-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-4">Send a Manifest</h2>
            <p className="text-neutral-500 font-light uppercase text-xs tracking-widest">Our agents will respond within 24 hours</p>
          </div>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[9px] uppercase font-black tracking-widest text-neutral-600 ml-4">Full Name</label>
                <input 
                  type="text" 
                  placeholder="EX: JOHN DOE"
                  className="w-full bg-black/40 border border-white/5 rounded-2xl px-8 py-5 text-xs font-black tracking-widest focus:border-[#0096ff]/40 outline-none transition-all placeholder:text-neutral-800"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] uppercase font-black tracking-widest text-neutral-600 ml-4">Email Address</label>
                <input 
                  type="email" 
                  placeholder="EX: INFO@MAIL.COM"
                  className="w-full bg-black/40 border border-white/5 rounded-2xl px-8 py-5 text-xs font-black tracking-widest focus:border-[#0096ff]/40 outline-none transition-all placeholder:text-neutral-800"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase font-black tracking-widest text-neutral-600 ml-4">Phone Number</label>
              <input 
                type="tel" 
                placeholder="+254 --- --- ---"
                className="w-full bg-black/40 border border-white/5 rounded-2xl px-8 py-5 text-xs font-black tracking-widest focus:border-[#0096ff]/40 outline-none transition-all placeholder:text-neutral-800"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase font-black tracking-widest text-neutral-600 ml-4">Message</label>
              <textarea 
                rows={6}
                placeholder="WHAT'S ON YOUR MIND?"
                className="w-full bg-black/40 border border-white/5 rounded-3xl px-8 py-6 text-xs font-black tracking-widest focus:border-[#0096ff]/40 outline-none transition-all placeholder:text-neutral-800 resize-none"
              ></textarea>
            </div>
            <button 
              className="w-full py-6 bg-white text-black rounded-full font-black text-[10px] uppercase tracking-[0.4em] hover:bg-[#0096ff] hover:text-white transition-all shadow-2xl active:scale-[0.98]"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* SECTION 4 — TRUST BUILDING */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <div className="micro-label mb-6 text-[#0096ff]">Reliability</div>
            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">Why Customers Trust AMARU</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
             {[
               { icon: <ShieldCheck size={28} />, title: "Secure Orders", desc: "Encoded checkout transmissions" },
               { icon: <Clock size={28} />, title: "Fast Response Time", desc: "Under 12 hour response window" },
               { icon: <Truck size={28} />, title: "Reliable Delivery", desc: "Verified global logistics network" },
               { icon: <Heart size={28} />, title: "Customer Support", desc: "Human-centric concierge help" }
             ].map((item, i) => (
               <div key={i} className="text-center group">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-8 text-[#0096ff] group-hover:bg-[#0096ff] group-hover:text-white transition-all shadow-xl shadow-[#0096ff]/10">
                    {item.icon}
                  </div>
                  <h4 className="text-lg font-black uppercase italic tracking-tighter mb-2 leading-none">{item.title}</h4>
                  <p className="text-neutral-600 text-[10px] font-black uppercase tracking-widest">{item.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — WHATSAPP QUICK CONTACT */}
      <section className="py-24 md:py-48 px-6 bg-black">
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-gradient-to-r from-[#25D366]/20 to-transparent p-12 md:p-32 rounded-[3.5rem] border border-[#25D366]/20 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="text-center md:text-left">
               <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none mb-6">Need Help Fast?</h2>
               <p className="text-neutral-400 text-xl font-light uppercase tracking-widest max-w-sm">Chat with us instantly on WhatsApp and get quick assistance.</p>
            </div>
            <button 
              onClick={() => window.open('https://wa.me/254746746904', '_blank')}
              className="bg-[#25D366] text-white px-12 py-6 rounded-full font-black uppercase text-[10px] tracking-[0.4em] hover:scale-105 transition-all shadow-2xl shadow-[#25D366]/40 flex items-center gap-4"
            >
              <MessageCircle size={20} /> Chat on WhatsApp
            </button>
            <div className="absolute top-0 right-0 p-8 opacity-10"><MessageCircle size={200} /></div>
          </div>
        </div>
      </section>
    </div>
  );
};

// --- Admin Section (Restored) ---
const AdminView = ({ onPageChange, orders }: { onPageChange: (v: View) => void, orders: Order[] }) => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'orders'>('inventory');

  return (
    <section className="pt-32 md:pt-48 pb-20 md:pb-32 px-4 md:px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-24 gap-6 md:gap-8">
           <div>
              <div className="micro-label mb-2 md:mb-4">Operations Center</div>
              <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter italic break-words">Management</h1>
           </div>
           <div className="flex flex-wrap items-center gap-2 md:gap-4">
              <button 
                onClick={() => setActiveTab('inventory')}
                className={`flex-1 md:flex-none px-4 md:px-8 py-2 md:py-3 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'inventory' ? 'bg-[#0096ff] text-white' : 'border border-neutral-800 text-neutral-500'}`}
              >
                Inventory
              </button>
              <button 
                onClick={() => setActiveTab('orders')}
                className={`flex-1 md:flex-none px-4 md:px-8 py-2 md:py-3 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'orders' ? 'bg-[#0096ff] text-white' : 'border border-neutral-800 text-neutral-500'}`}
              >
                Orders ({orders.length})
              </button>
              <button 
                onClick={() => onPageChange('login')}
                className="px-4 md:px-8 py-2 md:py-3 border border-red-500/20 text-red-500 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest hover:bg-red-500/10 transition-all"
              >
                Logout
              </button>
           </div>
        </div>

        {activeTab === 'inventory' ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-12 md:mb-24">
                {[
                  { label: 'Total Models', val: SAMPLE_PRODUCTS.length, suffix: 'SKUs' },
                  { label: 'Market Depth', val: '1.2M', suffix: 'Ksh' },
                  { label: 'Retail Health', val: '98', suffix: '%' }
                ].map((stat, idx) => (
                  <div key={idx} className="bg-neutral-900 border border-neutral-800 p-8 md:p-12 rounded-[2rem] md:rounded-[3.5rem] shadow-xl group hover:border-[#0096ff] transition-all">
                    <div className="micro-label mb-2 md:mb-4">{stat.label}</div>
                    <div className="flex items-baseline gap-2">
                       <p className="text-3xl md:text-5xl font-black text-[#0096ff]">{stat.val}</p>
                       <span className="text-[10px] font-black opacity-40 uppercase tracking-widest">{stat.suffix}</span>
                    </div>
                  </div>
                ))}
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-[2rem] md:rounded-[4rem] overflow-hidden">
              <div className="p-8 md:p-12 border-b border-neutral-800 flex justify-between items-center">
                  <h3 className="text-lg md:text-2xl font-black uppercase italic tracking-tighter">Inventory Archive</h3>
                  <button className="bg-white text-black px-6 md:px-10 py-3 md:py-4 rounded-full font-black text-[8px] md:text-[10px] uppercase tracking-widest hover:bg-[#0096ff] hover:text-white transition-all">
                    New SKU +
                  </button>
              </div>
              <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-[#050505] text-neutral-600 uppercase text-[8px] md:text-[9px] font-black tracking-[0.3em] border-b border-neutral-800">
                        <tr>
                          <th className="px-6 md:px-12 py-4 md:py-8">Product Entity</th>
                          <th className="px-6 md:px-12 py-4 md:py-8 hidden sm:table-cell">Classification</th>
                          <th className="px-6 md:px-12 py-4 md:py-8">Retail Value</th>
                          <th className="px-6 md:px-12 py-4 md:py-8 text-right">Protocol</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800">
                        {SAMPLE_PRODUCTS.map(p => (
                          <tr key={p.id} className="hover:bg-white/[0.02] transition-colors group">
                            <td className="px-6 md:px-12 py-4 md:py-8 flex items-center gap-4 md:gap-6">
                              <img src={p.image} className="w-10 h-14 md:w-16 md:h-20 object-cover rounded-lg md:rounded-2xl border border-neutral-800" alt="" />
                              <span className="font-black text-xs md:text-lg uppercase group-hover:text-[#0096ff] transition-colors line-clamp-1">{p.name}</span>
                            </td>
                            <td className="px-6 md:px-12 py-4 md:py-8 text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] text-[#0096ff] hidden sm:table-cell">{p.category}</td>
                            <td className="px-6 md:px-12 py-4 md:py-8 font-mono text-sm md:text-2xl italic whitespace-nowrap">Ksh {p.price.toLocaleString()}</td>
                            <td className="px-6 md:px-12 py-4 md:py-8 text-right">
                              <button className="text-neutral-800 hover:text-red-500 transition-colors uppercase font-black text-[8px] md:text-[10px] tracking-widest">Trash SKU</button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-neutral-900 border border-neutral-800 rounded-[2rem] md:rounded-[4rem] overflow-hidden">
             <div className="p-8 md:p-12 border-b border-neutral-800">
                  <h3 className="text-lg md:text-2xl font-black uppercase italic tracking-tighter">Order Transmission Logs</h3>
              </div>
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead className="bg-[#050505] text-neutral-600 uppercase text-[8px] md:text-[9px] font-black tracking-[0.3em] border-b border-neutral-800">
                        <tr>
                          <th className="px-6 md:px-12 py-4 md:py-8">Vector ID</th>
                          <th className="px-6 md:px-12 py-4 md:py-8">Customer Node</th>
                          <th className="px-6 md:px-12 py-4 md:py-8 whitespace-nowrap">Total Value</th>
                          <th className="px-6 md:px-12 py-4 md:py-8">Status</th>
                          <th className="px-6 md:px-12 py-4 md:py-8 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800">
                        {orders.length === 0 ? (
                          <tr><td colSpan={5} className="p-24 text-center opacity-40 micro-label">Awaiting First Transmission...</td></tr>
                        ) : (
                          orders.map(order => (
                            <React.Fragment key={order.id}>
                              <tr className="hover:bg-white/[0.02] transition-colors group">
                                <td className="px-6 md:px-12 py-4 md:py-8 font-mono text-[8px] md:text-[10px] opacity-40">{order.id}</td>
                                <td className="px-6 md:px-12 py-4 md:py-8 font-black uppercase text-[10px] md:text-xs text-white group-hover:text-[#0096ff] transition-colors">
                                  {order.customerName}
                                  <div className="text-[7px] text-neutral-600 lowercase tracking-widest mt-1">
                                    {order.items.length} items • {new Date(order.date || '').toLocaleDateString()}
                                  </div>
                                </td>
                                <td className="px-12 py-8 font-mono text-sm md:text-base italic whitespace-nowrap">Ksh {order.total.toLocaleString()}</td>
                                <td className="px-6 md:px-12 py-4 md:py-8">
                                  <div className="flex flex-col gap-2">
                                    <span className={`w-fit px-4 py-1.5 rounded-full text-[7px] md:text-[8px] font-black uppercase tracking-widest ${order.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 animate-pulse' : 'bg-green-500/10 text-green-500 border border-green-500/20'}`}>
                                      {order.status}
                                    </span>
                                    {order.trackingNumber && (
                                      <div className="text-[8px] font-mono opacity-40 uppercase">{order.courier}: {order.trackingNumber}</div>
                                    )}
                                  </div>
                                </td>
                                <td className="px-6 md:px-12 py-4 md:py-8 text-right">
                                  <button className="text-[#0096ff] font-black text-[8px] md:text-[10px] uppercase tracking-widest border border-[#0096ff]/30 px-4 py-2 rounded-full hover:bg-[#0096ff] hover:text-white transition-all">Manifest</button>
                                </td>
                              </tr>
                              {order.milestones && (
                                <tr>
                                  <td colSpan={5} className="px-12 py-8 bg-black/40 border-b border-neutral-800">
                                    <div className="flex flex-col gap-6">
                                      <div className="micro-label opacity-30">Detailed Tracking Timeline</div>
                                      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                                        {order.milestones.map((m, i) => (
                                          <div key={i} className="relative pl-6 border-l border-[#0096ff]/20">
                                            <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-[#0096ff]" />
                                            <div className="text-[10px] font-black uppercase tracking-widest text-[#0096ff] mb-1">{m.status}</div>
                                            <div className="text-[9px] text-neutral-500 uppercase mb-2">{new Date(m.date).toLocaleString()}</div>
                                            <p className="text-[10px] text-neutral-400 font-light italic">{m.description}</p>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          ))
                        )}
                    </tbody>
                 </table>
              </div>
          </div>
        )}
      </div>
    </section>
  );
};

// --- Main App ---

export default function App() {
  const [view, setView] = useState<View>('customer');
  const [activeCategory, setActiveCategory] = useState<string>('All Drops');
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Persistence (Mock)
  useEffect(() => {
    const savedCart = localStorage.getItem('amaru_cart');
    const savedWishlist = localStorage.getItem('amaru_wishlist');
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  useEffect(() => {
    localStorage.setItem('amaru_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('amaru_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const handlePageChange = (v: View) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setView(v);
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const handleCheckout = () => {
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const newOrder: Order = {
      id: `ORD-${Math.floor(Math.random() * 9000) + 1000}`,
      customerName: 'Guest User',
      items: cart,
      total,
      status: 'pending',
      milestones: [
        { date: new Date().toISOString(), status: 'pending', description: 'Order transmission received by AMARU Nexus.' }
      ],
      date: new Date().toISOString()
    };
    
    setOrders([newOrder, ...orders]);
    
    // WhatsApp Integration for checkout
    const itemsText = cart.map(item => `- ${item.name} (x${item.quantity})`).join('\n');
    const message = `Hello AMARU, I'd like to place an order!\n\nOrder Details:\n${itemsText}\n\nTotal: Ksh ${total.toLocaleString()}`;
    window.open(`https://wa.me/254746746904?text=${encodeURIComponent(message)}`, '_blank');
    
    setCart([]);
    setIsCartOpen(false);
    alert("Order summary sent to WhatsApp. We'll contact you shortly!");
  };

  const toggleWishlist = (id: string) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredProducts = SAMPLE_PRODUCTS.filter(p => {
    const matchesCategory = activeCategory === 'All Drops' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen selection:bg-[#0096ff]/30 transition-colors duration-500 bg-black text-white">
      {view !== 'login' && (
        <Navbar 
          onViewChange={handlePageChange} 
          currentView={view} 
          onSearchOpen={() => setIsSearchOpen(true)}
          wishlistCount={wishlist.length}
        />
      )}

      {/* Floating Action Center */}
      <div className="fixed bottom-8 right-8 z-[60] flex flex-col gap-4">
        {/* WhatsApp Concierge */}
        <button 
          onClick={() => window.open('https://wa.me/254746746904?text=Hello%20AMARU%20Concierge!', '_blank')}
          className="bg-[#25D366] text-white p-5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all border border-white/10 group relative"
        >
          <MessageCircle size={24} />
          <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/5">
            Concierge Online
          </span>
        </button>
        
        {/* Cart Trigger */}
        <button 
          onClick={() => setIsCartOpen(true)}
          className="bg-[#0096ff] text-white p-5 rounded-full shadow-2xl shadow-[#0096ff]/40 hover:scale-110 active:scale-95 transition-all flex items-center justify-center relative border border-[#00d4ff]/20"
        >
          <ShoppingBag size={24} />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-white text-black text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#0096ff]">
              {cart.reduce((a, b) => a + b.quantity, 0)}
            </span>
          )}
        </button>
      </div>

      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        query={searchQuery} 
        setQuery={setSearchQuery} 
      />
      
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQty={updateQty}
        onCheckout={handleCheckout}
      />

      <QuickViewModal 
        isOpen={!!quickViewProduct}
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAdd={addToCart}
        onToggleWishlist={toggleWishlist}
        isWishlisted={quickViewProduct ? wishlist.includes(quickViewProduct.id) : false}
      />

      <AnimatePresence mode="wait">
        {view === 'login' ? (
          <LoginView key="login-view" onLogin={(role) => handlePageChange(role)} />
        ) : (
          <motion.main
            key={view}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {view === 'customer' && (
              <HomeView 
                onPageChange={handlePageChange} 
                onCategoryChange={setActiveCategory} 
                onAdd={addToCart} 
                onToggleWishlist={toggleWishlist}
                wishlist={wishlist}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            )}
            {view === 'shop' && (
              <ShopView 
                products={filteredProducts} 
                onAdd={addToCart} 
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                onToggleWishlist={toggleWishlist}
                wishlist={wishlist}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            )}
            {view === 'wishlist' && (
              <WishlistView 
                products={SAMPLE_PRODUCTS.filter(p => wishlist.includes(p.id))} 
                onAdd={addToCart}
                onToggleWishlist={toggleWishlist}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            )}
            {view === 'projects' && <ProjectsView />}
            {view === 'about' && <AboutView onPageChange={handlePageChange} />}
            {view === 'contact' && <ContactView />}
            {view === 'admin' && <AdminView onPageChange={handlePageChange} orders={orders} />}
            {view !== 'admin' && <Footer onPageChange={handlePageChange} />}
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
