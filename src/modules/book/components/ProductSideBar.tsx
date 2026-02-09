import { useEffect, useState } from "react";
import Image from "next/image";
import { X, Plus, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppointmentProducts } from "@/lib/use-appointment-products";
import { getProductsUserAll } from "@/modules/catalogue/hooks/useGetAllProduct";
import { mapApiProductToProduct } from "@/modules/productId/lib/mapProduct";
import type { Product } from "@/lib/products";
import Link from "next/link";

const sampleProducts = [
  {
    id: 1,
    name: "Triangular Top Earrings with Red Gem & Chain Fringe",
    price: "71,758",
    purity: "Gold 22K",
    image: "/images/earrings-1.jpg",
  },
  {
    id: 2,
    name: "Triangular Top Earrings with Red Gem & Chain Fringe",
    price: "71,758",
    purity: "Gold 22K",
    image: "/images/earrings-1.jpg",
  },
  {
    id: 3,
    name: "Triangular Top Earrings with Red Gem & Chain Fringe",
    price: "71,758",
    purity: "Gold 22K",
    image: "/images/earrings-1.jpg",
  },
  {
    id: 4,
    name: "Triangular Top Earrings with Red Gem & Chain Fringe",
    price: "71,758",
    purity: "Gold 22K",
    image: "/images/earrings-1.jpg",
  },
  {
    id: 5,
    name: "Triangular Top Earrings with Red Gem & Chain Fringe",
    price: "71,758",
    purity: "Gold 22K",
    image: "/images/earrings-1.jpg",
  },
];

export function ProductSidebar() {
  const { ids, remove } = useAppointmentProducts();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      if (ids.length === 0) {
        setProducts([]);
        return;
      }
      setIsLoading(true);
      try {
        const res = await getProductsUserAll();
        if (res?.data) {
          const mapped = res.data.map(mapApiProductToProduct);
          // Only show products that are in the appointment list
          setProducts(mapped.filter((p) => ids.includes(p.id)));
        }
      } catch (error) {
        console.error("Failed to fetch products for sidebar:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, [ids]);

  return (
    <Card className="rounded-xl border border-border overflow-hidden ">
      <div className="p-5">
        <h3 className="text-base font-semibold text-[#c9a84c]">
          Selected Product
        </h3>
      </div>

      <CardContent className="px-5 pb-5 space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 overflow-y-auto max-h-[300px] pr-1 scrollbar-hide">
            {products.map((product) => (
              <div
                key={product.id}
                className="relative group rounded-lg border border-border overflow-hidden bg-card"
              >
                <button
                  type="button"
                  className="absolute top-2 right-2 z-10 w-5 h-5
                           bg-[#c9a84c] rounded-full
                           flex items-center justify-center
                           transition-opacity hover:bg-[#c9a84c]/90"
                  onClick={() => remove(product.id)}
                >
                  <X className="w-3 h-3 text-[#2a1a1a]" />
                </button>

                {/* Image */}
                <div className="relative aspect-square bg-muted">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-3">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                    {product.metal || product.purity}
                  </p>

                  <p className="text-xs font-medium text-foreground mt-1 line-clamp-1">
                    {product.name}
                  </p>

                  <p className="text-sm font-bold text-[#c9a84c] mt-1">
                    ₹{product.price.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">
            No products selected yet.
          </p>
        )}

        <Button
          variant="outline"
          asChild
          className="w-full border-dashed border-[#c9a84c]/50 text-[#c9a84c] 
                     hover:bg-[#c9a84c]/10 hover:border-[#c9a84c] transition-all"
        >
          <Link href="/catalogue">
            <Plus className="w-4 h-4 mr-2" />
            Add More
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
