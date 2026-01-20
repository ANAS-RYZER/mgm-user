"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Award } from "lucide-react";

import Header from "@/commonui/Header";
import Footer from "@/commonui/Footer";
import ProductCard from "@/commonui/ProductCard";
import AnimatedPage from "@/commonui/AnimatedPage";

import { Button } from "@/components/ui/button";
import { categories, products } from "@/lib/product";
import {
  heroTextVariants,
  staggerContainer,
  staggerItem,
  hoverScale,
} from "@/lib/animations";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function HomePage() {
  const featuredProducts = products.slice(0, 4);
  const bestSellers = products.filter((p) => p.isBestSeller);

  return (
    <AnimatedPage className="min-h-screen bg-background">
      <Header />

      <main>
        {/* HERO SECTION */}
        <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/hero-banner.png"
              alt="Elegant woman wearing gold jewelry"
              fill
              priority
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
          </div>

          <div className="relative container mx-auto px-4 h-full flex items-center">
            <motion.div
              variants={heroTextVariants}
              initial="initial"
              animate="animate"
              className="max-w-xl text-primary-foreground"
            >
              <span className="inline-block text-gold tracking-widest uppercase mb-4">
                New Collection 2024
              </span>

              <h1 className="font-elegant text-4xl md:text-6xl font-bold mb-6">
                Timeless Elegance,
                <br />
                <span className="text-gold-light">Crafted in Gold</span>
              </h1>

              <p className="text-lg mb-8">
                Discover handcrafted jewelry where tradition meets
                contemporary design.
              </p>

              <Link href="/catalogue">
                <Button
                  variant="outline"
                  size="lg"
                  className="relative bg-gradient-to-br from-yellow-200/20 via-yellow-400/30 to-yellow-600/20 backdrop-blur-md border border-yellow-300/50 hover:border-yellow-400/70 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-[0.98] overflow-hidden group"
                >
                  <span className="relative z-10">Explore Collection</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 via-yellow-200/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/30 via-yellow-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/30 via-transparent to-yellow-600/30"></div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-yellow-300/20 opacity-60"></div>
                  <div className="absolute inset-0 bg-gradient-to-bl from-yellow-300/20 via-transparent to-yellow-500/20"></div>
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="bg-cream border-y border-border">
          <div className="container mx-auto px-4 py-8">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {[
                { icon: Shield, title: "BIS Hallmark", desc: "Certified Purity" },
                { icon: Award, title: "Premium Quality", desc: "Since 1985" },
              ].map((f) => (
                <motion.div
                  key={f.title}
                  variants={staggerItem}
                  className="flex items-center gap-4 justify-center"
                >
                  <f.icon className="w-8 h-8 text-gold" />
                  <div>
                    <h4 className="font-medium">{f.title}</h4>
                    <p className="text-sm text-muted-foreground">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-4xl font-bold mb-12">
              Shop By Category
            </h2>

            <Carousel className="w-[95%] mx-auto">
              <CarouselContent>
                {categories.map((cat) => (
                  <CarouselItem
                    key={cat.id}
                    className="basis-auto pl-4"
                  >
                    <Link
                      href={`/catalogue?category=${cat.id}`}
                      className="block text-center"
                    >
                      <div className="relative w-52 h-52 rounded-full overflow-hidden">
                        <Image
                          src={cat.image}
                          alt={cat.name}
                          fill
                          className="object-cover hover:scale-110 transition"
                        />
                      </div>
                      <h3 className="mt-4 text-xl font-semibold">
                        {cat.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {cat.count} Products
                      </p>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>

        {/* FEATURED PRODUCTS */}
        <section className="py-20 bg-cream">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-12">
              <h2 className="text-4xl font-bold">
                Featured Collection
              </h2>
              <Link href="/catalogue" className="flex items-center gap-2">
                View All <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* BEST SELLERS */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12">
              Best Sellers
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {bestSellers.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </AnimatedPage>
  );
}
