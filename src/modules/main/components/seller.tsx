"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useSellerProducts } from "@/modules/main/hooks/useSellerProduct";

const PLACEHOLDER_IMAGE = "/placeholder.svg";

const arrowButtonClass =
  "z-30 h-11 w-11 border border-foreground/15 bg-background/95 shadow-md text-foreground hover:bg-gold/15 hover:text-foreground hover:border-gold/40 [&_svg]:h-5 [&_svg]:w-5 opacity-100 pointer-events-auto";

export default function Seller() {
  const { data: sellerProducts, isLoading, isError } = useSellerProducts();

  const autoplayPlugin = React.useMemo(
    () =>
      Autoplay({
        delay: 5000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        playOnInit: true,
      }),
    [],
  );

  const showCarousel =
    !isLoading && !isError && sellerProducts && sellerProducts.length > 0;

  if (!isLoading && !isError && (!sellerProducts || sellerProducts.length === 0)) {
    return null;
  }

  return (
    <section className="py-20 px-4 sm:px-8 md:px-16 bg-cream">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
        >
          <div>
            <span className="text-gold font-medium tracking-widest uppercase text-sm">
                Best Sellers
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mt-2">
              Our Best Sellers
            </h2>
          </div>
          <Link
            href="/catalogue"
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mt-4 md:mt-0"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {isLoading && (
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 py-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col items-center flex-shrink-0 w-40 md:w-52 lg:w-60"
              >
                <div className="rounded-full w-40 h-40 md:w-52 md:h-52 lg:w-60 lg:h-60 bg-muted/60 animate-pulse" />
                <div className="mt-4 h-6 w-32 bg-muted/60 rounded animate-pulse" />
              </div>
            ))}
          </div>
        )}

        {isError && (
          <p className="text-center text-sm text-muted-foreground py-12">
            Could not load best sellers. Please try again later.
          </p>
        )}

        {showCarousel && (
          <div className="w-full py-8">
            <Carousel
              opts={{
                align: "start",
                loop: sellerProducts.length > 1,
                duration: 45,
              }}
              plugins={sellerProducts.length > 1 ? [autoplayPlugin] : []}
              className="relative w-full max-w-full px-2 sm:px-12 md:px-14"
            >
              <CarouselContent className="pb-4">
                {sellerProducts.map((product, index) => {
                  const src =
                    typeof product.image === "string" && product.image.trim() !== ""
                      ? product.image
                      : PLACEHOLDER_IMAGE;
                  return (
                    <CarouselItem
                      key={product.id}
                      className="pl-4 basis-auto"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex flex-col items-center flex-shrink-0 w-40 md:w-52 lg:w-60"
                      >
                        <Link
                          href={`/product/${product.id}`}
                          className="group block relative overflow-hidden rounded-full w-40 h-40 md:w-52 md:h-52 lg:w-60 lg:h-60"
                        >
                          <Image
                            src={src}
                            alt={product.name}
                            fill
                            sizes="(max-width: 768px) 160px, (max-width: 1024px) 208px, 240px"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent rounded-full" />
                        </Link>
                        <div className="text-center mt-4 px-1">
                          <h3 className="text-lg md:text-xl font-semibold text-foreground line-clamp-2">
                            {product.name}
                          </h3>
                        </div>
                      </motion.div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious
                className={`${arrowButtonClass} left-1 sm:left-2 md:left-3`}
              />
              <CarouselNext
                className={`${arrowButtonClass} right-1 sm:right-2 md:right-3`}
              />
            </Carousel>
          </div>
        )}
      </div>
    </section>
  );
}
