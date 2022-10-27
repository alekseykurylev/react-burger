export const makeRequest = async ({
  url = "/",
  method = "GET",
  data,
  headers,
}) => {
  const response = await fetch(url, {
    method: method,
    body: JSON.stringify(data),
    headers: headers,
  });
  if (!response.ok) {
    throw new Error("Error occurred!");
  }
  return await response.json();
};
