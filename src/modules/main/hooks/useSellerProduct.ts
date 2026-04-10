import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/httpClient";
import type { Product } from "@/lib/product";

const PLACEHOLDER_IMAGE = "/placeholder.svg";

/** Top ordered products — flat shape from `/userproducts/bestsellers` */
export interface SellerApiItem {
  orderCount: number;
  sku: string;
  name: string;
  image: string;
  categories: string;
  /** Present when API includes it — preferred for `/product/[id]` detail calls */
  _id?: string;
}

export interface SellerApiResponse {
  message: string;
  data: SellerApiItem[];
}

function mapSellerItemToProduct(item: SellerApiItem): Product {
  const id =
    (item._id && item._id.trim()) ||
    (item.sku?.trim() !== "" ? item.sku.trim() : item.name);
  const rawImage =
    typeof item.image === "string" && item.image.trim() !== ""
      ? item.image
      : PLACEHOLDER_IMAGE;
  const category =
    typeof item.categories === "string" ? item.categories : "";

  const metalLabel =
    category.length > 0
      ? category.charAt(0).toUpperCase() + category.slice(1)
      : "Jewelry";

  return {
    id,
    name: item.name?.trim() ? item.name : "Product",
    description: "",
    price: 0,
    originalPrice: 0,
    image: rawImage,
    category,
    metal: metalLabel,
    weight: "",
    purity: "",
    karatage: "",
    goldSpecs: {
      karat: "",
      goldWeight: "",
      grossWeight: "",
      purity: "",
      makingCharges: "",
    },
  };
}

export async function getSellerProducts(): Promise<Product[]> {
  const { data } = await apiClient.get<SellerApiResponse>(
    "/userproducts/bestsellers"
  );
  const list = data?.data ?? [];
  return list.map(mapSellerItemToProduct);
}

export function useSellerProducts() {
  return useQuery({
    queryKey: ["userproducts", "bestsellers"],
    queryFn: getSellerProducts,
  });
}
