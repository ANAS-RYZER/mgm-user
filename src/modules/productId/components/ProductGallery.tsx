import { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, Share2, Sparkles } from "lucide-react";
import { scaleInVariants } from "@/lib/animations";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  discount: number;
  selectedImageIndex: number;
  onSelectImageIndex: (index: number | ((prev: number) => number)) => void;
  onShareClick: () => void;
  onImageClick: () => void;
}

export default function ProductGallery({
  images,
  productName,
  isNew,
  isBestSeller,
  discount,
  selectedImageIndex,
  onSelectImageIndex,
  onShareClick,
  onImageClick,
}: ProductGalleryProps) {
  const touchStartRef = useRef<number | null>(null);
  const touchMovedRef = useRef<number | null>(null);

  function onTouchStart(e: React.TouchEvent) {
    touchStartRef.current = e.touches[0]?.clientX ?? null;
    touchMovedRef.current = null;
  }

  function onTouchMove(e: React.TouchEvent) {
    touchMovedRef.current = e.touches[0]?.clientX ?? null;
  }

  function onTouchEnd() {
    if (touchStartRef.current == null || touchMovedRef.current == null) return;
    const delta = touchMovedRef.current - touchStartRef.current;
    const threshold = 40;
    if (delta > threshold) {
      onSelectImageIndex((i) => (i === 0 ? images.length - 1 : i - 1));
    } else if (delta < -threshold) {
      onSelectImageIndex((i) => (i === images.length - 1 ? 0 : i + 1));
    }
    touchStartRef.current = null;
    touchMovedRef.current = null;
  }

  return (
    <motion.div
      variants={scaleInVariants}
      initial="initial"
      animate="animate"
      className="lg:col-span-7 space-y-4"
    >
      {/* Main Image */}
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-cream to-cream-dark shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <button
          onClick={onImageClick}
          className="w-full h-full"
          aria-label="Open image viewer"
        >
          <Image
            src={images[selectedImageIndex] || "/assets/placeholder.jpg"}
            alt={productName}
            fill
            className="object-cover cursor-zoom-in"
            priority
          />
        </button>

        {images.length > 1 && (
          <>
            <button
              onClick={() =>
                onSelectImageIndex((prev) =>
                  prev === 0 ? images.length - 1 : prev - 1,
                )
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-background/95 rounded-full hover:bg-background transition-all shadow-lg hover:scale-110"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() =>
                onSelectImageIndex((prev) =>
                  prev === images.length - 1 ? 0 : prev + 1,
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-background/95 rounded-full hover:bg-background transition-all shadow-lg hover:scale-110"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {isNew && (
            <span className="bg-gold text-foreground text-xs px-4 py-1.5 rounded-full font-semibold shadow-md">
              New Arrival
            </span>
          )}
          {isBestSeller && (
            <span className="bg-primary text-primary-foreground text-xs px-4 py-1.5 rounded-full font-semibold shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Best Seller
            </span>
          )}
          {/* {discount > 0 && (
            <span className="bg-destructive text-destructive-foreground text-xs px-4 py-1.5 rounded-full font-semibold shadow-md">
              {discount}% OFF
            </span>
          )} */}
        </div>

        {/* Actions overlay */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button
            className="p-3 bg-background/95 rounded-full hover:bg-background transition-all shadow-lg hover:scale-110"
            aria-label="Add to wishlist"
          >
            <Heart className="w-5 h-5" />
          </button>
          <button
            onClick={onShareClick}
            className="p-3 bg-background/95 rounded-full hover:bg-background transition-all shadow-lg hover:scale-110"
            aria-label="Share product"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 justify-center">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => onSelectImageIndex(index)}
              className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all hover:scale-105 ${
                selectedImageIndex === index
                  ? "border-amber-500 ring-2 ring-amber-200"
                  : "border-border/50 hover:border-amber-300"
              }`}
            >
              <Image
                src={img}
                alt={`${productName} view ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Return selected index for lightbox */}
      <input type="hidden" value={selectedImageIndex} />
    </motion.div>
  );
}
