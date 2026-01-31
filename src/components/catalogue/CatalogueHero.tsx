"use client";

import { motion } from "framer-motion";
import { slideUpVariants } from "@/lib/animations";

export default function CatalogueHero() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-20 min-h-[520px]">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1752786768226-b624a5261654?auto=format&fit=crop&w=1920&q=80"
          alt="South Indian bride adorned in traditional gold jewellery"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={slideUpVariants}
          initial="initial"
          animate="animate"
          className="text-center max-w-4xl mx-auto"
        >
          <span className="inline-block text-gold font-body tracking-widest uppercase text-sm mb-4">
            Traditional South Indian Collection
          </span>
          <h1 className="font-elegant text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
            Heritage Jewelry
            <span className="block text-gold-light">Timeless Craftsmanship</span>
          </h1>
          <p className="text-primary-foreground/90 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Discover our exquisite collection of traditional South Indian
            jewelry, featuring intricate designs inspired by centuries of
            cultural heritage and craftsmanship.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
