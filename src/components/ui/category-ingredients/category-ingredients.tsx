import styles from "./category-ingredients.module.scss";
import IngredientItem from "../ingredient-item/ingredient-item";
import { forwardRef } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { selectIngredients } from "../../../redux/slices/ingredients";
import { useGetIngredientsQuery } from "../../../redux/api/ingredientsApi";
import { categories } from "../../../const/const";

const CategoryIngredients = forwardRef<HTMLDivElement>((_, ref) => {
  //const { ingredients, categories } = useAppSelector(selectIngredients);

  const { data } = useGetIngredientsQuery("");

  return (
    <div className={styles.menu} ref={ref}>
      {categories.map((category) => (
        <div key={category.type} id={category.type}>
          <h2 className="text text_type_main-medium mb-6">{category.name}</h2>
          <ul className={styles.list}>
            {data?.data
              .filter((ingredient) => ingredient.type === category.type)
              .map((ingredient) => (
                <li key={ingredient._id}>
                  <IngredientItem ingredient={ingredient} />
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
});

export default CategoryIngredients;
