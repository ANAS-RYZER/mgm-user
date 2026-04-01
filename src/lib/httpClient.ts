import { refreshAccessToken } from "@/hooks/Login-flow/useLogin";
// import axios from "axios";

const KEY = {
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  token: "token",
  email: "email",
  sessionId: "sessionId",
  no: "no",
} as const;

const isBrowser = () => typeof window !== "undefined";

export const auth = {
  getAccessToken: () => (isBrowser() ? sessionStorage.getItem(KEY.accessToken) : null),
  getRefreshToken: () => (isBrowser() ? sessionStorage.getItem(KEY.refreshToken) : null),
  getToken: () => (isBrowser() ? sessionStorage.getItem(KEY.token) : null),
  getEmail: () => (isBrowser() ? sessionStorage.getItem(KEY.email) : null),
  getSessionId: () => (isBrowser() ? sessionStorage.getItem(KEY.sessionId) : null), 

  setAuth: (data: { accessToken: string; refreshToken: string; email?: string; sessionId?: string | null; no?: string | null }) => {
    if (!isBrowser()) return;
    sessionStorage.setItem(KEY.accessToken, data.accessToken);
    sessionStorage.setItem(KEY.refreshToken, data.refreshToken);
    if (data.sessionId) sessionStorage.setItem(KEY.sessionId, data.sessionId);
    if (data.email) sessionStorage.setItem(KEY.email, data.email);
    if (data.no) sessionStorage.setItem(KEY.no, data.no);
  },

  setSignupSession: (data: { token: string; email: string }) => {
    if (!isBrowser()) return;
    sessionStorage.setItem(KEY.token, data.token);
    sessionStorage.setItem(KEY.email, data.email);
  },

  clearSignupSession: () => {
    if (!isBrowser()) return;
    sessionStorage.removeItem(KEY.token);
    sessionStorage.removeItem(KEY.email);
  },

  setAccessToken: (accessToken: string) => {
    if (!isBrowser()) return;
    sessionStorage.setItem(KEY.accessToken, accessToken);
  },

  clear: () => {
    if (!isBrowser()) return;
    Object.values(KEY).forEach((k) => sessionStorage.removeItem(k));
  },
};

// export const apiClient = axios.create({
//   // baseURL: "https://mgm-backend.vercel.app",
//       baseURL  : "http://localhost:5050" ,
//   headers: {
//     "Content-Type": "application/json",
//   },
  
// });

// apiClient.interceptors.request.use((config) => {
//   const token = auth.getAccessToken();
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// apiClient.interceptors.response.use(
//   (response) => response, // Return response as is if successful
//   async (error) => {
//     console.log("error", error);
//     const originalRequest = error.response.config;
//     console.log("originalRequest", originalRequest);

//     if (!error.response) {
//       console.error("Network error: No response received.");
//       return Promise.reject({ message: "Network Error" });
//     }

//     const { statusCode   } = error.response;
//     console.log("statusCode", statusCode);

//     if (statusCode === 401 || statusCode === 403) {
//       console.warn("Unauthorized request: Attempting to refresh token.");

//       try {
//         if (typeof window !== "undefined") {
//           const refreshToken = sessionStorage.getItem("refreshToken") || localStorage.getItem("refreshToken");
//           if (!refreshToken) {
//             console.error("No refresh token found. Redirecting to login.");
//             return auth.clear();
//           }

//           const accessToken = await refreshAccessToken();
//           console.log("accessToken", accessToken);

//           if (!accessToken) {
//             console.error("No access token found. Redirecting to login.");
//             return auth.clear();
//           }


//           // Store in the same location it was retrieved from
//           const storage = sessionStorage.getItem("refreshToken") ? sessionStorage : localStorage;
//             storage.setItem("accessToken", accessToken);

//           // Retry the original request with new token
//           originalRequest.headers.Authorization = `Bearer ${accessToken}`;
//           return apiClient.request(originalRequest);
//         }
//       } catch (refreshError) {
//         console.error("Token refresh failed:", refreshError);
//         return auth.clear();
//       }
//     }

//     return Promise.reject(error);
//   }
// );

import axios from "axios";

// Create an Axios instance
export const api = axios.create({
  baseURL: "http://localhost:5050/",
  // baseURL: "https://mgm-backend.vercel.app/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Alias so hooks (useLogin, etc.) and other code using apiClient use the same instance and 401 refresh logic
export const apiClient = api;

// Request Interceptor: Attach Token to Requests
api.interceptors.request.use(
  (config) => {
    // Check if we're in browser environment
    if (typeof window !== "undefined") {
      const token = sessionStorage.getItem("accessToken") || localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Token Expiry & Errors
api.interceptors.response.use(
  (response) => {
    // Backend may return HTTP 200 with body { statusCode: 401, error: "Unauthorized", ... } instead of HTTP 401.
    // Reject so the error handler (refresh token logic) runs.
    const data = response.data;
    const bodyStatus =
      data != null && typeof data === "object"
        ? Number((data as { statusCode?: number }).statusCode)
        : undefined;
    const isUnauthorized =
      bodyStatus === 401 ||
      bodyStatus === 403 ||
      (response.status === 200 &&
        (data != null && typeof data === "object" && (data as { error?: string }).error === "Unauthorized"));

    if (isUnauthorized) {
      const status = bodyStatus && bodyStatus >= 400 ? bodyStatus : 401;
      const syntheticError = Object.assign(
        new Error((data != null && typeof data === "object" && (data as { message?: string }).message) || "Unauthorized"),
        {
          config: response.config,
          response: { ...response, status, data },
          isAxiosError: true,
        }
      );
      return Promise.reject(syntheticError);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) {
      console.error("Network error: No response received.");
      return Promise.reject({ message: "Network Error" });
    }

    const { status } = error.response;
    const isRefreshRequest =
      originalRequest?.url?.includes?.("refresh") ?? originalRequest?.skipAuthRetry === true;

    if ((status === 401 || status === 403) && !isRefreshRequest) {
      console.warn("Unauthorized request: Attempting to refresh token.");

      try {
        if (typeof window !== "undefined") {
          const refreshToken = sessionStorage.getItem("refreshToken") 
          const sessionId = sessionStorage.getItem("sessionId")
          if (!refreshToken) {
          
            return handleLogout();
          }

          const data = await refreshAccessToken( refreshToken as string  ,sessionId as string );

          // Store in the same location it was retrieved from
          const storage = sessionStorage.getItem("refreshToken") ? sessionStorage : localStorage;
          storage.setItem("accessToken", data);

          // Retry the original request with new token
          originalRequest.headers.Authorization = `Bearer ${data}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        // return handleLogout();
      }
    }

    return Promise.reject(error);
  }
);

const handleLogout = () => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
  }
  return Promise.reject({ message: "Session expired. Redirecting to login." });
};

// Auth API functions


export default api;
