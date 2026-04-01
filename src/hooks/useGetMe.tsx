import api from "@/lib/httpClient";
import { useQuery } from "@tanstack/react-query";

export default function useGetMe(isLoggedIn: boolean) {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const response = await api.get("/users/getme");
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    enabled: isLoggedIn,
  });
}
