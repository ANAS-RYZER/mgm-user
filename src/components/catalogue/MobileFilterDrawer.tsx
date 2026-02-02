"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import FilterSidebar from "@/commonui/FilterSidebar";
import { categories, formatPrice } from "@/lib/products";
import { drawerLeftVariants } from "@/lib/animations";
import { METALS, COLLECTIONS } from "@/hooks/products/useCatalogueFilters";

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategories: string[];
  selectedMetals: string[];
  selectedCollections: string[];
  priceRange: number[];
  maxProductPrice: number;
  activeFiltersCount: number;
  toggleCategory: (id: string) => void;
  toggleMetal: (metal: string) => void;
  toggleCollection: (id: string) => void;
  setPriceRange: (range: number[]) => void;
  clearFilters: () => void;
}

export default function MobileFilterDrawer({
  isOpen,
  onClose,
  selectedCategories,
  selectedMetals,
  selectedCollections,
  priceRange,
  maxProductPrice,
  activeFiltersCount,
  toggleCategory,
  toggleMetal,
  toggleCollection,
  setPriceRange,
  clearFilters,
}: MobileFilterDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            variants={drawerLeftVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed left-0 top-0 h-full w-80 bg-background z-50 lg:hidden overflow-y-auto"
          >
            <div className="p-6 space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-lg font-bold uppercase tracking-wider">
                  Filters
                </h3>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary hover:underline"
                >
                  Clear All Filters
                </button>
              )}

              <FilterSidebar
                categories={categories}
                selectedCategories={selectedCategories}
                toggleCategory={toggleCategory}
                metals={METALS}
                selectedMetals={selectedMetals}
                toggleMetal={toggleMetal}
                collections={COLLECTIONS}
                selectedCollections={selectedCollections}
                toggleCollection={toggleCollection}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                maxPrice={maxProductPrice}
                clearFilters={clearFilters}
                activeFiltersCount={activeFiltersCount}
                formatPrice={formatPrice}
              />

              <Button onClick={onClose} className="w-full h-12">
                Apply Filters
              </Button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
