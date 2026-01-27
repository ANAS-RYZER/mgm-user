import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

function CareGuide() {
  return (
    <div>
      <div className="max-w-4xl mx-auto bg-cream rounded-3xl p-6">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center shadow-sm border border-blue-200/50">
            <Sparkles className="w-7 h-7 text-blue-700" />
          </div>
          <div>
            <h3 className="font-montserrat text-2xl font-semibold text-slate-900 tracking-tight">
              Jewelry Care Guide
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Essential tips to maintain your precious jewelry
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Storage",
              desc: "Store each piece separately in a soft cloth pouch to prevent scratches. Keep away from direct sunlight and humidity.",
            },
            {
              title: "Cleaning",
              desc: "Gently clean with a soft, lint-free cloth. For deeper cleaning, use warm water with mild soap and dry thoroughly.",
            },
            {
              title: "Wearing",
              desc: "Remove jewelry before swimming, bathing, or exercising. Apply perfumes and cosmetics before wearing jewelry.",
            },
            {
              title: "Maintenance",
              desc: "Visit our store annually for professional cleaning and inspection. We offer complimentary polishing services.",
            },
          ].map((care, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: {
                  delay: index * 0.1,
                  duration: 0.3,
                  ease: [0.4, 0, 0.2, 1],
                },
              }}
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md cursor-pointer"
            >
              <h4 className="font-montserrat font-semibold text-lg text-slate-900 mb-3">
                {care.title}
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                {care.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CareGuide;
