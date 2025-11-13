// config/configVariable.ts
export const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

export const getAuthHeader = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("access_token");
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }
  }
  return {};
};
