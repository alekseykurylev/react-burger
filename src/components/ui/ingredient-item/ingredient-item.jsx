import PropTypes from "prop-types";
import { ingredientPropTypes } from "../../../types/types";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientItem from "./ingredient-item.module.scss";

const IngredientItem = ({ ingredient }) => {
  return (
    <div className={ingredientItem.card}>
      <img src={ingredient.image} alt={ingredient.name} className="mb-1" />
      <p
        className={`text text_type_digits-default mb-1 ${ingredientItem.price}`}
      >
        {ingredient.price} <CurrencyIcon type="primary" />
      </p>
      <h3 className={`text text_type_main-default ${ingredientItem.title}`}>
        {ingredient.name}
      </h3>
      <Counter count={1} size="default" />
    </div>
  );
};

IngredientItem.propTypes = {
  ingredient: PropTypes.shape({ ingredientPropTypes }).isRequired,
};

export default IngredientItem;
