import { useQuery } from "@tanstack/react-query";
import { apiClient, auth } from "@/lib/httpClient";

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => apiClient.get("/auth/me"),
    select: (response) => response.data,
    enabled: !!auth.getAccessToken(),
  });
};