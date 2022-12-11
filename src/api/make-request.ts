import config from "./config";

interface IMakeRequest {
  url: string;
  method?: string;
  headers?: HeadersInit;
  data?: unknown;
  authorization?: boolean;
}

export const makeRequest = async <T>({
  url,
  method = "GET",
  headers = config.headers,
  data,
  authorization = false,
}: IMakeRequest): Promise<T> => {
  const token = localStorage.getItem("accessToken");

  if (authorization && token) {
    headers = { ...headers, authorization: token };
  }

  try {
    const response = await fetch(url, {
      method: method,
      body: JSON.stringify(data),
      headers,
    });

    if (!response.ok) {
      throw await response.json();
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};
