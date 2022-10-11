const URL_INGREDIENTS = "https://norma.nomoreparties.space/api/ingredients";
const URL_ORDERS = "https://norma.nomoreparties.space/api/orders";

export const getIngredients = (setIngredients, setError, setLoading) => {
  fetch(URL_INGREDIENTS)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error occurred!");
      }
      return res.json();
    })
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
  fetch(URL_ORDERS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(burger),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error occurred!");
      }
      return res.json();
    })
    .then((order) => {
      setOrder(order);
    })
    .catch((err) => {
      console.log(err);
    });
};
