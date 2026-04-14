import { apiClient } from "@/lib/httpClient";


import type { ApiProduct } from "../schema/products.types";




export async function getProductById(id: string): Promise<ApiProduct> {
  const { data } = await apiClient.get<ApiProduct>(`/userproducts/${id}/detail`);
  return data;
}
