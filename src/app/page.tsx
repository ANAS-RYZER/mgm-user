"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import Header from "@/commonui/Header";
import Footer from "@/commonui/Footer";
import AnimatedPage from "@/components/AnimatedPage";

import { Button } from "@/components/ui/button";
import {
  heroTextVariants,
} from "@/lib/animations";

import ShopByCategory from "@/modules/main/components/ShopByCategory";
import Feature from "@/modules/main/components/feature";
import FeaturedCollection from "@/modules/main/components/FeaturedCollection";
import Seller from "@/modules/main/components/seller";

export default function HomePage() {
  return (
    <AnimatedPage className="min-h-screen bg-background">
      <Header />

      <main>
   
        <section className="relative h-[80vh] min-h-[600px] overflow-hidden">
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

              <h1 className=" text-4xl md:text-6xl font-bold mb-6">
                Timeless Elegance,
                <br />
                <span className="text-gold-light">Crafted in Gold</span>
              </h1>

              <p className="text-lg mb-8">
                Discover handcrafted jewelry where tradition meets contemporary
                design.
              </p>

              <Link href="/catalogue">
                <Button
                  variant="outline"
                  size="lg"
                  className="relative bg-gradient-to-br from-yellow-200/20 via-yellow-400/30 to-yellow-600/20 backdrop-blur-md border border-yellow-300/50 hover:border-yellow-400/70 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-[0.98] overflow-hidden group"
                >
                  <span className="relative z-10">Explore Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        <Feature />

  
        <ShopByCategory />

        <FeaturedCollection />

        <Seller />

        {/* BEST SELLERS */}
       
      </main>

      <Footer />
    </AnimatedPage>
  );
}
