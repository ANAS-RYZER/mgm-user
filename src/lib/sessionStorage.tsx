// utils/sessionStorage.ts

export const setSessionItem = (key: string, value: any) => {
  if (typeof window === "undefined") return; // SSR safety

  try {
    const serialized = JSON.stringify(value);
    sessionStorage.setItem(key, serialized);
  } catch (error) {
    console.error("SessionStorage set error:", error);
  }
};

export const getSessionItem = <T = any,>(key: string): T | null => {
  if (typeof window === "undefined") return null;

  try {
    const item = sessionStorage.getItem(key);
    if (!item) return null;

    try {
      return JSON.parse(item);
    } catch {
      return item as T;
    }
  } catch (e) {
    console.error("Session get error:", e);
    return null;
  }
};

export const removeSessionItem = (key: string) => {
  if (typeof window === "undefined") return;

  try {
    sessionStorage.removeItem(key);
  } catch (error) {
    console.error("SessionStorage remove error:", error);
  }
};

export const clearSession = () => {
  if (typeof window === "undefined") return;

  try {
    sessionStorage.clear();
  } catch (error) {
    console.error("SessionStorage clear error:", error);
  }
};
