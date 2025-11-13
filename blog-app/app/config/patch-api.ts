// config/patch-api.ts
import { BASE_URL, getAuthHeader } from "./configVariable";

export const patchAPI = async <T>(
  endpoint: string,
  data: Record<string, any>
): Promise<T> => {
  const authHeader = getAuthHeader();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    ...(authHeader.Authorization ? authHeader : {}),
  };

  console.log('Making PATCH request to:', `${BASE_URL}/${endpoint}`);
  console.log('Request headers:', headers);
  console.log('Request body:', data);

  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(data),
    credentials: 'omit', // Don't include credentials
    mode: 'cors', // Explicitly set CORS mode
  });

  if (!response.ok) {
    throw new Error(`PATCH request failed: ${response.statusText}`);
  }

  return response.json();
};
