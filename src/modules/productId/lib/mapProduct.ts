import type { Product, StoneInfo } from "@/lib/products";
import type { ApiProduct } from "@/modules/productId/schema/products.types";

const PLACEHOLDER_IMAGE = "/placeholder.svg";

export function mapApiProductToProduct(api: ApiProduct): Product {
  const rawImage =
    api.image ?? (api.gallery?.length ? api.gallery[0] : "");
  const image =
    typeof rawImage === "string" && rawImage.trim() !== ""
      ? rawImage
      : PLACEHOLDER_IMAGE;
  const images = api.gallery?.length ? api.gallery : (api.image ? [api.image] : []);

  const stones: StoneInfo[] = (api.stoneSpecs ?? []).map((s) => ({
    type: s.stoneName,
    count: s.quantity,
    cut: s.cut,
    clarity: s.clarity,
    color: typeof s.color === "object" && s.color?.value ? s.color.value : undefined,
  }));

  const discountedPrice =
    api.discountedPrice && api.discountedPrice > 0 ? api.discountedPrice : undefined;

  // `Product.originalPrice` is required (number), so ensure we never return `undefined`.
  const originalPrice = api.mrpPrice ?? discountedPrice ?? 0;
  const price = discountedPrice ?? originalPrice;

  return {
    id: api._id,
    name: api.name,
    description: api.description ?? "",
    price,
    originalPrice: Number(originalPrice),
    image,
    images: images.length ? images : undefined,
    category: api.categories ?? "",
    metal: api.goldSpecs?.metal
      ? `${api.goldSpecs.metal} ${api.goldSpecs.karat ?? ""}`.trim()
      : "",
    weight: String(api.goldSpecs?.grossWeight ?? api.goldSpecs?.goldWeight ?? ""),
    goldWeight: api.goldSpecs?.goldWeight != null ? String(api.goldSpecs.goldWeight) : undefined,
    purity: api.goldSpecs?.purity ?? "",
    karatage: api.goldSpecs?.karat ?? "",
    stones: stones.length ? stones : undefined,
    makingCharges:
      api.goldSpecs?.makingCharges != null
        ? String(api.goldSpecs.makingCharges)
        : undefined,
    goldSpecs: {
      karat: api.goldSpecs?.karat ?? "",
      goldWeight: api.goldSpecs?.goldWeight != null ? String(api.goldSpecs.goldWeight) : "",
      grossWeight: api.goldSpecs?.grossWeight != null ? String(api.goldSpecs.grossWeight) : "",
      purity:  "916 Hallmarked",
      makingCharges: api.goldSpecs?.makingCharges != null ? String(api.goldSpecs.makingCharges) : "",
    },
    isDiamond: stones.some((s) => s.type?.toLowerCase().includes("diamond")),
    isWishlisted: api.isWishlisted ?? false,
  };
}
