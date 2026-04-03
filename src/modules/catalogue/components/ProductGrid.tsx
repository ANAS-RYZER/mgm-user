"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
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
              <Suspense
                fallback={
                  <div className="border border-black/10 rounded-xl shadow-sm p-2 h-[420px] animate-pulse bg-muted/40" />
                }
              >
                <ProductCard product={product} index={index} />
              </Suspense>
            </div>
          ) : (
            <ProductListItem product={product} />
          )}
        </motion.div>
      ))}
    </div>
  );
}
