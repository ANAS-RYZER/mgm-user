import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";
import product7 from "@/assets/product-7.jpg";
import product8 from "@/assets/product-8.jpg";
import ringCategory from "@/assets/ring-category.jpg";
import earringCategory from "@/assets/earring-category.jpg";
import necklaceCategory from "@/assets/necklace-category.jpg";
import bangleCategory from "@/assets/bangle-category.jpg";
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
  count: number;
  featured: boolean;
}

export const categories: Category[] = [
  {
    id: "rings",
    name: "Rings",
    description: "Exquisite rings from traditional to contemporary designs",
    image: "/assets/ring.png",
    count: 24,
    featured: true,
  },
  {
    id: "necklaces",
    name: "Necklaces",
    description: "Elegant necklaces and chains for every occasion",
    image: "/assets/necklace.png",
    count: 18,
    featured: true,
  },
  {
    id: "earrings",
    name: "Earrings",
    description: "Beautiful earrings from studs to dangling designs",
    image: "/assets/earring.png",
    count: 32,
    featured: true,
  },
  {
    id: "bangles",
    name: "Bangles",
    description: "Traditional and modern bangles in gold and diamond",
    image: "/assets/bangles.png",
    count: 15,
    featured: true,
  },
  {
    id: "pendants",
    name: "Pendants",
    description: "Intricate pendants and lockets with precious stones",
    image: "/assets/pedanats.png",
    count: 20,
    featured: false,
  },
  {
    id: "bracelets",
    name: "Bracelets",
    description: "Stylish bracelets for everyday and special occasions",
    image: "/assets/barclet.png",
    count: 12,
    featured: false,
  },
  {
    id: "mangalsutras",
    name: "Mangalsutras",
    description: "Traditional mangalsutras with modern designs",
    image: "/assets/manglasutra.png",
    count: 8,
    featured: false,
  },
  {
    id: "chains",
    name: "Chains",
    description: "Gold chains in various thicknesses and styles",
    image: "/assets/chain.png",
    count: 16,
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
