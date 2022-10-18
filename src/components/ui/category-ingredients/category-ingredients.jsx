import { useSelector } from "react-redux";
import styles from "./category-ingredients.module.scss";
import IngredientItem from "../ingredient-item/ingredient-item";
import PropTypes from "prop-types";

const CategoryIngredients = ({ openIngredient, refCategories }) => {
  const { ingredients, categories, ingredientsFailed, ingredientsRequest } =
    useSelector((store) => store.ingredients);

  if (ingredientsRequest) {
    return "Загрузка ингредиентов...";
  } else if (ingredientsFailed) {
    return "Ошибка сервера, зайдите позже.";
  }

  return (
    <div className={styles.menu} ref={refCategories}>
      {categories.map((category) => (
        <div key={category.type} id={category.type}>
          <h2 className="text text_type_main-medium mb-6">{category.name}</h2>
          <ul className={styles.list}>
            {ingredients
              .filter((ingredient) => ingredient.type === category.type)
              .map((ingredient) => (
                <li key={ingredient._id}>
                  <IngredientItem
                    ingredient={ingredient}
                    onClick={() => openIngredient(ingredient)}
                  />
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

CategoryIngredients.propTypes = {
  openIngredient: PropTypes.func.isRequired,
  refCategories: PropTypes.any.isRequired,
};

export default CategoryIngredients;
