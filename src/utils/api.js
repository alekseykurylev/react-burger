import { checkResponse } from "./services";

const baseUrl = "https://norma.nomoreparties.space/api/";

export const getIngredients = (setIngredients, setError, setLoading) => {
  fetch(`${baseUrl}ingredients`)
    .then(checkResponse)
    .then((data) => {
      setIngredients(data.data);
    })
    .catch((err) => {
      setError(true);
      console.error(err);
    })
    .finally(() => {
      setLoading(false);
    });
};

export const getOrder = (burger, setOrder) => {
  fetch(`${baseUrl}orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(burger),
  })
    .then(checkResponse)
    .then((order) => {
      setOrder(order);
    })
    .catch((err) => {
      console.log(err);
    });
};
