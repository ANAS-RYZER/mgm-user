import { motion } from "framer-motion";
import { Heart, Calendar, Shield, Gem, Scale, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { scaleInVariants } from "@/lib/animations";
import { formatPrice } from "@/lib/products";

interface ProductDetailsProps {
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  karatage?: string;
  certification?: string;
  goldWeight?: string;
  weight?: string;
  purity: string;
  makingCharges?: string;
  onBookAppointment: () => void;
}

export default function ProductDetails({
  name,
  price,
  originalPrice,
  description,
  karatage,
  certification,
  goldWeight,
  weight,
  purity,
  makingCharges,
    onBookAppointment,
}: ProductDetailsProps) {
  return (
    <motion.div
      variants={scaleInVariants}
      initial="initial"
      animate="animate"
      transition={{ delay: 0.1 }}
      className="lg:col-span-5 space-y-6"
    >
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          {karatage && (
            <span className="px-3 py-1 bg-gold/20 text-gold-dark rounded-full text-xs font-semibold uppercase tracking-wider">
              {karatage}
            </span>
          )}
          {certification && (
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
              {certification}
            </span>
          )}
        </div>

        <h1 className="font-montserrat text-3xl lg:text-4xl font-semibold text-foreground leading-tight tracking-tight">
          {name}
        </h1>

        <div className="flex items-baseline gap-4">
          <span className="text-3xl lg:text-4xl font-bold text-primary tracking-tight">
            {formatPrice(price)}
          </span>
          {originalPrice && (
            <span className="text-xl text-muted-foreground line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>

        <p className="text-muted-foreground leading-relaxed text-lg">
          {description}
        </p>
      </div>

      {/* Quick Specs */}
      <div className="grid grid-cols-3 gap-4 py-6 border-y border-border">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto bg-gold/10 rounded-full flex items-center justify-center mb-2">
            <Scale className="w-5 h-5 text-gold" />
          </div>
          <p className="text-xs text-muted-foreground">Gold Weight</p>
          <p className="font-semibold text-sm">{goldWeight || weight}</p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 mx-auto bg-gold/10 rounded-full flex items-center justify-center mb-2">
            <Award className="w-5 h-5 text-gold" />
          </div>
          <p className="text-xs text-muted-foreground">Purity</p>
          <p className="font-semibold text-sm">{purity}</p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 mx-auto bg-gold/10 rounded-full flex items-center justify-center mb-2">
            <Gem className="w-5 h-5 text-gold" />
          </div>
          <p className="text-xs text-muted-foreground">Making</p>
          <p className="font-semibold text-sm">{makingCharges || "12%"}</p>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="space-y-3">
        <Button
          onClick={onBookAppointment}
          size="lg"
          className="w-full text-lg py-6"
        >
          <Calendar className="w-5 h-5" />
          Book an Appointment
        </Button>
        <Button
          size="lg"
          className="w-full"
        >
          <Heart className="w-5 h-5" />
          Add to Wishlist
        </Button>
      </div> 

      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-3">
        {[{ icon: Shield, text: "BIS Hallmarked" }].map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-1 p-3 bg-cream rounded-xl text-center"
          >
            <item.icon className="w-5 h-5 text-gold" />
            <span className="text-xs font-medium">{item.text}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
