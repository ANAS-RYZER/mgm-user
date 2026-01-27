"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/commonui/Header";
import Footer from "@/commonui/Footer";
import BookAppointmentModal from "@/commonui/BookAppointmentModal";
import { products } from "@/lib/products";
import { useToast } from "@/hooks/use-toast";
import { useWishlist } from "@/lib/use-wishlist";
import AnimatedPage from "@/components/AnimatedPage";
import { Button } from "@/components/ui/button";
import ProductBreadcrumb from "@/components/product/ProductBreadcrumb";
import ProductGallery from "@/components/product/ProductGallery";
import ProductDetails from "@/components/product/ProductDetails";
import ProductInfoTabs from "@/components/product/ProductInfoTabs";
import RelatedProducts from "@/components/product/RelatedProducts";
import ProductImageLightbox from "@/components/product/ProductImageLightbox";

export default function ProductDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const { toast } = useToast();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const wishlist = useWishlist();

  const product = products.find((p) => p.id === id);
  const relatedProducts = products
    .filter((p) => p.category === product?.category && p.id !== id)
    .slice(0, 4);

  const images = product?.images || (product?.image ? [product.image] : []);
  const discount = product?.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!isLightboxOpen) return;
      if (e.key === "ArrowLeft")
        setSelectedImageIndex((i) => (i === 0 ? images.length - 1 : i - 1));
      if (e.key === "ArrowRight")
        setSelectedImageIndex((i) => (i === images.length - 1 ? 0 : i + 1));
      if (e.key === "Escape") setIsLightboxOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isLightboxOpen, images.length]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background font-montserrat">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-montserrat text-2xl font-semibold mb-4 tracking-tight">
            Product Not Found
          </h1>
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
      description: now
        ? `${product.name} has been added to your wishlist.`
        : `${product.name} has been removed from your wishlist.`,
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
        <ProductBreadcrumb 
          category={product.category} 
          productName={product.name}
        />

        {/* Product Section */}
        <section className="py-8 lg:py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Left Column - Images */}
              <ProductGallery
                images={images}
                productName={product.name}
                isNew={product.isNew}
                isBestSeller={product.isBestSeller}
                discount={discount}
                selectedImageIndex={selectedImageIndex}
                onSelectImageIndex={setSelectedImageIndex}
                isInWishlist={wishlist.isIn(Number(product.id))}
                onWishlistClick={handleAddToWishlist}
                onShareClick={handleShare}
                onImageClick={() => setIsLightboxOpen(true)}
              />

              {/* Right Column - Details */}
              <ProductDetails
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                description={product.description}
                karatage={product.karatage}
                certification={product.certification}
                goldWeight={product.goldWeight}
                weight={product.weight}
                purity={product.purity}
                makingCharges={product.makingCharges}
                isInWishlist={wishlist.isIn(Number(product.id))}
                onBookAppointment={() => setIsAppointmentModalOpen(true)}
                onWishlistClick={handleAddToWishlist}
              />
            </div>

            {/* Detailed Information Tabs */}
            <ProductInfoTabs />
          </div>
        </section>

        {/* Related Products */}
        <RelatedProducts 
          products={relatedProducts}
          category={product.category}
        />
      </main>

      {/* Lightbox */}
      <ProductImageLightbox
        isOpen={isLightboxOpen}
        images={images}
        selectedIndex={selectedImageIndex}
        onClose={() => setIsLightboxOpen(false)}
        onNext={() =>
          setSelectedImageIndex((i) =>
            i === images.length - 1 ? 0 : i + 1,
          )
        }
        onPrev={() =>
          setSelectedImageIndex((i) =>
            i === 0 ? images.length - 1 : i - 1,
          )
        }
        onSelectImage={setSelectedImageIndex}
        productName={product.name}
      />

      <Footer />

      <BookAppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
        productName={product.name}
      />
    </AnimatedPage>
  );
}
