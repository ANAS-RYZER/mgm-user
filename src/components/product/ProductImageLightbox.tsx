import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

interface ProductImageLightboxProps {
  isOpen: boolean;
  images: string[];
  selectedIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSelectImage: (index: number) => void;
  productName: string;
}

export default function ProductImageLightbox({
  isOpen,
  images,
  selectedIndex,
  onClose,
  onNext,
  onPrev,
  onSelectImage,
  productName,
}: ProductImageLightboxProps) {
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
      onPrev();
    } else if (delta < -threshold) {
      onNext();
    }
    touchStartRef.current = null;
    touchMovedRef.current = null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/80 z-50"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-6"
          >
            <div
              className="relative w-full max-w-4xl h-[80vh]"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <Image
                src={images[selectedIndex] || "/assets/placeholder.jpg"}
                alt={`${productName} - image ${selectedIndex + 1}`}
                fill
                className="object-contain bg-black rounded-lg"
                priority
              />

              {/* Dot indicators */}
              <div className="absolute left-0 right-0 bottom-6 flex justify-center gap-2">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectImage(idx);
                    }}
                    className={`w-2 h-2 rounded-full ${selectedIndex === idx ? "bg-white" : "bg-white/40"}`}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Previous button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPrev();
                }}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-background/80 rounded-full hover:bg-background shadow-lg"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-background/80 rounded-full hover:bg-background shadow-lg"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Close button */}
              <button
                onClick={onClose}
                aria-label="Close image viewer"
                className="absolute right-3 top-3 p-2 bg-background/80 rounded-full hover:bg-background shadow-lg"
              >
                <span className="sr-only">Close</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
