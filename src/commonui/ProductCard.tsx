"use client";
import { Calendar, Heart, Plus, Share, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { Product, formatPrice } from "@/lib/product";
import { cardVariants, hoverLift } from "@/lib/animations";
import { useWishlist } from "@/lib/use-wishlist";
import { useAppointmentProducts } from "@/lib/use-appointment-products";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const router = useRouter();
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  const searchParams = useSearchParams();
  const isAppointmentMode = searchParams.get("appointment") === "true";
  const appointmentProducts = useAppointmentProducts();
  const isAlreadyAdded = appointmentProducts.isIn(String(product.id));

  const wishlist = useWishlist();

  const handleMainAction = () => {
    if (isAppointmentMode) {
      if (!isAlreadyAdded) {
        appointmentProducts.add(String(product.id));
      }
      router.push("/bookappoitment");
    } else {
      router.push(`product/${product.id}`);
    }
  };

  const WishlistButton = ({ productId }: { productId: string | number }) => (
    <Button
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        wishlist.toggle(String(productId));
      }}
      className={`p-2 rounded-lg transition-colors h-10 w-10 hover:bg-black/10 text-black border shadow-[0_4px_12px_rgba(0,0,0,0.06)] ${wishlist.isIn(String(productId)) ? "bg-destructive text-white" : "bg-background/90 text-red-500"}`}
      aria-label="Toggle wishlist"
    >
      <Heart className="w-4 h-4" />
    </Button>
  );

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ delay: index * 0.1 }}
      {...hoverLift}
      className="group border border-black/10 rounded-xl shadow-sm p-2"
    >
      {/* <Link href={`/product/${product.id}`} className="block"> */}
      <div className="relative overflow-hidden rounded-xl bg-cream h-[250px] mb-4 shadow-[0_4px_12px_rgba(0,0,0,0.06)] group-hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] transition-shadow duration-300 ">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-gold text-foreground text-xs px-3 py-1 rounded-full font-medium">
              New
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-medium">
              Best Seller
            </span>
          )}
          {/* {discount > 0 && (
              <span className="bg-destructive text-destructive-foreground text-xs px-3 py-1 rounded-full font-medium">
                {discount}% OFF
              </span>
            )} */}
        </div>

        {/* Actions */}
        {/* <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <WishlistButton productId={product.id} />
          <button
            className="p-2 bg-background/90 rounded-full hover:bg-background transition-colors shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div> */}

        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover group-hover:scale-110 transition-transform duration-500 "
          priority={index < 2}
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="space-y-2 px-5 pb-5">
        <Badge className="text-xs text-gold bg-gold/10 border-gold rounded-full hover:bg-gold/10 uppercase">
          {product.metal}
        </Badge>
        <div className="flex ">
          <div className="flex-1 space-y-3">
            <h3 className=" text-md font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {product.name}
            </h3>
            <div className="flex justify-between items-center gap-2">
              <p className=" text-xl font-semibold text-foreground">
                {formatPrice(product.originalPrice)}
              </p>
              <div className="flex gap-4">
                <WishlistButton productId={product.id} />
                {/* <Button
                  className="p-2 bg-background/90 rounded-lg hover:bg-black/10 w-10 h-10 transition-colors shadow-[0_4px_12px_rgba(0,0,0,0.06)] text-black border "
                  aria-label="Add to cart"
                >
                  <Calendar className="w-4 h-4" />
                </Button> */}
                <Button
                  className="p-2 bg-background/90 rounded-lg hover:bg-black/10 w-10 h-10 transition-colors shadow-[0_4px_12px_rgba(0,0,0,0.06)] text-black border "
                  aria-label="Add to cart"
                >
                  <Share className="w-4 h-4" />{" "}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Button
          className="w-full bg-gold hover:bg-gold/70  shadow-lg rounded-sm mt-5 "
          onClick={handleMainAction}
        >
          {isAppointmentMode
            ? isAlreadyAdded
              ? "Added"
              : "Add Product"
            : "Quick View"}
        </Button>
      </div>
      {/* </Link> */}
    </motion.div>
  );
};

export default ProductCard;
