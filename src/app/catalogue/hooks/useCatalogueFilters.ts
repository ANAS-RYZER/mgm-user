"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { products } from "@/lib/products";

export const METALS = ["24K Gold", "22K Gold"];

export const COLLECTIONS = [
  { id: "lightweight", label: "Lightweight Jewellery" },
  { id: "diamond", label: "Diamond Collection" },
];

export function useCatalogueFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const maxProductPrice = Math.max(...products.map((p) => p.price), 300000);

  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([
  0,
  maxProductPrice ?? 0,
]);

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("category") ? [searchParams.get("category")!] : []
  );
  const [selectedMetals, setSelectedMetals] = useState<string[]>([]);
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 12;

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    // Filter by metal/karatage
    if (selectedMetals.length > 0) {
      result = result.filter((p) => selectedMetals.includes(p.metal));
    }

    // Filter by collections
    if (selectedCollections.includes("lightweight")) {
      result = result.filter((p) => p.isLightweight);
    }
    if (selectedCollections.includes("diamond")) {
      result = result.filter((p) => p.isDiamond);
    }

    // Filter by price
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result = result
          .filter((p) => p.isNew)
          .concat(result.filter((p) => !p.isNew));
        break;
      case "rating":
        result.sort(
          (a, b) => ((b as any).rating || 0) - ((a as any).rating || 0)
        );
        break;
      default:
        result = result
          .filter((p) => p.isBestSeller)
          .concat(result.filter((p) => !p.isBestSeller));
    }

    return result;
  }, [searchQuery, selectedCategories, selectedMetals, selectedCollections, priceRange, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    return filteredProducts.slice(startIndex, startIndex + productsPerPage);
  }, [filteredProducts, currentPage, productsPerPage]);

  // Toggle functions
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    setCurrentPage(1);
  };

  const toggleMetal = (metal: string) => {
    setSelectedMetals((prev) =>
      prev.includes(metal) ? prev.filter((m) => m !== metal) : [...prev, metal]
    );
    setCurrentPage(1);
  };

  const toggleCollection = (collection: string) => {
    setSelectedCollections((prev) =>
      prev.includes(collection)
        ? prev.filter((c) => c !== collection)
        : [...prev, collection]
    );
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedMetals([]);
    setSelectedCollections([]);
    setPriceRange([0, maxProductPrice]);
    setSearchQuery("");
    setCurrentPage(1);
    router.push("/catalogue");
  };

  const activeFiltersCount =
    selectedCategories.length +
    selectedMetals.length +
    selectedCollections.length +
    (priceRange[0] > 0 || priceRange[1] < maxProductPrice ? 1 : 0);

  return {
    // State
    searchQuery,
    setSearchQuery,
    priceRange,
    setPriceRange,
    selectedCategories,
    selectedMetals,
    selectedCollections,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    currentPage,
    setCurrentPage,
    
    // Computed
    maxProductPrice,
    filteredProducts,
    paginatedProducts,
    totalPages,
    activeFiltersCount,
    
    // Actions
    toggleCategory,
    toggleMetal,
    toggleCollection,
    clearFilters,
  };
}
