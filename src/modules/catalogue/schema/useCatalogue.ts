"use client";

import { useState, useMemo, useCallback } from "react";
import { useDebounce } from "../../../hooks/useDebounce";
import { useGetAllProduct } from "../hooks/useGetAllProduct";
import {
  useCatalogueFilters,
  METALS,
  COLLECTIONS,
} from "../../productId/hooks/useCatalogueFilters";
import { formatPrice } from "@/lib/products";

const SEARCH_DEBOUNCE_MS = 400;

export function useCatalogue() {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, SEARCH_DEBOUNCE_MS);

  const { products, isLoading, error, refetch } = useGetAllProduct({
    search: debouncedSearch !== "" ? debouncedSearch : undefined,
  });
  const filters = useCatalogueFilters(products);

  const clearFilters = useCallback(() => {
    filters.clearFilters();
    setSearchQuery("");
  }, [filters]);

  const categories = useMemo(() => {
    const countByCategory = new Map<string, number>();
    for (const p of products) {
      const c = p.category?.trim() || "Uncategorized";
      countByCategory.set(c, (countByCategory.get(c) ?? 0) + 1);
    }
    return Array.from(countByCategory.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([id, count]) => ({
        id,
        name: id,
        count,
      }));
  }, [products]);

  return {
    // Data (from API, mapped once in useGetAllProduct)
    products: filters.paginatedProducts,
    allProducts: products,
    isLoading,
    error,
    refetch,

    // Pagination
    currentPage: filters.currentPage,
    setCurrentPage: filters.setCurrentPage,
    totalPages: filters.totalPages,

    // Search (backend API, debounced)
    searchQuery,
    setSearchQuery,
    sortBy: filters.sortBy,
    setSortBy: filters.setSortBy,
    viewMode: filters.viewMode,

    // Filters (for FilterSidebar)
    categories,
    selectedCategories: filters.selectedCategories,
    toggleCategory: filters.toggleCategory,
    metals: METALS,
    selectedMetals: filters.selectedMetals,
    toggleMetal: filters.toggleMetal,
    collections: COLLECTIONS,
    selectedCollections: filters.selectedCollections,
    toggleCollection: filters.toggleCollection,
    priceRange: filters.priceRange,
    setPriceRange: filters.setPriceRange,
    maxProductPrice: filters.maxProductPrice,
    clearFilters,
    activeFiltersCount: filters.activeFiltersCount,
    formatPrice,
  };
}
