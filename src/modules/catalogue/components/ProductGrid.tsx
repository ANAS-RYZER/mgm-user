"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ProductCard from "@/commonui/ProductCard";
import ProductListItem from "./ProductListItem";
import { Product } from "@/lib/products";

interface ProductGridProps {
  products: Product[];
  viewMode: "grid" | "list";
}

export function ProductGrid({ products, viewMode }: ProductGridProps) {
  return (
    <div
      className={
        viewMode === "grid"
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
          : "space-y-6"
      }
    >
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="group"
        >
          {viewMode === "grid" ? (
            <div className="relative transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 gap-2">
              <ProductCard product={product} index={index} />
              {/* Hover Overlay */}
              {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                <Button className="w-full bg-gold hover:bg-gold-dark text-foreground shadow-lg" onClick={()=> `product/${product.id}`}>
                  Quick View
                </Button>
              </div> */}
            </div>
          ) : (
            <ProductListItem product={product} />
          )}
        </motion.div>
      ))}
    </div>
  );
}
