import modalIngredient from "./modal-ingredient.module.scss";

const ModalIngredient = ({ ingredient }) => {
  return (
    <div className={modalIngredient.body}>
      <div className={modalIngredient.header}>
        <h3 className={modalIngredient.title}>Детали ингредиента</h3>
      </div>
      <img src={ingredient.image_large} alt={ingredient.name} />
      <h4 className={modalIngredient.name}>{ingredient.name}</h4>
      <ul className={modalIngredient.nutritionList}>
        <li>
          <h5 className={modalIngredient.nutritionTitle}>Калории,ккал</h5>
          <p className={modalIngredient.nutritionValue}>
            {ingredient.calories}
          </p>
        </li>
        <li>
          <h5 className={modalIngredient.nutritionTitle}>Белки, г</h5>
          <p className={modalIngredient.nutritionValue}>
            {ingredient.proteins}
          </p>
        </li>
        <li>
          <h5 className={modalIngredient.nutritionTitle}>Жиры, г</h5>
          <p className={modalIngredient.nutritionValue}>{ingredient.fat}</p>
        </li>
        <li>
          <h5 className={modalIngredient.nutritionTitle}>Углеводы, г</h5>
          <p className={modalIngredient.nutritionValue}>
            {ingredient.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
};

export default ModalIngredient;
