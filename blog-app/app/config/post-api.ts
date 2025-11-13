// config/post-api.ts
import { BASE_URL, getAuthHeader } from "./configVariable";
export const postAPI = async <T>(
  endpoint: string,
  data: any
): Promise<T> => {
  const authHeader = getAuthHeader();

  const isFormData = data instanceof FormData;

  const headers: HeadersInit = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(authHeader.Authorization ? authHeader : {})
  };

  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "POST",
    headers,
    body: isFormData ? data : JSON.stringify(data),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`POST failed: ${response.status} - ${errText}`);
  }

  return response.json();
};
