"use client";

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
import { useFeaturedProducts } from "@/modules/main/hooks/useFeaturedProducts";

const PLACEHOLDER_IMAGE = "/placeholder.svg";

export default function FeaturedCollection() {
  const { data: featuredProducts, isLoading, isError } = useFeaturedProducts();

  const showCarousel =
    !isLoading && !isError && featuredProducts && featuredProducts.length > 0;

  if (!isLoading && !isError && (!featuredProducts || featuredProducts.length === 0)) {
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
              Handpicked For You
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mt-2">
              Featured Collection
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
            Could not load featured products. Please try again later.
          </p>
        )}

        {showCarousel && (
          <div className="w-full py-8 flex items-center justify-center">
            <Carousel
              opts={{
                align: "start",
                loop: featuredProducts.length > 1,
              }}
              className="w-[84%] relative group/carousel"
            >
              <CarouselContent className="pb-4">
                {featuredProducts.map((product, index) => {
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
              <CarouselPrevious className="left-0 md:-left-10 opacity-0 group-hover/carousel:opacity-100 transition-opacity disabled:opacity-0 hover:bg-black hover:text-white" />
              <CarouselNext className="right-0 md:-right-10 opacity-0 group-hover/carousel:opacity-100 transition-opacity disabled:opacity-0 hover:bg-black hover:text-white" />
            </Carousel>
          </div>
        )}
      </div>
    </section>
  );
}
