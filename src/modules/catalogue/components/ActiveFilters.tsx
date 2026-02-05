"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { COLLECTIONS } from "@/modules/productId/hooks/useCatalogueFilters";
import { categories, formatPrice } from "@/lib/products";

interface ActiveFiltersProps {
  selectedCategories: string[];
  selectedMetals: string[];
  selectedCollections: string[];
  priceRange: number[];
  maxProductPrice: number;
  toggleCategory: (id: string) => void;
  toggleMetal: (metal: string) => void;
  toggleCollection: (id: string) => void;
  setPriceRange: (range: number[]) => void;
  clearFilters: () => void;
}

export default function ActiveFilters({
  selectedCategories,
  selectedMetals,
  selectedCollections,
  priceRange,
  maxProductPrice,
  toggleCategory,
  toggleMetal,
  toggleCollection,
  setPriceRange,
  clearFilters,
}: ActiveFiltersProps) {
  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedMetals.length > 0 ||
    selectedCollections.length > 0 ||
    (priceRange?.[0] ?? 0) > 0 ||
    (priceRange?.[1] ?? maxProductPrice) < maxProductPrice;

  if (!hasActiveFilters) return null;

  return (
    <div className="mt-6 pt-6 border-t border-border/50">
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-sm font-body text-muted-foreground">
          Active filters:
        </span>

        {selectedCategories.map((cat) => (
          <Badge
            key={cat}
            variant="secondary"
            className="gap-1 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
          >
            {categories.find((c) => c.id === cat)?.name}
            <button
              onClick={() => toggleCategory(cat)}
              className="ml-1 hover:text-destructive transition-colors"
            >
              ×
            </button>
          </Badge>
        ))}

        {selectedMetals.map((metal) => (
          <Badge
            key={metal}
            variant="secondary"
            className="gap-1 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
          >
            {metal}
            <button
              onClick={() => toggleMetal(metal)}
              className="ml-1 hover:text-destructive transition-colors"
            >
              ×
            </button>
          </Badge>
        ))}

        {selectedCollections.map((col) => (
          <Badge
            key={col}
            variant="secondary"
            className="gap-1 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
          >
            {COLLECTIONS.find((c) => c.id === col)?.label}
            <button
              onClick={() => toggleCollection(col)}
              className="ml-1 hover:text-destructive transition-colors"
            >
              ×
            </button>
          </Badge>
        ))}

        {((priceRange?.[0] ?? 0) > 0 || (priceRange?.[1] ?? maxProductPrice) < maxProductPrice) && (
          <Badge
            variant="secondary"
            className="gap-1 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
          >
            {formatPrice(priceRange?.[0] ?? 0)} - {formatPrice(priceRange?.[1] ?? maxProductPrice)}
            <button
              onClick={() => setPriceRange([0, maxProductPrice])}
              className="ml-1 hover:text-destructive transition-colors"
            >
              ×
            </button>
          </Badge>
        )}

        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-xs h-8 hover:bg-destructive/10 hover:text-destructive transition-colors"
        >
          Clear All
        </Button>
      </div>
    </div>
  );
}
