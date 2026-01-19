"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Sparkles, Tag, Gem, IndianRupee } from "lucide-react";

interface Category { id: string; name: string; count?: number }
interface Collection { id: string; label: string }

interface Props {
  categories: Category[];
  selectedCategories: string[];
  toggleCategory: (id: string) => void;
  metals: string[];
  selectedMetals: string[];
  toggleMetal: (name: string) => void;
  collections: Collection[];
  selectedCollections: string[];
  toggleCollection: (id: string) => void;
  priceRange: number[];
  setPriceRange: (v: number[]) => void;
  maxPrice?: number;
  clearFilters: () => void;
  activeFiltersCount?: number;
  formatPrice?: (n: number) => string;
}

const FilterSidebar: React.FC<Props> = ({
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
  maxPrice = 300000,
  clearFilters,
  activeFiltersCount = 0,
  formatPrice = (n: number) => `₹${n.toLocaleString()}`,
}) => {
  return (
    <div 
      role="region" 
      aria-labelledby="filters-heading" 
      className="rounded-2xl border border-border/40 bg-gradient-to-br from-cream/90 to-background/95 backdrop-blur-sm p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300"
    >
      {/* Categories */}
      <div className="space-y-5 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Tag className="w-4 h-4 text-primary" />
          <h4 className="text-sm font-serif font-bold tracking-wide text-foreground uppercase">
            Category
          </h4>
        </div>
        <div className="space-y-3 pl-1">
          {categories.map((category) => (
            <label 
              key={category.id} 
              className="flex items-center gap-3 cursor-pointer group py-2 px-3 rounded-lg hover:bg-primary/5 transition-all duration-200"
            >
              <Checkbox
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => toggleCategory(category.id)}
                className="rounded-md border-primary/30 data-[state=checked]:bg-gradient-mgm data-[state=checked]:border-primary"
              />
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors flex-1">
                {category.name}
              </span>
              <Badge 
                variant="secondary" 
                className="ml-auto h-6 min-w-[32px] rounded-full bg-muted/50 text-muted-foreground border border-border/30 px-2.5 text-xs font-semibold group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/30 transition-all duration-200"
              >
                {category.count ?? 0}
              </Badge>
            </label>
          ))}
        </div>
      </div>

      <Separator className="border-border/40 my-8" />

      {/* Metals */}
      <div className="space-y-5 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Gem className="w-4 h-4 text-gold" />
          <h4 className="text-sm font-serif font-bold tracking-wide text-foreground uppercase">
            Gold Purity
          </h4>
        </div>
        <div className="space-y-3 pl-1">
          {metals.map((metal) => (
            <label 
              key={metal} 
              className="flex items-center gap-3 cursor-pointer group py-2 px-3 rounded-lg hover:bg-gold/5 transition-all duration-200"
            >
              <Checkbox
                checked={selectedMetals.includes(metal)}
                onCheckedChange={() => toggleMetal(metal)}
                className="rounded-md border-gold/30 data-[state=checked]:bg-gold data-[state=checked]:border-gold data-[state=checked]:text-foreground"
              />
              <span className="text-sm font-medium text-foreground group-hover:text-gold-dark transition-colors">
                {metal}
              </span>
              <div className="ml-auto w-2 h-2 rounded-full bg-gold opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-200" />
            </label>
          ))}
        </div>
      </div>

      <Separator className="border-border/40 my-8" />

      {/* Collections */}
      <div className="space-y-5 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-primary" />
          <h4 className="text-sm font-serif font-bold tracking-wide text-foreground uppercase">
            Special Collections
          </h4>
        </div>
        <div className="space-y-3 pl-1">
          {collections.map((collection) => (
            <label 
              key={collection.id} 
              className="flex items-center gap-3 cursor-pointer group py-2 px-3 rounded-lg hover:bg-primary/5 transition-all duration-200"
            >
              <Checkbox
                checked={selectedCollections.includes(collection.id)}
                onCheckedChange={() => toggleCollection(collection.id)}
                className="rounded-md border-primary/30 data-[state=checked]:bg-gradient-mgm data-[state=checked]:border-primary"
              />
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                {collection.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <Separator className="border-border/40 my-8" />

      {/* Price Range */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <IndianRupee className="w-4 h-4 text-primary" />
          <h4 className="text-sm font-serif font-bold tracking-wide text-foreground uppercase">
            Price Range
          </h4>
        </div>
        
        {/* Price Display Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-xl p-4 hover:border-primary/50 transition-colors duration-200">
            <p className="text-xs text-muted-foreground mb-1 font-medium uppercase tracking-wide">
              Minimum
            </p>
            <p className="text-base font-bold text-primary">
              {formatPrice(priceRange[0])}
            </p>
          </div>
          <div className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-xl p-4 hover:border-primary/50 transition-colors duration-200">
            <p className="text-xs text-muted-foreground mb-1 font-medium uppercase tracking-wide">
              Maximum
            </p>
            <p className="text-base font-bold text-primary">
              {formatPrice(priceRange[1])}
            </p>
          </div>
        </div>

        {/* Slider with Enhanced Styling */}
        <div className="px-1 py-4">
          <Slider 
            value={priceRange} 
            onValueChange={setPriceRange} 
            max={maxPrice} 
            step={5000} 
            className="mb-2" 
            aria-label="Price range"
          />
        </div>

        {/* Quick Price Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPriceRange([0, 50000])}
            className="border-border/40 hover:bg-primary/5 hover:border-primary/50 transition-all duration-200 text-xs h-9"
          >
            Under ₹50k
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPriceRange([50000, 100000])}
            className="border-border/40 hover:bg-primary/5 hover:border-primary/50 transition-all duration-200 text-xs h-9"
          >
            ₹50k - ₹1L
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPriceRange([100000, 200000])}
            className="border-border/40 hover:bg-primary/5 hover:border-primary/50 transition-all duration-200 text-xs h-9"
          >
            ₹1L - ₹2L
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPriceRange([200000, maxPrice])}
            className="border-border/40 hover:bg-primary/5 hover:border-primary/50 transition-all duration-200 text-xs h-9"
          >
            Above ₹2L
          </Button>
        </div>
      </div>

      {/* Bottom CTA */}
      {activeFiltersCount > 0 && (
        <div className="mt-8 pt-6 border-t border-border/30">
          <Button 
            onClick={clearFilters}
            variant="outline"
            className="w-full h-12 border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 hover:scale-105 font-semibold"
          >
            Reset All Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default FilterSidebar;