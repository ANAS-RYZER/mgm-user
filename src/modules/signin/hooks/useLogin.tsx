import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient, auth } from "@/lib/httpClient";

export const useLogin = () =>
  useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      const { data } = await apiClient.post("/auth/login", payload);
      return data;
    },
    onSuccess: (data: { accessToken: string; refreshToken: string; sessionId: string; refId?: string; user?: { refId?: string } }, { email }: { email: string; password: string }) => {
      auth.setAuth({ accessToken: data.accessToken, refreshToken: data.refreshToken, email, sessionId: data.sessionId ?? null, no: data?.user?.refId ?? null });
      if (data) {
        console.log("data.sessionId", data.sessionId);
        sessionStorage.setItem("sessionId", data.sessionId);
      }
    },
  });