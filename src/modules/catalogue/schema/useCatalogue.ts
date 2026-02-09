"use client";

// NOTE:
// This file previously contained a complex hook for catalogue data + filters.
// The catalogue page now fetches data directly and manages its own filters,
// so this hook is intentionally reduced to a minimal, no-op implementation
// to avoid unused complexity while keeping the export available.

import { formatPrice } from "@/lib/products";

export function useCatalogue() {
  return {
    products: [],
    allProducts: [],
    isLoading: false,
    error: null as Error | null,
    refetch: () => {},

    currentPage: 1,
    setCurrentPage: (_page: number) => {},
    totalPages: 1,

    searchQuery: "",
    setSearchQuery: (_value: string) => {},
    sortBy: "featured",
    setSortBy: (_value: string) => {},
    viewMode: "grid" as "grid" | "list",

    categories: [] as { id: string; name: string; count?: number }[],
    selectedCategories: [] as string[],
    toggleCategory: (_id: string) => {},
    metals: [] as string[],
    selectedMetals: [] as string[],
    toggleMetal: (_metal: string) => {},
    collections: [] as { id: string; label: string }[],
    selectedCollections: [] as string[],
    toggleCollection: (_id: string) => {},
    priceRange: [0, 0] as [number, number],
    setPriceRange: (_range: [number, number]) => {},
    maxProductPrice: 0,
    activeFiltersCount: 0,
    formatPrice,
  };
}
