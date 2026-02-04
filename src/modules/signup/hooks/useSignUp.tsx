import { useMutation } from "@tanstack/react-query";
import { apiClient , auth} from "@/lib/httpClient";

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
  