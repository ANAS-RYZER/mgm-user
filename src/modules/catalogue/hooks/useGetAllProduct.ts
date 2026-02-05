"use client";

import { useState, useEffect, useCallback } from "react";
import type { Product } from "@/lib/products";
import { getProductsUserAll } from "@/modules/productId/hooks/products.api";
import { mapApiProductToProduct } from "@/modules/productId/lib/mapProduct";

export interface UseGetAllProductResult {
  products: Product[];
  pagination: {
    page: number;
    limit: number;
    currentPage: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  } | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useGetAllProduct(params?: {
  page?: number;
  limit?: number;
  search?: string;
}): UseGetAllProductResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<UseGetAllProductResult["pagination"]>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await getProductsUserAll({
        page: params?.page,
        limit: params?.limit,
        search: params?.search?.trim() || undefined,
      });
      setProducts(res.data.map(mapApiProductToProduct));
      setPagination({
        page: res.pagination.page,
        limit: res.pagination.limit,
        currentPage: res.pagination.currentPage,
        totalCount: res.pagination.totalCount,
        totalPages: res.pagination.totalPages,
        hasNextPage: res.pagination.hasNextPage,
        hasPreviousPage: res.pagination.hasPreviousPage,
      });
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      setProducts([]);
      setPagination(null);
    } finally {
      setIsLoading(false);
    }
  }, [params?.page, params?.limit, params?.search]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, pagination, isLoading, error, refetch: fetchProducts };
}
