import styles from "./ingredient-details.module.scss";
import { useParams } from "react-router-dom";
import { useGetIngredientsQuery } from "../../../redux/api/ingredientsApi";

const IngredientDetails = () => {
  const { data } = useGetIngredientsQuery("");
  const params = useParams();

  const ingredient = data?.data.find(
    (ingredient) => ingredient._id === params.id
  );

  return (
    <section className="pt-30 pb-30">
      <div key={ingredient?._id} className={styles.body}>
        <h3 className={styles.title}>Детали ингредиента</h3>
        <img src={ingredient?.image_large} alt={ingredient?.name} />
        <h4 className={styles.name}>{ingredient?.name}</h4>
        <ul className={styles.nutritionList}>
          <li>
            <h5 className={styles.nutritionTitle}>Калории,ккал</h5>
            <p className={styles.nutritionValue}>{ingredient?.calories}</p>
          </li>
          <li>
            <h5 className={styles.nutritionTitle}>Белки, г</h5>
            <p className={styles.nutritionValue}>{ingredient?.proteins}</p>
          </li>
          <li>
            <h5 className={styles.nutritionTitle}>Жиры, г</h5>
            <p className={styles.nutritionValue}>{ingredient?.fat}</p>
          </li>
          <li>
            <h5 className={styles.nutritionTitle}>Углеводы, г</h5>
            <p className={styles.nutritionValue}>{ingredient?.carbohydrates}</p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default IngredientDetails;
