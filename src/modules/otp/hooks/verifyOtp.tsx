import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient, auth } from "@/lib/httpClient";




export const useVerifyOtp = () =>
  useMutation({
    mutationFn: async (payload: { otp: string }) => {
      const token = auth.getToken();
      if (!token) throw new Error("No verification token");
      const { data } = await apiClient.post("/auth/verify-otp", { token, otp: payload.otp });
      return data as { accessToken: string; refreshToken: string };
    },
    onSuccess: (data) => {
      auth.setAuth({ accessToken: data.accessToken, refreshToken: data.refreshToken });
      auth.clearSignupSession();
    },
  });
