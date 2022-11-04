import BurgerConstructor from "../../burger-constructor/burger-constructor";
import BurgerIngredients from "../../burger-ingredients/burger-ingredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./constructor.module.scss";
import { useSelector } from "react-redux";

const Constructor = () => {
  const { ingredients, ingredientsFailed, ingredientsRequest } = useSelector(
    (store) => store.ingredients
  );

  return (
    <>
      {ingredientsRequest ? (
        "Загрузка ингредиентов..."
      ) : ingredientsFailed ? (
        "Ошибка сервера, зайдите позже."
      ) : ingredients.length <= 0 ? (
        "Извините, но у нас закончились продукты, зайдите позже."
      ) : (
        <div className={styles.grid}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </div>
      )}
    </>
  );
};

export default Constructor;
