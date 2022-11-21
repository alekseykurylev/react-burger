const config = {
  baseUrl: "https://norma.nomoreparties.space/api",
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
  checkResponse: (res: Response) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  },
};

export default config;
