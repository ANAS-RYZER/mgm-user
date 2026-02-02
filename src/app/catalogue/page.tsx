"use client";

import { useState } from "react";
import Header from "@/commonui/Header";
import Footer from "@/commonui/Footer";
import AnimatedPage from "@/commonui/AnimatedPage";
import FilterSidebar from "@/commonui/FilterSidebar";

import { useCatalogue } from "../../hooks/products/useCatalogue";
import {
  CatalogueHero,
  CatalogueToolbar,
  ProductGrid,
  Pagination,
  EmptyState,
} from "../../components/catalogue";

export default function CataloguePage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const {
    products,
    isLoading,
    error,
    refetch,
    currentPage,
    setCurrentPage,
    totalPages,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    viewMode,
    categories,
    selectedCategories,
    toggleCategory,
    metals,
    selectedMetals,
    toggleMetal,
    collections,
    selectedCollections,
    toggleCollection,
    priceRange,
    setPriceRange,
    maxProductPrice,
    clearFilters,
    activeFiltersCount,
    formatPrice,
  } = useCatalogue();

  return (
    <AnimatedPage className="min-h-screen bg-background">
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
            onOpenFilters={() => setIsFilterOpen(true)}
            clearFilters={clearFilters}
          />

          <div className="flex gap-8">
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-20">
                <FilterSidebar
                  categories={categories}
                  selectedCategories={selectedCategories}
                  toggleCategory={toggleCategory}
                  metals={metals}
                  selectedMetals={selectedMetals}
                  toggleMetal={toggleMetal}
                  collections={collections}
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
                <div className="py-12 text-center text-muted-foreground">
                  Loading products…
                </div>
              ) : error ? (
                <div className="py-12 text-center">
                  <p className="text-destructive mb-2">Failed to load products.</p>
                  <button
                    type="button"
                    onClick={() => refetch()}
                    className="text-primary underline"
                  >
                    Try again
                  </button>
                </div>
              ) : products.length > 0 ? (
                <>
                  <ProductGrid products={products} viewMode={viewMode} />
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </>
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
