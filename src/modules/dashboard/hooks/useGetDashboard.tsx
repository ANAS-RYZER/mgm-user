import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/httpClient";
import { toast } from "@/hooks/use-toast";

export const useGetDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
        try{
            const response = await apiClient.get("/users/dashboard");
            return response.data;
        } catch (error) {
            console.error(error);
            toast({
                title: "Failed to fetch dashboard data",
                description: "Please try again later",
                variant: "destructive",
            });
            return null;        
        }
    }
})
};