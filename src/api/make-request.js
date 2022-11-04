import config from "./config";

export const makeRequest = async ({
  url,
  method = "GET",
  data,
  headers = config.headers,
}) => {
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
