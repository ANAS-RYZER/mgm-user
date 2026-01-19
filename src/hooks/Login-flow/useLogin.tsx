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
    onSuccess: (res) => {
  const { accessToken, refreshToken, sessionId } = res;
  session.setAuth({ accessToken, refreshToken, sessionId });
},

  });
};

export const useSignup = () =>
  useMutation({
    mutationFn: async (payload: {
      email: string;
      password: string;
    }) => {
      const res = await apiClient.post("/auth/signup", payload);
      return res.data;
    },
    onSuccess: (res) => {
      const { accessToken, refreshToken, sessionId } = res;
      session.setAuth({ accessToken, refreshToken, sessionId });
    },
  });



// export const useMe = (options?: UseMeOptions) => {
//   return useQuery({
//     queryKey: ["me"],
//     queryFn: async () => {
//       const res = await apiClient.get("/auth/me");
//       return res.data.user;
//     },
//     enabled: options?.enabled ?? true,
//     retry: false,
//   });
// };

export const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) throw new Error("No refresh token");

  const res = await apiClient.post("/auth/refresh", { refreshToken });
  localStorage.setItem("accessToken", res.data.accessToken);

  return res.data.accessToken;
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: async (payload: {sessionId: string; otp: string }) => {
      const res = await apiClient.post("/auth/verify-otp", payload);

      if (typeof window !== "undefined") {
        if (res.data?.accessToken) {
          localStorage.setItem("accessToken", res.data.accessToken);
        }
        if (res.data?.refreshToken) {
          localStorage.setItem("refreshToken", res.data.refreshToken);
        }
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
