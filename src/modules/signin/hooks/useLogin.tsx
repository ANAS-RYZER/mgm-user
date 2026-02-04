import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient, auth } from "@/lib/httpClient";

export const useLogin = () =>
  useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      const { data } = await apiClient.post("/auth/login", payload);
      return data;
    },
    onSuccess: (data: { accessToken: string; refreshToken: string; sessionId: string }, { email }) => {
      auth.setAuth({ accessToken: data.accessToken, refreshToken: data.refreshToken, email , sessionId: data.sessionId ?? null });
      if (data) {
        console.log("data.sessionId", data.sessionId);
        sessionStorage.setItem("sessionId", data.sessionId);
      }
    },
  });