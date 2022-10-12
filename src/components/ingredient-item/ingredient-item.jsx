import { ingredientPropTypes } from "../../types/types";
import PropTypes from "prop-types";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientItem from "./ingredient-item.module.scss";
import { BurgerContext } from "../app/app";
import { useContext } from "react";

const IngredientItem = ({ ingredient, onClick }) => {
  const { burger } = useContext(BurgerContext);

  const count = burger.filter((item) => item._id === ingredient._id).length;

  return (
    <div className={ingredientItem.card} onClick={onClick}>
      <img src={ingredient.image} alt={ingredient.name} className="mb-1" />
      <p
        className={`text text_type_digits-default mb-1 ${ingredientItem.price}`}
      >
        {ingredient.price} <CurrencyIcon type="primary" />
      </p>
      <h3 className={`text text_type_main-default ${ingredientItem.title}`}>
        {ingredient.name}
      </h3>
      {count > 0 && <Counter count={count} size="default" />}
    </div>
  );
};

IngredientItem.propTypes = {
  ingredient: ingredientPropTypes.isRequired,
  onClick: PropTypes.func,
};

export default IngredientItem;
