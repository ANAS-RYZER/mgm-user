import { apiClient, auth } from "@/lib/httpClient";






export const refreshAccessToken = async (refreshToken: string, sessionId: string ): Promise<string> => {

  if (!refreshToken) throw new Error("No refresh token");
  const { data } = await apiClient.post("/auth/refresh", { sessionId });
  const accessToken = (data as { accessToken: string }).accessToken;

  auth.setAccessToken(accessToken);
  return accessToken;
};


