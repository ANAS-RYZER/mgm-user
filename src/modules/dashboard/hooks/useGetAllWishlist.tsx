import api from "@/lib/httpClient";
import { useQuery } from "@tanstack/react-query";

export default function useGetAllWishlist() {
  return useQuery({
    queryKey: ["get-wishlist"],
    queryFn: async () => {
      const res = await api.get("/wishlist");
      return res.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 2,
  });
}
