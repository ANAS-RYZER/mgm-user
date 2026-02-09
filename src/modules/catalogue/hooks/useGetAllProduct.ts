import { apiClient } from "@/lib/httpClient";
import { GetProductsUserAllParams, GetProductsUserAllResponse } from "@/modules/productId/schema/products.types";

export async function getProductsUserAll(
  params?: GetProductsUserAllParams
): Promise<GetProductsUserAllResponse | null> {
  try {
    const response = await apiClient.get<GetProductsUserAllResponse>(
      `/userproducts/all`,
      { params }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}