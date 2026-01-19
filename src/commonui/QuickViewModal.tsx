"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/products";
import { useWishlist } from "@/lib/use-wishlist";
import Link from "next/link";

interface QuickViewModalProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
}

const QuickViewModal = ({ product, isOpen, onClose }: QuickViewModalProps) => {
  const wishlist = useWishlist();
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/60 z-50"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="fixed left-1/2 top-1/2 z-[60] -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-background rounded-2xl shadow-2xl p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="quickview-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="w-1/3">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="w-full h-28 object-cover rounded-lg"
                />
              </div>
              <div className="flex-1">
                <h3
                  id="quickview-title"
                  className="font-display text-lg font-semibold text-foreground"
                >
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {formatPrice(product.price)}
                </p>
                <p className="text-sm text-muted-foreground mt-3 line-clamp-3">
                  {product.description}
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <Button
                    onClick={() => {
                      wishlist.toggle(Number(product.id));
                    }}
                    className="relative bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 hover:from-yellow-400 hover:via-yellow-500 hover:to-yellow-600 text-foreground shadow-lg hover:shadow-xl border border-yellow-200/60 hover:border-yellow-300/80 transition-all duration-300 transform hover:scale-105 overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center">
                      <Heart
                        className={`w-4 h-4 mr-2 ${wishlist.isIn(Number(product.id)) ? "text-red-500" : ""}`}
                      />
                      {wishlist.isIn(Number(product.id)) ? "Saved" : "Wishlist"}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 via-yellow-200/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/30 via-yellow-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/30 via-transparent to-yellow-600/30"></div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-yellow-300/20 opacity-60"></div>
                  </Button>

                  <Link href={`/product/${product.id}`}>
                    <Button 
                      variant="outline"
                      className="relative bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 hover:from-yellow-400 hover:via-yellow-500 hover:to-yellow-600 text-foreground shadow-lg hover:shadow-xl border border-yellow-200/60 hover:border-yellow-300/80 transition-all duration-300 transform hover:scale-105 overflow-hidden group"
                    >
                      <span className="relative z-10">View Details</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 via-yellow-200/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/30 via-yellow-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/30 via-transparent to-yellow-600/30"></div>
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-yellow-300/20 opacity-60"></div>
                    </Button>
                  </Link>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-muted ml-2"
                aria-label="Close quick view"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QuickViewModal;
