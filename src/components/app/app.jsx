import "../../styles/global.module.scss";
import AppHeader from "../app-header/app-header";
import Constructor from "../page/constructor/constructor";
import { createContext, useEffect, useState } from "react";
import { getIngredients } from "../../utils/api";

export const IngredientsContext = createContext();
export const BurgerContext = createContext();

const App = () => {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [burger, setBurger] = useState([]);

  useEffect(() => {
    getIngredients(setIngredients, setError, setLoading);
  }, []);

  return (
    <IngredientsContext.Provider value={{ ingredients }}>
      <BurgerContext.Provider value={{ burger, setBurger }}>
        <AppHeader />
        <main>
          {loading ? (
            "Загрузка..."
          ) : error ? (
            "Ошибка сервера, зайдите позже"
          ) : ingredients.length <= 0 ? (
            "Извините, но у нас закончились продукты, зайдите позже."
          ) : (
            <Constructor />
          )}
        </main>
      </BurgerContext.Provider>
    </IngredientsContext.Provider>
  );
};

export default App;
