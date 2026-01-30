// hooks/auth/useMe.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/httpClient";
import { session } from "@/lib/session";


export const useLogin = () => {
  return useMutation({
    mutationFn: async (payload: {
      email: string;
      password: string;
    }) => {
      const res = await apiClient.post("/auth/login", payload);

      return res.data;
    },
    onSuccess: (res,variables) => {
  const { accessToken, refreshToken, sessionId } = res;
  session.setAuth({ accessToken, refreshToken, sessionId, email: variables.email, });

  if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }
},

  });
};

export const useSignup = () =>
  useMutation({
    mutationFn: async (payload: {
      email: string;
      password: string;
      fullName: string;
    }) => {
      const res = await apiClient.post("/auth/signup", payload);
      return res.data;
    },
    onSuccess: (res) => {
      const { accessToken, refreshToken, sessionId } = res;
      session.setAuth({ accessToken, refreshToken, sessionId });

      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }
    },
  });


export const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) throw new Error("No refresh token");

  const res = await apiClient.post("/auth/refresh", { refreshToken });
  localStorage.setItem("accessToken", res.data.accessToken);

  return res.data.accessToken;
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: async (payload: {otp: string }) => {
      const res = await apiClient.post("/auth/verify-otp", payload);

      const { accessToken, refreshToken, sessionId } = res.data;

      session.setAuth({ accessToken, refreshToken, sessionId });

      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }

      return res.data;
    },
  });
}; 


export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await apiClient.post("/auth/logout");
      localStorage.clear();
    },
    onSuccess: () => {
      queryClient.clear();
    },
  });
};

export const useResendOtp = () => {
  return useMutation({
    mutationFn: async () => {
      const res = await apiClient.post("/auth/resend-otp");
      return res.data;
    },
  });
};