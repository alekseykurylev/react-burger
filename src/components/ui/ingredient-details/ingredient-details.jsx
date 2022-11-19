import styles from "./ingredient-details.module.scss";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import selectIngredients from "../../../redux/selectors/ingredients";

const IngredientDetails = () => {
  const { ingredients, ingredientsFailed, ingredientsRequest } =
    useAppSelector(selectIngredients);
  const params = useParams();

  const ingredient = ingredients.find(
    (ingredient) => ingredient._id === params.id
  );

  if (ingredientsRequest) {
    return "Загрузка...";
  }

  if (ingredientsFailed) {
    return "Ошибка сервера, зайдите позже.";
  }

  if (ingredients.length <= 0) {
    return "Извините, ингредиент закончился.";
  }

  return (
    <section className="pt-30 pb-30">
      <div key={ingredient._id} className={styles.body}>
        <h3 className={styles.title}>Детали ингредиента</h3>
        <img src={ingredient.image_large} alt={ingredient.name} />
        <h4 className={styles.name}>{ingredient.name}</h4>
        <ul className={styles.nutritionList}>
          <li>
            <h5 className={styles.nutritionTitle}>Калории,ккал</h5>
            <p className={styles.nutritionValue}>{ingredient.calories}</p>
          </li>
          <li>
            <h5 className={styles.nutritionTitle}>Белки, г</h5>
            <p className={styles.nutritionValue}>{ingredient.proteins}</p>
          </li>
          <li>
            <h5 className={styles.nutritionTitle}>Жиры, г</h5>
            <p className={styles.nutritionValue}>{ingredient.fat}</p>
          </li>
          <li>
            <h5 className={styles.nutritionTitle}>Углеводы, г</h5>
            <p className={styles.nutritionValue}>{ingredient.carbohydrates}</p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default IngredientDetails;
