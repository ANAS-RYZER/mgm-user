"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Calendar, Shield, ChevronLeft, ChevronRight, Gem, Scale, Award, Share2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/commonui/Header";
import Footer from "@/commonui/Footer";
import ProductCard from "@/commonui/ProductCard";
import BookAppointmentModal from "@/commonui/BookAppointmentModal";
import { products, formatPrice } from "@/lib/products";
import { useToast } from "@/hooks/use-toast";
import { useWishlist } from "@/lib/use-wishlist";
import AnimatedPage from "@/components/AnimatedPage";
import { slideUpVariants, scaleInVariants } from "@/lib/animations";

export default function ProductDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const { toast } = useToast();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const wishlist = useWishlist();

  const product = products.find((p) => p.id === id);
  const relatedProducts = products.filter(
    (p) => p.category === product?.category && p.id !== id
  ).slice(0, 4);

  const touchStartRef = useRef<number | null>(null);
  const touchMovedRef = useRef<number | null>(null);

  const images = product?.images || (product?.image ? [product.image] : []);
  const discount = product?.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!isLightboxOpen) return;
      if (e.key === 'ArrowLeft') setSelectedImageIndex((i) => (i === 0 ? images.length - 1 : i - 1));
      if (e.key === 'ArrowRight') setSelectedImageIndex((i) => (i === images.length - 1 ? 0 : i + 1));
      if (e.key === 'Escape') setIsLightboxOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isLightboxOpen, images.length]);

  function onTouchStart(e: React.TouchEvent) {
    touchStartRef.current = e.touches[0]?.clientX ?? null;
    touchMovedRef.current = null;
  }

  function onTouchMove(e: React.TouchEvent) {
    touchMovedRef.current = e.touches[0]?.clientX ?? null;
  }

  function onTouchEnd() {
    if (touchStartRef.current == null || touchMovedRef.current == null) return;
    const delta = touchMovedRef.current - touchStartRef.current;
    const threshold = 40;
    if (delta > threshold) {
      setSelectedImageIndex((i) => (i === 0 ? images.length - 1 : i - 1));
    } else if (delta < -threshold) {
      setSelectedImageIndex((i) => (i === images.length - 1 ? 0 : i + 1));
    }
    touchStartRef.current = null;
    touchMovedRef.current = null;
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background font-montserrat">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-montserrat text-2xl font-semibold mb-4 tracking-tight">Product Not Found</h1>
          <Link href="/catalogue">
            <Button>Browse Collection</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToWishlist = () => {
    const idNum = Number(product.id);
    wishlist.toggle(idNum);
    const now = wishlist.isIn(idNum);
    toast({
      title: now ? "Added to Wishlist" : "Removed from Wishlist",
      description: now ? `${product.name} has been added to your wishlist.` : `${product.name} has been removed from your wishlist.`,
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied",
      description: "Product link has been copied to clipboard.",
    });
  };

  return (
    <AnimatedPage className="min-h-screen bg-background font-montserrat">
      <Header />

      <main className="pb-20">
        {/* Breadcrumb */}
        <div className="bg-gradient-to-r from-cream via-cream to-gold/10 py-4">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary hover:underline transition-colors cursor-pointer">
                Home
              </Link>
              <span>/</span>
              <Link href="/catalogue" className="hover:text-primary hover:underline transition-colors cursor-pointer">
                Collections
              </Link>
              <span>/</span>
              <Link
                href={`/catalogue?category=${product.category}`}
                className="hover:text-primary hover:underline transition-colors capitalize cursor-pointer"
              >
                {product.category}
              </Link>
              <span>/</span>
              <span className="text-foreground font-medium">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Product Section */}
        <section className="py-8 lg:py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Left Column - Images */}
              <motion.div
                variants={scaleInVariants}
                initial="initial"
                animate="animate"
                className="lg:col-span-7 space-y-4"
              >
                {/* Main Image */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-cream to-cream-dark shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
                  <button
                    onClick={() => setIsLightboxOpen(true)}
                    className="w-full h-full"
                    aria-label="Open image viewer"
                  >
                    <Image
                      src={images[selectedImageIndex] || "/assets/placeholder.jpg"}
                      alt={product.name}
                      fill
                      className="object-cover cursor-zoom-in"
                      priority
                    />
                  </button>
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setSelectedImageIndex((prev) =>
                            prev === 0 ? images.length - 1 : prev - 1
                          )
                        }
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-background/95 rounded-full hover:bg-background transition-all shadow-lg hover:scale-110"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() =>
                          setSelectedImageIndex((prev) =>
                            prev === images.length - 1 ? 0 : prev + 1
                          )
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-background/95 rounded-full hover:bg-background transition-all shadow-lg hover:scale-110"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isNew && (
                      <span className="bg-gold text-foreground text-xs px-4 py-1.5 rounded-full font-semibold shadow-md">
                        New Arrival
                      </span>
                    )}
                    {product.isBestSeller && (
                      <span className="bg-primary text-primary-foreground text-xs px-4 py-1.5 rounded-full font-semibold shadow-md flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Best Seller
                      </span>
                    )}
                    {discount > 0 && (
                      <span className="bg-destructive text-destructive-foreground text-xs px-4 py-1.5 rounded-full font-semibold shadow-md">
                        {discount}% OFF
                      </span>
                    )}
                  </div>

                  {/* Actions overlay */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <button
                      onClick={() => { 
                        wishlist.toggle(Number(product.id)); 
                        const now = wishlist.isIn(Number(product.id)); 
                        toast({ 
                          title: now ? 'Added to Wishlist' : 'Removed from Wishlist', 
                          description: now ? `${product.name} has been added to your wishlist.` : `${product.name} has been removed from your wishlist.` 
                        }); 
                      }}
                      className={`p-3 bg-background/95 rounded-full hover:bg-background transition-all shadow-lg hover:scale-110 group ${wishlist.isIn(Number(product.id)) ? 'ring-2 ring-amber-200' : ''}`}
                      aria-label="Add to wishlist"
                    >
                      <Heart className={`w-5 h-5 transition-colors ${wishlist.isIn(Number(product.id)) ? 'text-red-500 fill-red-500' : 'group-hover:text-primary'}`} />
                    </button>
                    <button
                      onClick={handleShare}
                      className="p-3 bg-background/95 rounded-full hover:bg-background transition-all shadow-lg hover:scale-110"
                      aria-label="Share product"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Thumbnails */}
                {images.length > 1 && (
                  <div className="flex gap-3 justify-center">
                    {images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all hover:scale-105 ${
                          selectedImageIndex === index
                            ? "border-amber-500 ring-2 ring-amber-200"
                            : "border-border/50 hover:border-amber-300"
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`${product.name} view ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Right Column - Details */}
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
                    <span className="px-3 py-1 bg-gold/20 text-gold-dark rounded-full text-xs font-semibold uppercase tracking-wider">
                      {product.karatage}
                    </span>
                    {product.certification && (
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                        {product.certification}
                      </span>
                    )}
                  </div>
                  
                  <h1 className="font-montserrat text-3xl lg:text-4xl font-semibold text-foreground leading-tight tracking-tight">
                    {product.name}
                  </h1>
                  
                  <div className="flex items-baseline gap-4">
                    <span className="text-3xl lg:text-4xl font-bold text-primary tracking-tight">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xl text-muted-foreground line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {product.description}
                  </p>
                </div>

                {/* Quick Specs */}
                <div className="grid grid-cols-3 gap-4 py-6 border-y border-border">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto bg-gold/10 rounded-full flex items-center justify-center mb-2">
                      <Scale className="w-5 h-5 text-gold" />
                    </div>
                    <p className="text-xs text-muted-foreground">Gold Weight</p>
                    <p className="font-semibold text-sm">{product.goldWeight || product.weight}</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto bg-gold/10 rounded-full flex items-center justify-center mb-2">
                      <Award className="w-5 h-5 text-gold" />
                    </div>
                    <p className="text-xs text-muted-foreground">Purity</p>
                    <p className="font-semibold text-sm">{product.purity}</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto bg-gold/10 rounded-full flex items-center justify-center mb-2">
                      <Gem className="w-5 h-5 text-gold" />
                    </div>
                    <p className="text-xs text-muted-foreground">Making</p>
                    <p className="font-semibold text-sm">{product.makingCharges || "12%"}</p>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <Button
                    onClick={() => setIsAppointmentModalOpen(true)}
                    size="lg"
                    className="w-full text-lg py-6"
                  >
                    <Calendar className="w-5 h-5" />
                    Book an Appointment
                  </Button>
                  <Button
                    variant={wishlist.isIn(Number(product.id)) ? "default" : "outline"}
                    size="lg"
                    onClick={handleAddToWishlist}
                    className="w-full"
                  >
                    <Heart className={`w-5 h-5 ${wishlist.isIn(Number(product.id)) ? 'text-red-500 fill-red-500' : ''}`} />
                    {wishlist.isIn(Number(product.id)) ? 'Saved' : 'Add to Wishlist'}
                  </Button>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: Shield, text: "BIS Hallmarked" },
                  ].map((item, index) => (
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
            </div>

            {/* Detailed Information Tabs */}
            <motion.div
              variants={slideUpVariants}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.2 }}
              className="mt-20"
            >
              <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                  <h2 className="font-montserrat text-3xl font-semibold text-foreground mb-2 tracking-tight">Product Information</h2>
                  <p className="text-muted-foreground text-lg">Explore comprehensive details about this exquisite piece</p>
                </div>
              </div>
              <Tabs defaultValue="details" className="w-full">
                <div className="max-w-4xl mx-auto">
                  <div className="bg-gradient-to-r from-cream via-cream to-gold/5 rounded-3xl p-4 flex items-center justify-center mb-8 relative shadow-[0_4px_12px_rgba(0,0,0,0.06)] border border-gold/10">
                    <TabsList className="flex items-center gap-2 bg-muted  rounded-3xl">
                      <TabsTrigger value="details" className="px-6 py-3 rounded-full text-sm font-semibold data-[state=active]:bg-gold data-[state=active]:text-foreground data-[state=active]:shadow-lg transition-all duration-300 text-slate-600 hover:text-slate-900">
                        <Scale className="w-4 h-4 mr-2 inline" /> Gold Details
                      </TabsTrigger>
                      <TabsTrigger value="stones" className="px-6 py-3 rounded-full text-sm font-semibold data-[state=active]:bg-gold data-[state=active]:text-foreground data-[state=active]:shadow-lg transition-all duration-300 text-slate-600 hover:text-slate-900">
                        <Gem className="w-4 h-4 mr-2 inline" /> Stone Details
                      </TabsTrigger>
                      <TabsTrigger value="care" className="px-6 py-3 rounded-full text-sm font-semibold data-[state=active]:bg-gold data-[state=active]:text-foreground data-[state=active]:shadow-lg transition-all duration-300 text-slate-600 hover:text-slate-900">
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
                  </motion.div>
                </TabsContent>

                <TabsContent value="stones" className="mt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <div className="max-w-4xl mx-auto bg-cream rounded-3xl p-6">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-14 h-14 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-full flex items-center justify-center shadow-sm border border-emerald-200/50">
                          <Gem className="w-7 h-7 text-emerald-700" />
                        </div>
                        <div>
                          <h3 className="font-montserrat text-2xl font-semibold text-slate-900 tracking-tight">Stone Specifications</h3>
                          <p className="text-sm text-slate-500 mt-1">Detailed gemstone quality and characteristics</p>
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
                                  ease: [0.4, 0, 0.2, 1] 
                                }
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
                                    <p className="text-xs text-slate-400 mb-1 font-semibold uppercase">Carat</p>
                                    <p className="font-bold text-base text-slate-900">{stone.carat} ct</p>
                                  </motion.div>
                                )}
                                {stone.count && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.15, duration: 0.2 }}
                                  >
                                    <p className="text-xs text-slate-400 mb-1 font-semibold uppercase">Quantity</p>
                                    <p className="font-bold text-base text-slate-900">{stone.count} pcs</p>
                                  </motion.div>
                                )}
                                {stone.cut && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.2 }}
                                  >
                                    <p className="text-xs text-slate-400 mb-1 font-semibold uppercase">Cut</p>
                                    <p className="font-bold text-base text-slate-900">{stone.cut}</p>
                                  </motion.div>
                                )}
                                {stone.clarity && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.25, duration: 0.2 }}
                                  >
                                    <p className="text-xs text-slate-400 mb-1 font-semibold uppercase">Clarity</p>
                                    <p className="font-bold text-base text-slate-900">{stone.clarity}</p>
                                  </motion.div>
                                )}
                                {stone.color && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.2 }}
                                  >
                                    <p className="text-xs text-slate-400 mb-1 font-semibold uppercase">Color</p>
                                    <p className="font-bold text-base text-slate-900">{stone.color}</p>
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
                          <p className="text-muted-foreground">This piece features pure gold without gemstones</p>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="care" className="mt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <div className="max-w-4xl mx-auto bg-cream rounded-3xl p-6">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center shadow-sm border border-blue-200/50">
                          <Sparkles className="w-7 h-7 text-blue-700" />
                        </div>
                        <div>
                          <h3 className="font-montserrat text-2xl font-semibold text-slate-900 tracking-tight">Jewelry Care Guide</h3>
                          <p className="text-sm text-slate-500 mt-1">Essential tips to maintain your precious jewelry</p>
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
                                ease: [0.4, 0, 0.2, 1] 
                              }
                            }}
                            whileHover={{ scale: 1.02, y: -2 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md cursor-pointer"
                          >
                            <h4 className="font-montserrat font-semibold text-lg text-slate-900 mb-3">{care.title}</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">{care.desc}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
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
                    <p className="text-sm font-semibold text-gold uppercase tracking-widest">Curated Selection</p>
                    <h2 className="font-montserrat text-4xl md:text-4xl font-semibold text-foreground leading-tight tracking-tight">
                      You May Also Like
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl pt-2">
                      Discover other exquisite pieces from our collection that complement your style.
                    </p>
                  </div>
                  <Link
                    href={`/catalogue?category=${product.category}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-foreground font-semibold rounded-full hover:bg-gold/90 transition-all duration-300 hover:shadow-lg whitespace-nowrap"
                  >
                    View All Collection
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                {relatedProducts.map((relatedProduct, index) => (
                  <motion.div
                    key={relatedProduct.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.4,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    <ProductCard product={relatedProduct} index={index} />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/80 z-50"
              onClick={() => setIsLightboxOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="fixed inset-0 z-[60] flex items-center justify-center p-6"
            >
              <div 
                className="relative w-full max-w-4xl h-[80vh]" 
                onTouchStart={onTouchStart} 
                onTouchMove={onTouchMove} 
                onTouchEnd={onTouchEnd}
              >
                <Image
                  src={images[selectedImageIndex] || "/assets/placeholder.jpg"}
                  alt={`${product.name} - image ${selectedImageIndex + 1}`}
                  fill
                  className="object-contain bg-black rounded-lg"
                  priority
                />

                <div className="absolute left-0 right-0 bottom-6 flex justify-center gap-2">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => { e.stopPropagation(); setSelectedImageIndex(idx); }}
                      className={`w-2 h-2 rounded-full ${selectedImageIndex === idx ? 'bg-white' : 'bg-white/40'}`}
                      aria-label={`Go to image ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedImageIndex((i) => (i === 0 ? images.length - 1 : i - 1)); }}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-background/80 rounded-full hover:bg-background shadow-lg"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedImageIndex((i) => (i === images.length - 1 ? 0 : i + 1)); }}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-background/80 rounded-full hover:bg-background shadow-lg"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                <button
                  onClick={() => setIsLightboxOpen(false)}
                  aria-label="Close image viewer"
                  className="absolute right-3 top-3 p-2 bg-background/80 rounded-full hover:bg-background shadow-lg"
                >
                  <span className="sr-only">Close</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />

      <BookAppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
        productName={product.name}
      />
    </AnimatedPage>
  );
}
