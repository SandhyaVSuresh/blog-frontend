// config/get-api.ts
import { BASE_URL, getAuthHeader } from "./configVariable";

export const getAPI = async <T>(endpoint: string): Promise<T> => {
  const authHeader = getAuthHeader();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    ...(authHeader.Authorization ? authHeader : {}),
  };

  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: 'GET',
    headers,
    mode: 'cors',
    credentials: 'omit'
  });

  if (!response.ok) {
    throw new Error(`GET request failed: ${response.statusText}`);
  }

  return response.json();
};
