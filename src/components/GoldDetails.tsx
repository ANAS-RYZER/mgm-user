import React from 'react'
import { motion } from "framer-motion";
import { Scale } from 'lucide-react';

import { products } from "@/data/products"; 
import { useParams } from 'next/dist/client/components/navigation';
function GoldDetails() {
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
                      <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-[0_8px_24px_rgba(0,0,0,0.08)] border border-slate-100/50">
                        <div className="flex items-center gap-4 mb-8">
                          <div className="w-14 h-14 bg-gradient-to-br from-amber-50 to-amber-100 rounded-full flex items-center justify-center shadow-sm border border-amber-200/50">
                            <Scale className="w-7 h-7 text-amber-700" />
                          </div>
                          <div>
                            <h3 className="font-montserrat text-2xl font-semibold text-slate-900 tracking-tight">Gold Specifications</h3>
                            <p className="text-sm text-slate-500 mt-1">Complete breakdown of precious metal composition</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                          {[
                            { label: "Karatage", value: product.karatage },
                            { label: "Gold Weight", value: product.goldWeight || product.weight },
                            { label: "Gross Weight", value: product.weight },
                            { label: "Purity", value: product.purity },
                            { label: "Making Charges", value: product.makingCharges || "12%" },
                            { label: "Metal", value: product.metal },
                          ].map((spec, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ 
                                opacity: 1, 
                                scale: 1,
                                transition: { 
                                  delay: index * 0.1, 
                                  duration: 0.3, 
                                  ease: [0.4, 0, 0.2, 1] 
                                }
                              }}
                              whileHover={{ scale: 1.05, y: -4 }}
                              transition={{ type: "spring", stiffness: 300, damping: 20 }}
                              className="bg-slate-50 rounded-2xl p-6 border border-slate-100 shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] cursor-pointer transition-shadow duration-300"
                            >
                              <p className="text-xs uppercase text-slate-400 font-semibold mb-2">{spec.label}</p>
                              <p className="font-bold text-lg text-slate-900">{spec.value}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
    </div>
  )
}

export default GoldDetails
