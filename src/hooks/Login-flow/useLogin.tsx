import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient, auth } from "@/lib/httpClient";

export const useLogin = () =>
  useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      const { data } = await apiClient.post("/auth/login", payload);
      return data;
    },
    onSuccess: (data: { accessToken: string; refreshToken: string }, { email }) => {
      auth.setAuth({ accessToken: data.accessToken, refreshToken: data.refreshToken, email });
    },
  });

export const useSignup = () =>
  useMutation({
    mutationFn: async (payload: { fullName: string; email: string; password: string; refId?: string }) => {
      const body: Record<string, string> = { fullName: payload.fullName, email: payload.email, password: payload.password };
      if (payload.refId?.trim()) body.refId = payload.refId.trim().toUpperCase();
      const { data } = await apiClient.post("/auth/signup", body);
      return data as { token: string };
    },
    onSuccess: (data, variables) => {
      auth.setSignupSession({ token: data.token, email: variables.email });
    },
  });

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

export const useResendOtp = () =>
  useMutation({
    mutationFn: async () => {
      const email = auth.getEmail();
      if (!email) throw new Error("Missing email");
      const { data } = await apiClient.post("/auth/resend-otp", { email });
      return data as { token: string };
    },
    onSuccess: (data) => {
      const email = auth.getEmail();
      if (email) auth.setSignupSession({ token: data.token, email });
    },
  });

export const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = auth.getRefreshToken();
  if (!refreshToken) throw new Error("No refresh token");
  const { data } = await apiClient.post("/auth/refresh", { refreshToken });
  const accessToken = (data as { accessToken: string }).accessToken;
  auth.setAccessToken(accessToken);
  return accessToken;
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => apiClient.post("/auth/logout"),
    onSuccess: () => {
      auth.clear();
      queryClient.clear();
    },
  });
};
