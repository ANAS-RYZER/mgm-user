import { motion } from "framer-motion";
import { Gem, Scale, Sparkles } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { slideUpVariants } from "@/lib/animations";
import CareGuide from "@/components/CareGuide";
import StoneDetails from "@/components/StoneDetails";
import GoldDetails from "@/components/GoldDetails";
import { Product } from "@/lib/product";

export default function ProductInfoTabs({product}: {product:Product}) {
  return (
    <motion.div
      variants={slideUpVariants}
      initial="initial"
      animate="animate"
      transition={{ delay: 0.2 }}
      className="mt-20"
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="font-montserrat text-3xl font-semibold text-foreground mb-2 tracking-tight">
            Product Information
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore comprehensive details about this exquisite piece
          </p>
        </div>
      </div>
      
      <Tabs defaultValue="details" className="w-full">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-cream via-cream to-gold/5 rounded-3xl p-4 flex items-center justify-center mb-8 relative shadow-[0_4px_12px_rgba(0,0,0,0.06)] border border-gold/10">
            <TabsList className="flex items-center gap-2 bg-muted rounded-3xl">
              <TabsTrigger
                value="details"
                className="px-6 py-3 rounded-full text-sm font-semibold data-[state=active]:bg-gold data-[state=active]:text-foreground data-[state=active]:shadow-lg transition-all duration-300 text-slate-600 hover:text-slate-900"
              >
                <Scale className="w-4 h-4 mr-2 inline" /> Gold Details
              </TabsTrigger>
              <TabsTrigger
                value="stones"
                className="px-6 py-3 rounded-full text-sm font-semibold data-[state=active]:bg-gold data-[state=active]:text-foreground data-[state=active]:shadow-lg transition-all duration-300 text-slate-600 hover:text-slate-900"
              >
                <Gem className="w-4 h-4 mr-2 inline" /> Stone Details
              </TabsTrigger>
              <TabsTrigger
                value="care"
                className="px-6 py-3 rounded-full text-sm font-semibold data-[state=active]:bg-gold data-[state=active]:text-foreground data-[state=active]:shadow-lg transition-all duration-300 text-slate-600 hover:text-slate-900"
              >
                <Sparkles className="w-4 h-4 mr-2 inline" /> Care Guide
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="details" className="mt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <GoldDetails product={product} />
          </motion.div>
        </TabsContent>

        <TabsContent value="stones" className="mt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <StoneDetails product={product} />
          </motion.div>
        </TabsContent>

        <TabsContent value="care" className="mt-0">
          <CareGuide />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
