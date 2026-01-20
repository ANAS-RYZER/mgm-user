"use client";

import { useState } from "react";
import Header from "@/commonui/Header";
import Footer from "@/commonui/Footer";
import FilterSidebar from "@/commonui/FilterSidebar";
import AnimatedPage from "@/commonui/AnimatedPage";
import { categories, formatPrice } from "@/lib/products";

import { useCatalogueFilters, METALS, COLLECTIONS } from "./hooks/useCatalogueFilters";
import {
  CatalogueHero,
  CatalogueToolbar,
  MobileFilterDrawer,
  ProductGrid,
  Pagination,
  EmptyState,
} from "./components";

export default function CataloguePage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const {
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
    maxProductPrice,
    paginatedProducts,
    totalPages,
    activeFiltersCount,
    toggleCategory,
    toggleMetal,
    toggleCollection,
    clearFilters,
  } = useCatalogueFilters();

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
            viewMode={viewMode}
            setViewMode={setViewMode}
            activeFiltersCount={activeFiltersCount}
            onOpenFilters={() => setIsFilterOpen(true)}
            selectedCategories={selectedCategories}
            selectedMetals={selectedMetals}
            selectedCollections={selectedCollections}
            priceRange={priceRange}
            maxProductPrice={maxProductPrice}
            toggleCategory={toggleCategory}
            toggleMetal={toggleMetal}
            toggleCollection={toggleCollection}
            setPriceRange={setPriceRange}
            clearFilters={clearFilters}
          />

          <div className="flex gap-8">
            {/* Desktop Sidebar */}
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
                  setPriceRange={setPriceRange}
                  maxPrice={maxProductPrice}
                  clearFilters={clearFilters}
                  activeFiltersCount={activeFiltersCount}
                  formatPrice={formatPrice}
                />
              </div>
            </aside>

            {/* Mobile Filter Drawer */}
            <MobileFilterDrawer
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
              selectedCategories={selectedCategories}
              selectedMetals={selectedMetals}
              selectedCollections={selectedCollections}
              priceRange={priceRange}
              maxProductPrice={maxProductPrice}
              activeFiltersCount={activeFiltersCount}
              toggleCategory={toggleCategory}
              toggleMetal={toggleMetal}
              toggleCollection={toggleCollection}
              setPriceRange={setPriceRange}
              clearFilters={clearFilters}
            />

            {/* Products Section */}
            <div className="flex-1 min-w-0">
              {paginatedProducts.length > 0 ? (
                <>
                  <ProductGrid products={paginatedProducts} viewMode={viewMode} />
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
