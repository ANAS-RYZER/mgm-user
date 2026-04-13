"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  ShoppingBag,
  Trash2,
  AlertTriangle,
  Eye,
  Search,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/data/products";
import Image from "next/image";
import ProductCard from "@/commonui/ProductCard";
import useGetAllWishlist from "../../hooks/useGetAllWishlist";
import ProductListItem from "@/modules/catalogue/components/ProductListItem";
import { ProductGrid } from "@/modules/catalogue/components/ProductGrid";
import WishlistCard from "@/commonui/WishListCard";
import MGMLoader from "@/components/MGMLoader";

const defaultWishlistIds = ["1", "2", "3", "4", "5"];

const Wishlist = ({ profile: _profile }: { profile: any }) => {
  const { toast } = useToast();
  const { data: wishlist, isFetching: isLoading } = useGetAllWishlist();
  const [viewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="px-2 py-4 md:p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-mgm rounded-xl p-4 text-primary-foreground shadow-lg md:mt-0 mt-5">
        <h1 className="font-display text-2xl font-bold mb-1">My Wishlist</h1>
        <p className="text-primary-foreground/90 text-sm">
          {wishlist?.data.length} items saved for later
        </p>
      </div>
      {isLoading && (
        <div className="h-[60vh]">
          <MGMLoader />
        </div>
      )}
      {!isLoading && (!wishlist || wishlist.data.length === 0) && (
        <Card className="max-w-lg mx-auto bg-gradient-mgm backdrop-blur-sm border-border/50">
          <div className="p-8">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/30 flex items-center justify-center">
              <Search className="w-10 h-10 text-gold" />
            </div>
            <h3 className="text-2xl  font-semibold font-elegant text-white text-center mb-3">
              No Wishlist Items found
            </h3>
          </div>
        </Card>
      )}
      {wishlist && wishlist?.data.length > 0 && (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-4 px-2">
          {wishlist?.data.map((item: any) => (
            <WishlistCard key={item._id} product={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
