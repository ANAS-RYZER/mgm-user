import api from "@/lib/httpClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useToggleWishlist() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["toggleWishlist"],
    mutationFn: async (productId: string) => {
      const res = await api.put(`/wishlist/toggle?productId=${productId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products","get-wishlist"] });
    }
  });
}
