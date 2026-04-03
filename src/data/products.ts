
import { StaticImageData } from "next/dist/shared/lib/image-external";

export interface StoneInfo {
  type: string;
  carat?: number;
  count?: number;
  cut?: string;
  clarity?: string;
  color?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string | StaticImageData;
  images?: string[] | StaticImageData[];
  category: string;
  metal: string;
  weight: string;
  goldWeight?: string;
  purity: string;
  karatage: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  isLightweight?: boolean;
  isDiamond?: boolean;
  stones?: StoneInfo[];
  makingCharges?: string;
  certification?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  featured: boolean;
}

export const categories: Category[] = [
  {
    id: "rings",
    name: "Rings",
    description: "Exquisite rings from traditional to contemporary designs",
    image: "/assets/ring.png",
    featured: true,
  },
  {
    id: "necklaces",
    name: "Necklaces",
    description: "Elegant necklaces and chains for every occasion",
    image: "/assets/necklace.png",
    featured: true,
  },
  {
    id: "earrings",
    name: "Earrings",
    description: "Beautiful earrings from studs to dangling designs",
    image: "/assets/earring.png",
    featured: true,
  },
  {
    id: "bangles",
    name: "Bangles",
    description: "Traditional and modern bangles in gold and diamond",
    image: "/assets/bangles.png",
    featured: true,
  },
  {
    id: "pendants",
    name: "Pendants",
    description: "Intricate pendants and lockets with precious stones",
    image: "/assets/pedanats.png",
    featured: false,
  },
  {
    id: "bracelets",
    name: "Bracelets",
    description: "Stylish bracelets for everyday and special occasions",
    image: "/assets/barclet.png",
    featured: false,
  },
  {
    id: "mangalsutras",
    name: "Mangalsutras",
    description: "Traditional mangalsutras with modern designs",
    image: "/assets/manglasutra.png",
    featured: false,
  },
  {
    id: "chains",
    name: "Chains",
    description: "Gold chains in various thicknesses and styles",
    image: "/assets/chain.png",
    featured: false,
  },
];



export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
};
