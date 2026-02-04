import { apiClient, auth } from "@/lib/httpClient";
import { useMutation } from "@tanstack/react-query";

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
  