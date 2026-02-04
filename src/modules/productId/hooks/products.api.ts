import { apiClient } from "@/lib/httpClient";
import type {
  GetProductsUserAllResponse,
  GetProductsUserAllParams,
} from "../schema/products.types";

import type { ApiProduct } from "../schema/products.types";

const PRODUCTS_USER_ALL = "/products/user/all";

export async function getProductsUserAll(
  params?: GetProductsUserAllParams
): Promise<GetProductsUserAllResponse> {
  const { data } = await apiClient.get<GetProductsUserAllResponse>(
    PRODUCTS_USER_ALL,
    { params }
  );
  return data;
}

export async function getProductById(id: string): Promise<ApiProduct> {
  const { data } = await apiClient.get<ApiProduct>(`/products/user/${id}/detail`);
  return data;
}
