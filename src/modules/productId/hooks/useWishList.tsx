import { toast, useToast } from "@/hooks/use-toast";
import { api} from "@/lib/httpClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const WISHLIST_QUERY_KEY = ["wishlist"] as const;

/** Returns wishlist product IDs from React Query cache. Updates when you toggle (optimistic + refetch). */


export const useToggleWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["wishlist-toggle"],

    mutationFn: async (productId: string) => {
      const id = productId?.trim();
      if (!id) throw new Error("Product ID is required");
      const response = await api.put("/wishlist/toggle", undefined, {
        params: { productId: id },
      });
      return response.data;
    },

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: WISHLIST_QUERY_KEY });

      const previousWishlist =
        queryClient.getQueryData<string[]>(WISHLIST_QUERY_KEY);

      
      return { previousWishlist };
    },

    // ❌ Error handling + rollback
    onError: (error: any, _productId, context) => {
      queryClient.setQueryData(
        WISHLIST_QUERY_KEY,
        context?.previousWishlist
      );

      if (!error?.response) {
        console.error("Network error");
        return;
      }

      switch (error.response.status) {
        case 401:
          
          break;
        case 404:
          toast({
            title: "Product not found",
            description: "The product you are trying to add to your wishlist is not found",
            variant: "destructive",
          });
          break;
        default:
          console.error("Wishlist toggle failed");
      }
    },

    // 🔄 Always sync
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEY });
    },

    throwOnError: false,
  });
};
