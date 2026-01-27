import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Gem } from "lucide-react";
import { products, formatPrice } from "@/lib/products";
import { useParams } from "next/dist/client/components/navigation";
import ProductCard from "@/commonui/ProductCard";

function StoneDetails() {
  const params = useParams();
  const id = params.id as string;
  const product = products.find((p) => p.id === id);

if (!product) {
  return (
    <div className="text-center py-10 text-red-500">
      Product not found
    </div>
  );
}

  
  return (
    <div>
      <div className="max-w-4xl mx-auto bg-cream rounded-3xl p-6">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-full flex items-center justify-center shadow-sm border border-emerald-200/50">
            <Gem className="w-7 h-7 text-emerald-700" />
          </div>
          <div>
            <h3 className="font-montserrat text-2xl font-semibold text-slate-900 tracking-tight">
              Stone Specifications
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Detailed gemstone quality and characteristics
            </p>
          </div>
        </div>

        {product.stones && product.stones.length > 0 ? (
          <div className="space-y-4">
            {product.stones.map((stone, stoneIndex) => (
              <motion.div
                key={stoneIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: {
                    delay: stoneIndex * 0.15,
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1],
                  },
                }}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
              >
                <h4 className="font-montserrat font-semibold text-lg text-slate-900 mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  {stone.type}
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  {stone.carat && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.2 }}
                    >
                      <p className="text-xs text-slate-400 mb-1 font-semibold uppercase">
                        Carat
                      </p>
                      <p className="font-bold text-base text-slate-900">
                        {stone.carat} ct
                      </p>
                    </motion.div>
                  )}
                  {stone.count && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, duration: 0.2 }}
                    >
                      <p className="text-xs text-slate-400 mb-1 font-semibold uppercase">
                        Quantity
                      </p>
                      <p className="font-bold text-base text-slate-900">
                        {stone.count} pcs
                      </p>
                    </motion.div>
                  )}
                  {stone.cut && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.2 }}
                    >
                      <p className="text-xs text-slate-400 mb-1 font-semibold uppercase">
                        Cut
                      </p>
                      <p className="font-bold text-base text-slate-900">
                        {stone.cut}
                      </p>
                    </motion.div>
                  )}
                  {stone.clarity && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25, duration: 0.2 }}
                    >
                      <p className="text-xs text-slate-400 mb-1 font-semibold uppercase">
                        Clarity
                      </p>
                      <p className="font-bold text-base text-slate-900">
                        {stone.clarity}
                      </p>
                    </motion.div>
                  )}
                  {stone.color && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.2 }}
                    >
                      <p className="text-xs text-slate-400 mb-1 font-semibold uppercase">
                        Color
                      </p>
                      <p className="font-bold text-base text-slate-900">
                        {stone.color}
                      </p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 bg-white rounded-2xl border border-slate-100"
          >
            <Gem className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-muted-foreground">
              This piece features pure gold without gemstones
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default StoneDetails;
