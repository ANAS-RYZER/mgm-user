import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/httpClient";
import type { Product } from "@/lib/product";

const PLACEHOLDER_IMAGE = "/placeholder.svg";

export interface FeaturedApiProduct {
  _id: string;
  name: string;
  image: string;
  categories: string;
}

export interface FeaturedApiItem {
  wishlistCount: number;
  productId: string;
  product: FeaturedApiProduct;
}

export interface FeaturedApiResponse {
  message: string;
  data: FeaturedApiItem[];
}

function mapFeaturedItemToProduct(item: FeaturedApiItem): Product {
  const p = item.product;
  const id = p?._id ?? item.productId;
  const rawImage =
    typeof p?.image === "string" && p.image.trim() !== "" ? p.image : PLACEHOLDER_IMAGE;
  const category =
    typeof p?.categories === "string" ? p.categories : "";

  const metalLabel =
    category.length > 0
      ? category.charAt(0).toUpperCase() + category.slice(1)
      : "Jewelry";

  return {
    id,
    name: p?.name ?? "Product",
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

export async function getFeaturedProducts(): Promise<Product[]> {
  const { data } = await apiClient.get<FeaturedApiResponse>("/userproducts/featured");
  const list = data?.data ?? [];
  return list.map(mapFeaturedItemToProduct);
}

export function useFeaturedProducts() {
  return useQuery({
    queryKey: ["userproducts", "featured"],
    queryFn: getFeaturedProducts,
  });
}
