"use client";

import { useState, useEffect, useCallback } from "react";
import type { Product } from "@/lib/products";
import { getProductById } from "@/modules/productId/hooks/products.api";
import { mapApiProductToProduct } from "@/modules/productId/lib/mapProduct";

export interface UseProductByIdResult {
  product: Product | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useProductById(id: string | undefined): UseProductByIdResult {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(Boolean(id));
  const [error, setError] = useState<Error | null>(null);

  const fetchProduct = useCallback(async () => {
    if (!id) {
      setProduct(null);
      setIsLoading(false);
      setError(null);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const apiProduct = await getProductById(id);
      setProduct(mapApiProductToProduct(apiProduct));
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      setProduct(null);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return { product, isLoading, error, refetch: fetchProduct };
}
