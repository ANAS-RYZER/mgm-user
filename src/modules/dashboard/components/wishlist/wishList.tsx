"use client";
import { useState, useEffect } from "react";
import { useWishlist } from "@/lib/use-wishlist";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Trash2, AlertTriangle, Eye} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/data/products";
import Image from "next/image";
import ProductCard from "@/commonui/ProductCard";

const defaultWishlistIds = ["1", "2", "3", "4", "5"];

const Wishlist = ({ profile: _profile }: { profile: any }) => {
  const { ids: wishlistIds, remove } = useWishlist();
  const { toast } = useToast();
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  useEffect(() => {
    // Always show mock data for demonstration using actual product IDs
    defaultWishlistIds.forEach(id => {
      // This would normally update the wishlist state
      console.log(`Mock wishlist item: ${id}`);
    });
  }, []);



  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-mgm rounded-xl p-4 text-primary-foreground shadow-lg">
        <h1 className="font-display text-2xl font-bold mb-1">My Wishlist</h1>
        <p className="text-primary-foreground/90 text-sm">
          {/* {wishlistItems.length} items saved for later */}
        </p>
      </div>
      {/* <ProductCard product={[]} /> */}

    
      

    </div>
  );
};

export default Wishlist;
