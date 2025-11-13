// config/delete-api.ts
import { BASE_URL, getAuthHeader } from "./configVariable";

export const deleteAPI = async (endpoint: string): Promise<void> => {
  const authHeader = getAuthHeader();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(authHeader.Authorization ? authHeader : {}),
  };

  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "DELETE",
    headers,
  });

  if (!response.ok) {
    throw new Error(`DELETE request failed: ${response.statusText}`);
  }
};
