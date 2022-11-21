import config from "./config";

interface IMakeRequest {
  method?: string;
  url: string;
  data?: unknown;
  headers?: any;
}

export const makeRequest = async <T>({
  url,
  method = "GET",
  data,
  headers = config.headers,
}: IMakeRequest): Promise<T> => {
  if (headers && headers.authorization) {
    headers.authorization = localStorage.getItem("accessToken");
  }

  try {
    const response = await fetch(url, {
      method: method,
      body: JSON.stringify(data),
      headers: headers,
    });
    return await config.checkResponse(response);
  } catch (error) {
    throw error;
  }
};
