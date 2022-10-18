import styles from "./ingredient-details.module.scss";
import { useSelector } from "react-redux";

const IngredientDetails = () => {
  const { ingredientDetails } = useSelector((store) => store.ingredients);

  return (
    <div className={styles.body}>
      <div className={styles.header}>
        <h3 className={styles.title}>Детали ингредиента</h3>
      </div>
      <img src={ingredientDetails.image_large} alt={ingredientDetails.name} />
      <h4 className={styles.name}>{ingredientDetails.name}</h4>
      <ul className={styles.nutritionList}>
        <li>
          <h5 className={styles.nutritionTitle}>Калории,ккал</h5>
          <p className={styles.nutritionValue}>{ingredientDetails.calories}</p>
        </li>
        <li>
          <h5 className={styles.nutritionTitle}>Белки, г</h5>
          <p className={styles.nutritionValue}>{ingredientDetails.proteins}</p>
        </li>
        <li>
          <h5 className={styles.nutritionTitle}>Жиры, г</h5>
          <p className={styles.nutritionValue}>{ingredientDetails.fat}</p>
        </li>
        <li>
          <h5 className={styles.nutritionTitle}>Углеводы, г</h5>
          <p className={styles.nutritionValue}>
            {ingredientDetails.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
};

export default IngredientDetails;
