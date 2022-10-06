import "../../styles/global.module.scss";
import AppHeader from "../app-header/app-header";
import Constructor from "../page/constructor/constructor";
import { API_INGREDIENTS } from "../../utils/const";
import { useEffect, useState } from "react";

const App = () => {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(API_INGREDIENTS)
      .then((res) => res.json())
      .then((obj) => {
        setIngredients(obj.data);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        setError(true);
      });
  }, []);

  return (
    <>
      <AppHeader />
      <main>
        {loading ? (
          "Загрузка..."
        ) : error ? (
          "Ошибка сервера, зайдите позже"
        ) : ingredients.length <= 0 ? (
          "Извините, но у нас закончились продукты, зайдите позже."
        ) : (
          <Constructor data={ingredients} />
        )}
      </main>
    </>
  );
};

export default App;
