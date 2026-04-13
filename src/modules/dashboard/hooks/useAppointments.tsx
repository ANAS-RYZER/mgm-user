import api from "@/lib/httpClient";
import { useQuery } from "@tanstack/react-query";

export default function useGetAppointments(filter: string = "all") {
  return useQuery({
    queryKey: ["appointments", filter],
    queryFn: async () => {
      const res = await api.get(`/appointments?filter=${filter}`);
      return res.data;
    },
    staleTime: 5 * 60 * 1000, 
    refetchOnWindowFocus: false,
    retry: 3,
  });
}
