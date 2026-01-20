"use client";

import { Search, SlidersHorizontal, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ActiveFilters from "./ActiveFilters";

interface CatalogueToolbarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (value: "grid" | "list") => void;
  activeFiltersCount: number;
  onOpenFilters: () => void;
  // For ActiveFilters
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

export default function CatalogueToolbar({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  activeFiltersCount,
  onOpenFilters,
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
}: CatalogueToolbarProps) {
  return (
    <Card className="bg-background/95 backdrop-blur-md border-border/50 shadow-xl mb-8">
      <div className="p-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Left Section - Search & Filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1 w-full lg:w-auto">
            {/* Search Bar Wrapper - Luxury Double Border Transition */}
            <div className="relative flex-1 w-full sm:max-w-md group">
              {/* The Outer Frame (The Dark Border that appears on click) */}
              <div className="
                p-[2.5px] 
                rounded-[18px] 
                transition-all duration-300 ease-out
                border border-transparent
                group-focus-within:border-[#2D1B24]
              ">
                {/* The Inner Container */}
                <div className="
                  relative flex items-center 
                  bg-white rounded-[16px] 
                  border border-[#E0E0E0] 
                  h-14 overflow-hidden
                  transition-all duration-300
                ">
                  <Search className="absolute left-5 w-5 h-5 text-muted-foreground/30 group-focus-within:text-foreground transition-colors" />
                  <Input
                    placeholder="Search luxury jewelry..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="
                      pl-14 pr-6 h-full w-full
                      bg-transparent
                      border-none
                      text-foreground
                      placeholder:text-muted-foreground/50
                      focus-visible:ring-0 
                      focus-visible:ring-offset-0
                    "
                  />
                </div>
              </div>
            </div>

            {/* Mobile Filter Button */}
            <Button
              variant="outline"
              onClick={onOpenFilters}
              className="lg:hidden w-full sm:w-auto"
              size="lg"
            >
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </div>

          {/* Right Section - View Mode & Sort */}
          <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center bg-muted/30 rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-md h-10 w-10 p-0"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-md h-10 w-10 p-0"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3 flex-1 sm:flex-initial">
              <span className="text-sm font-body text-muted-foreground hidden sm:inline">
                Sort
              </span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48 h-10 border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg bg-background/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-border/50">
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest Arrivals</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        <ActiveFilters
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
      </div>
    </Card>
  );
}
