import BurgerConstructor from "../../burger-constructor/burger-constructor";
import BurgerIngredients from "../../burger-ingredients/burger-ingredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./constructor.module.scss";
import { useAppSelector } from "../../../redux/hooks";
import selectIngredients from "../../../redux/selectors/ingredients";

const Constructor = () => {
  const { ingredients, ingredientsFailed, ingredientsRequest } =
    useAppSelector(selectIngredients);

  if (ingredientsRequest) {
    return "Загрузка ингредиентов...";
  }

  if (ingredientsFailed) {
    return "Ошибка сервера, зайдите позже.";
  }

  if (ingredients.length <= 0) {
    return "Извините, но у нас закончились продукты, зайдите позже.";
  }

  return (
    <div className={styles.grid}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </div>
  );
};

export default Constructor;
