import { staggerContainer, staggerItem } from '@/lib/animations';
import { motion } from 'framer-motion';
import { Award, Gem, Shield, Wrench } from 'lucide-react';
import React from 'react'

const feature = () => {
  return (
    <section className="bg-cream border-y border-border">
    <div className="container mx-auto px-4 py-8">
      <motion.div
        variants={ staggerContainer }
        initial="initial"
        animate="animate"
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        {[
          {
            icon: Shield,
            title: "BIS Hallmark",
            desc: "Certified Purity",
          },
          { icon: Award, title: "Premium Quality", desc: "Since 1985" },
          { icon : Gem, title: "Polishing & Steaming", desc: "Polishing & Steaming" },
          { icon : Wrench, title: "Jewellery Repair", desc: "Jewellery Repair" },
          ,
        ]?.map((f : any ) => (
          <>
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
          </>
        ))}
      </motion.div>
    </div>
  </section>    
  )
};

export default feature;