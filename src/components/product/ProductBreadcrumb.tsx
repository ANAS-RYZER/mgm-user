"use client";
import Link from "next/link";
import { motion } from "framer-motion";

interface ProductBreadcrumbProps {
  category: string;
  productName: string;
}

export default function ProductBreadcrumb({
  category,
  productName,
}: ProductBreadcrumbProps) {
  return (
    <div className="bg-gradient-to-r from-cream via-cream to-gold/10 py-4">
      <div className="container mx-auto px-4">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link
            href="/"
            className="hover:text-primary hover:underline transition-colors cursor-pointer"
          >
            Home
          </Link>
          <span>/</span>
          <Link
            href="/catalogue"
            className="hover:text-primary hover:underline transition-colors cursor-pointer"
          >
            Collections
          </Link>
          <span>/</span>
          <Link
            href={`/catalogue?category=${category}`}
            className="hover:text-primary hover:underline transition-colors capitalize cursor-pointer"
          >
            {category}
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">{productName}</span>
        </nav>
      </div>
    </div>
  );
}
