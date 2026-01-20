"use client";

import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Product, formatPrice } from "@/lib/products";

interface ProductListItemProps {
  product: Product;
}

export default function ProductListItem({ product }: ProductListItemProps) {
  return (
    <Card className="flex flex-col sm:flex-row gap-6 p-6 transition-all duration-300 border-border/50 hover:border-primary/50 bg-background/80 backdrop-blur-sm group hover:shadow-2xl hover:-translate-y-1">
      <div className="w-full sm:w-32 h-48 sm:h-32 rounded-xl overflow-hidden flex-shrink-0 transform transition-transform duration-500 group-hover:scale-110">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground capitalize mt-1">
              {product.category}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            {product.isNew && (
              <Badge
                variant="secondary"
                className="text-xs bg-gold/20 text-gold-dark border-gold/30"
              >
                New
              </Badge>
            )}
            {product.isBestSeller && (
              <Badge
                variant="outline"
                className="text-xs border-primary/30 text-primary"
              >
                Bestseller
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-gold text-gold" />
            <span className="text-sm font-medium">
              {(product as any).rating || 4.5}
            </span>
          </div>
          <Separator orientation="vertical" className="h-4 hidden sm:block" />
          <span className="text-sm text-muted-foreground">
            {product.metal} • {product.purity}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xl font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through ml-2">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <Button
            size="sm"
            className="bg-gradient-mgm hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg w-full sm:w-auto"
          >
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
}
