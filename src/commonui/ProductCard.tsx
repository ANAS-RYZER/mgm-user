"use client";
import { Heart, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { Product, formatPrice } from "@/lib/product";
import { cardVariants, hoverLift } from "@/lib/animations";
import { useWishlist } from "@/lib/use-wishlist";
import Link from "next/link";
import Image from "next/image";
interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const wishlist = useWishlist();

  const WishlistButton = ({ productId }: { productId: string | number }) => (
    <button
      onClick={(e) => { e.stopPropagation(); e.preventDefault(); wishlist.toggle(Number(productId)); }}
      className={`p-2 rounded-full transition-colors shadow-[0_4px_12px_rgba(0,0,0,0.06)] ${wishlist.isIn(Number(productId)) ? 'bg-destructive text-white' : 'bg-background/90 hover:bg-background'}`}
      aria-label="Toggle wishlist"
    >
      <Heart className="w-4 h-4" />
    </button>
  );

  return (
    <motion.div
            variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ delay: index * 0.1 }}
      {...hoverLift}
      className="group"
    >
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden rounded-2xl bg-cream aspect-square mb-4 shadow-[0_4px_12px_rgba(0,0,0,0.06)] group-hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] transition-shadow duration-300">
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
            {discount > 0 && (
              <span className="bg-destructive text-destructive-foreground text-xs px-3 py-1 rounded-full font-medium">
                {discount}% OFF
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <WishlistButton productId={product.id} />
            <button
              className="p-2 bg-background/90 rounded-full hover:bg-background transition-colors shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
              aria-label="Add to cart"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>

       <Image
  src={product.image.src}
  alt={product.name}
  fill
  sizes="(max-width: 768px) 50vw, 25vw"
  className="object-cover group-hover:scale-110 transition-transform duration-500 rounded-2xl"
  priority={index < 2}
/>



          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{product.metal}</p>
          <h3 className="font-display text-lg font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="font-display text-lg font-semibold text-foreground">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
