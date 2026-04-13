// hooks/useGetProductsUserAll.ts

import { useQuery } from "@tanstack/react-query";
import {
  GetProductsUserAllParams,
  GetProductsUserAllResponse,
} from "@/modules/productId/schema/products.types";
import api from "@/lib/httpClient";

export async function getProductsUserAll(
  params?: GetProductsUserAllParams
): Promise<GetProductsUserAllResponse | null> {
  try {
    const response = await api.get<GetProductsUserAllResponse>(
      `/userproducts/all`,
      { params }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function useGetProductsUserAll(
  params?: GetProductsUserAllParams
) {
  return useQuery<GetProductsUserAllResponse>({
    queryKey: ["products", JSON.stringify(params)],
    queryFn: async () => {
      const res = await getProductsUserAll(params);
      if (!res) throw new Error("Failed to fetch products");
      return res;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
  });
}