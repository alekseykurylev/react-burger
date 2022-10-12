export const checkResponse = (res) => {
  if (!res.ok) {
    throw new Error("Error occurred!");
  }
  return res.json();
};
