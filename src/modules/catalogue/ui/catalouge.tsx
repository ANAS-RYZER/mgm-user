"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Header from "@/commonui/Header";
import Footer from "@/commonui/Footer";
import AnimatedPage from "@/components/AnimatedPage";
import FilterSidebar from "@/commonui/FilterSidebar";

import { CatalogueHero } from "@/modules/catalogue/components/CatalogueHero";
import { CatalogueToolbar } from "@/modules/catalogue/components/CatalogueToolbar";
import { ProductGrid } from "@/modules/catalogue/components/ProductGrid";
import { EmptyState } from "@/modules/catalogue/components/EmptyState";
import { useDebounce } from "@/hooks/useDebounce";
import { getProductsUserAll } from "@/modules/catalogue/hooks/useGetAllProduct";
import { mapApiProductToProduct } from "@/modules/productId/lib/mapProduct";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/products";
import {
  METALS,
  COLLECTIONS,
} from "@/modules/productId/hooks/useCatalogueFilters";

const SEARCH_DEBOUNCE_MS = 400;
const DEFAULT_MAX_PRICE = 300000;

function normalizeMetalToPurity(metal: string): string {
  const match = metal.match(/(\d{2})\s*k/i);
  if (match) {
    return `${match[1]}K`;
  }
  const numberMatch = metal.match(/(\d{2})/);
  return numberMatch ? `${numberMatch[1]}K` : metal;
}

export default function Catalogue() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, SEARCH_DEBOUNCE_MS);

  const [sortBy, setSortBy] = useState("featured");
  const [viewMode] = useState<"grid" | "list">("grid");

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMetals, setSelectedMetals] = useState<string[]>([]);
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    0,
    DEFAULT_MAX_PRICE,
  ]);
  const [maxProductPrice] = useState(DEFAULT_MAX_PRICE);

  const activeFiltersCount =
    selectedCategories.length +
    selectedMetals.length +
    selectedCollections.length +
    (priceRange[0] > 0 || priceRange[1] < maxProductPrice ? 1 : 0);

  const clearFilters = useCallback(() => {
    setSelectedCategories([]);
    setSelectedMetals([]);
    setSelectedCollections([]);
    setPriceRange([0, maxProductPrice]);
    setSearchQuery("");
  }, [maxProductPrice]);

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

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const toggleMetal = (metal: string) => {
    setSelectedMetals((prev) =>
      prev.includes(metal) ? prev.filter((m) => m !== metal) : [...prev, metal],
    );
  };

  const toggleCollection = (collection: string) => {
    setSelectedCollections((prev) =>
      prev.includes(collection)
        ? prev.filter((c) => c !== collection)
        : [...prev, collection],
    );
  };

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = {
        search: debouncedSearch.trim() || undefined,
        category: selectedCategories[0],
        minPrice: priceRange[0] || undefined,
        maxPrice: priceRange[1] || undefined,
        purity: selectedMetals.length
          ? selectedMetals.map(normalizeMetalToPurity).join(",")
          : undefined,
      };

      const res = await getProductsUserAll(params);
      if (!res) {
        setProducts([]);
        setIsLoading(false);
        return;
      }
      let mapped = res.data.map(mapApiProductToProduct);

      switch (sortBy) {
        case "price-low":
          mapped.sort((a, b) => a.price - b.price);
          break;
        case "price-high":
          mapped.sort((a, b) => b.price - a.price);
          break;
        case "newest":
          mapped = mapped
            .filter((p) => p.isNew)
            .concat(mapped.filter((p) => !p.isNew));
          break;
        case "rating":
          mapped.sort(
            (a, b) => ((b as any).rating || 0) - ((a as any).rating || 0),
          );
          break;
        default:
          mapped = mapped
            .filter((p) => p.isBestSeller)
            .concat(mapped.filter((p) => !p.isBestSeller));
      }

      setProducts(mapped);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, [
    debouncedSearch,
    selectedCategories,
    selectedMetals,
    selectedCollections,
    priceRange,
    sortBy,
  ]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <AnimatedPage isLoading={isLoading} className="min-h-screen bg-background">
      <Header />

      <main className="pb-20">
        <CatalogueHero />

        <div className="container mx-auto px-4 -mt-8 relative z-20">
          <CatalogueToolbar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortBy={sortBy}
            setSortBy={setSortBy}
            activeFiltersCount={activeFiltersCount}
            onOpenFilters={() => setIsFilterOpen(!isFilterOpen)}
            clearFilters={clearFilters}
          />

          <div className="flex gap-8">
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-20">
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
                  setPriceRange={(v) => setPriceRange(v as [number, number])}
                  maxPrice={maxProductPrice}
                  clearFilters={clearFilters}
                  activeFiltersCount={activeFiltersCount}
                  formatPrice={formatPrice}
                />
              </div>
            </aside>

            <div className="flex-1 min-w-0">
              {isLoading ? (
                <AnimatedPage
                  isLoading={true}
                  className="min-h-screen bg-background"
                >
                  <div className="py-12 text-center text-muted-foreground">
                    Loading products…
                  </div>
                </AnimatedPage>
              ) : error ? (
                <div className="py-12 text-center">
                  <p className="text-destructive mb-2">
                    Failed to load products.
                  </p>
                  <button
                    type="button"
                    onClick={() => fetchProducts()}
                    className="text-primary underline"
                  >
                    Try again
                  </button>
                </div>
              ) : products.length > 0 ? (
                <ProductGrid products={products} viewMode={viewMode} />
              ) : (
                <EmptyState
                  searchQuery={searchQuery}
                  onClearSearch={() => setSearchQuery("")}
                  onClearFilters={clearFilters}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </AnimatedPage>
  );
}
