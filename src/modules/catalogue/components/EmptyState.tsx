"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface EmptyStateProps {
  searchQuery: string;
  onClearSearch: () => void;
  onClearFilters: () => void;
}

export  function EmptyState({
  searchQuery,
  onClearSearch,
  onClearFilters,
}: EmptyStateProps) {
  return (
    <div className="text-center py-20">
      <Card className="max-w-lg mx-auto bg-background/80 backdrop-blur-sm border-border/50">
        <div className="p-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted/50 flex items-center justify-center">
            <Search className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-2xl font-elegant font-bold text-foreground mb-3">
            No luxury pieces found
          </h3>
          <p className="text-muted-foreground mb-8 text-lg">
            {searchQuery
              ? `No jewelry matches your search "${searchQuery}"`
              : "No pieces match your current filters"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {searchQuery && (
              <Button
                variant="outline"
                onClick={onClearSearch}
                className="border-primary/30 hover:bg-primary/10 transition-all duration-300 hover:scale-105"
              >
                Clear Search
              </Button>
            )}
            <Button
              onClick={onClearFilters}
              className="bg-gradient-mgm hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
