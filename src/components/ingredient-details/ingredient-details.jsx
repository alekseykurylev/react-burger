import { ingredientPropTypes } from "../../types/types";
import ingredientDetails from "./ingredient-details.module.scss";

const IngredientDetails = ({ ingredient }) => {
  return (
    <div className={ingredientDetails.body}>
      <div className={ingredientDetails.header}>
        <h3 className={ingredientDetails.title}>Детали ингредиента</h3>
      </div>
      <img src={ingredient.image_large} alt={ingredient.name} />
      <h4 className={ingredientDetails.name}>{ingredient.name}</h4>
      <ul className={ingredientDetails.nutritionList}>
        <li>
          <h5 className={ingredientDetails.nutritionTitle}>Калории,ккал</h5>
          <p className={ingredientDetails.nutritionValue}>
            {ingredient.calories}
          </p>
        </li>
        <li>
          <h5 className={ingredientDetails.nutritionTitle}>Белки, г</h5>
          <p className={ingredientDetails.nutritionValue}>
            {ingredient.proteins}
          </p>
        </li>
        <li>
          <h5 className={ingredientDetails.nutritionTitle}>Жиры, г</h5>
          <p className={ingredientDetails.nutritionValue}>{ingredient.fat}</p>
        </li>
        <li>
          <h5 className={ingredientDetails.nutritionTitle}>Углеводы, г</h5>
          <p className={ingredientDetails.nutritionValue}>
            {ingredient.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
};

IngredientDetails.propTypes = {
  ingredient: ingredientPropTypes.isRequired,
};

export default IngredientDetails;
