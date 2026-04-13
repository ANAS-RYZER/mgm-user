"use client";

import { Heart, Loader, Share } from "lucide-react";
import { motion } from "framer-motion";
import { formatPrice } from "@/lib/product";
import { cardVariants, hoverLift } from "@/lib/animations";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useToggleWishlist } from "@/modules/catalogue/hooks/useToggleWishlist";
import { useAppointmentProducts } from "@/lib/use-appointment-products";

interface WishlistCardProps {
  product: {
    _id: string;
    name: string;
    mrpPrice: number;
    mrp?: number;
    image: string;
    category?: string;
    metal?: string;
    isWishListed: boolean;
  };
  index?: number;
}

const PLACEHOLDER_IMAGE = "/placeholder.svg";

const WishlistCard = ({ product, index = 0 }: WishlistCardProps) => {
  const router = useRouter();

  const {
    mutate: toggleSaved,
    isPending: isToggling,
  } = useToggleWishlist();

  const searchParams = useSearchParams();
  const isAppointmentMode = searchParams.get("appointment") === "true";

  const appointmentProducts = useAppointmentProducts();
  const isAlreadyAdded = appointmentProducts.isIn(product._id);

  const imageSrc =
    product.image?.trim() !== "" ? product.image : PLACEHOLDER_IMAGE;

  const handleMainAction = () => {
    if (isAppointmentMode) {
      if (!isAlreadyAdded) {
        appointmentProducts.add(product._id);
      }
      router.push("/bookappoitment");
    } else {
      router.push(`product/${product._id}`);
    }
  };

  const handleToggleSaved = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    e.preventDefault();

    toggleSaved(product._id, {
      onError: (err) => {
        console.error("Failed to toggle saved", err);
      },
    });
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ delay: index * 0.05 }}
      {...hoverLift}
      className="group border border-black/10 rounded-lg shadow-sm p-1.5"
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-lg bg-cream h-[180px] mb-2">
        <Image
          src={imageSrc}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition"
        />
      </div>

      {/* Content */}
      <div className="px-3 pb-3 space-y-1.5">
        {product.metal && (
          <Badge className="text-[10px] px-2 py-0.5">
            {product.metal}
          </Badge>
        )}

        <h3 className="text-sm font-medium line-clamp-2">
          {product.name}
        </h3>

        <div className="flex justify-between items-center">
          <p className="text-base font-semibold">
            {formatPrice(product?.mrpPrice)}
          </p>

          <div className="flex gap-2">
            {/* ❤️ Saved Button (was Wishlist) */}
            <Button
              onClick={handleToggleSaved}
              className={`h-8 w-8 p-1 rounded-md ${
                product.isWishListed
                  ? "bg-destructive text-white"
                  : "bg-background text-red-500"
              }`}
              aria-label="Toggle saved"
            >
              {isToggling ? (
                <Loader className="w-3 h-3 animate-spin" />
              ) : (
                <Heart className="w-3 h-3" />
              )}
            </Button>

            {/* Share */}
            <Button className="h-8 w-8 p-1 rounded-md bg-background text-black">
              <Share className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* CTA */}
        <Button
          className="w-full h-8 text-xs mt-2 bg-gold"
          onClick={handleMainAction}
        >
          {isAppointmentMode
            ? isAlreadyAdded
              ? "Added"
              : "Add"
            : "View"}
        </Button>
      </div>
    </motion.div>
  );
};

export default WishlistCard;