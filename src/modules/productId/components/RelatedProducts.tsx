import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import ProductCard from "@/commonui/ProductCard";
import { slideUpVariants } from "@/lib/animations";
import { Product } from "@/lib/products";

interface RelatedProductsProps {
  products: Product[];
  category: string;
}

export default function RelatedProducts({
  products,
  category,
}: RelatedProductsProps) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-to-b from-background via-cream/30 to-cream">
      <div className="container mx-auto px-4">
        <motion.div
          variants={slideUpVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.3 }}
          className="max-w-6xl mx-auto mb-16"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="space-y-3">
              <p className="text-sm font-semibold text-gold uppercase tracking-widest">
                Curated Selection
              </p>
              <h2 className="font-montserrat text-4xl md:text-4xl font-semibold text-foreground leading-tight tracking-tight">
                You May Also Like
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl pt-2">
                Discover other exquisite pieces from our collection that
                complement your style.
              </p>
            </div>
            <Link
              href={`/catalogue?category=${category}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-foreground font-semibold rounded-full hover:bg-gold/90 transition-all duration-300 hover:shadow-lg whitespace-nowrap"
            >
              View All Collection
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1,
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1],
              }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <ProductCard product={product} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
