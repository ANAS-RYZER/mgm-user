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
import { categories } from "@/lib/products";
import React from "react";

const ShopByCategory = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-gold font-medium tracking-widest uppercase text-sm">
            Browse By
          </span>
          <h2 className=" text-3xl md:text-4xl font-semibold text-foreground mt-2">
            Shop By Category
          </h2>
        </motion.div>

        <div className="w-full py-8 flex items-center justify-center">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-[84%] relative group/carousel"
          >
            <CarouselContent className=" pb-4">
              {categories.map((category, index) => (
                <CarouselItem
                  key={`${category.id}-${index}`}
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
                      href={`/catalogue?category=${category.id}`}
                      className="group block relative overflow-hidden rounded-full w-40 h-40 md:w-52 md:h-52 lg:w-60 lg:h-60"
                    >
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent rounded-full" />
                    </Link>
                    <div className="text-center mt-4">
                      <h3 className=" text-lg md:text-xl font-semibold text-foreground">
                        {category.name}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {category.count} Products
                      </p>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 md:-left-10 opacity-0 group-hover/carousel:opacity-100 transition-opacity disabled:opacity-0 hover:bg-black hover:text-white " />
            <CarouselNext className="right-0 md:-right-10 opacity-0 group-hover/carousel:opacity-100 transition-opacity disabled:opacity-0  hover:bg-black hover:text-white " />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;
