"use client";
import { useState, useEffect } from "react";
import { useWishlist } from "@/lib/use-wishlist";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Trash2, AlertTriangle, Eye} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { products, formatPrice, Product } from "@/data/products";
import Image from "next/image";

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

  // Use actual catalogue products for wishlist demonstration
  // const mockWishlistItems = products
  //   .filter((product) => defaultWishlistIds.includes(product.id))
  //   .map((product) => ({
  //     ...product,
  //     price: formatPrice(product.price),
  //     originalPrice: product.originalPrice ? formatPrice(product.originalPrice) : undefined,
  //   }));

  // const wishlistItems = mockWishlistItems; // Always show mock data for demonstration

  const removeFromWishlist = (productId: string | number) => {
    setItemToRemove(Number(productId));
    setShowRemoveDialog(true);
  };

  // const confirmRemove = () => {
  //   if (itemToRemove !== null) {
  //     remove(itemToRemove as string);
  //     toast({
  //       title: "Removed from wishlist",
  //       description: "Item has been removed from your wishlist",
  //     });
  //     setShowRemoveDialog(false);
  //     setItemToRemove(null);
  //   }
  // };

  const viewProductDetails = (product: any) => {
    setSelectedProduct(product);
    setShowDetailsDialog(true);
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-mgm rounded-xl p-4 text-primary-foreground shadow-lg">
        <h1 className="font-display text-2xl font-bold mb-1">My Wishlist</h1>
        <p className="text-primary-foreground/90 text-sm">
          {/* {wishlistItems.length} items saved for later */}
        </p>
      </div>

      {/* {wishlistItems.length === 0 ? (
        <Card className="border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <CardContent className="p-8 text-center">
            <Heart className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Start adding items you love to your wishlist
            </p>
            <div className="flex gap-3 justify-center">
              <Link href="/catalogue">
                <Button className="gap-2 border-primary/30 hover:bg-primary/10 transition-all duration-300 hover:scale-105">
                  <ShoppingBag className="w-4 h-4" />
                  Browse Collection
                </Button>
              </Link>
              <Button 
                variant="outline"
                className="border-primary/30 hover:bg-primary/10 transition-all duration-300 hover:scale-105"
                onClick={() => {
                  toast({
                    title: "Wishlist Tips",
                    description: "Look for the heart icon on product pages to add items to your wishlist",
                  });
                }}
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                How to Add Items
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {wishlistItems.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-border/50 overflow-hidden group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Link href={`/product/${product.id}`}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </Link>
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-destructive hover:text-white transition-all duration-300 hover:scale-110"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <CardContent className="p-2">
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-body text-sm font-medium text-foreground hover:text-primary transition-colors truncate">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-muted-foreground capitalize">
                    {product.category}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-body text-sm font-semibold text-primary">{product.price}</span>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-xs px-2 py-1 border-primary/30 hover:bg-primary/10 transition-all duration-300 hover:scale-105"
                      onClick={() => viewProductDetails(product)}
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )} */}

      {/* Remove Confirmation Dialog */}
      {showRemoveDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-background rounded-xl shadow-xl max-w-md w-full overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Remove from Wishlist</h3>
                  <p className="text-sm text-muted-foreground">
                    Are you sure you want to remove this item from your wishlist?
                  </p>
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowRemoveDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  // onClick={confirmRemove}
                >
                  Remove Item
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Product Details Dialog */}
      {showDetailsDialog && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-background rounded-xl shadow-xl max-w-lg w-full overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground text-lg mb-1">{selectedProduct.name}</h3>
                  <p className="text-sm text-muted-foreground capitalize mb-2">{selectedProduct.category}</p>
                  <p className="font-semibold text-primary text-lg">{selectedProduct.price}</p>
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowDetailsDialog(false)}
                  className="border-primary/30 hover:bg-primary/10 transition-all duration-300"
                >
                  Close
                </Button>
                <Link href={`/product/${selectedProduct.id}`}>
                  <Button
                    onClick={() => setShowDetailsDialog(false)}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
                  >
                    View Full Details
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
