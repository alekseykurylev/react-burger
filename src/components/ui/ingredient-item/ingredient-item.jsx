import { ingredientPropTypes } from "../../../types/types";
import PropTypes from "prop-types";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientItem from "./ingredient-item.module.scss";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import { useMemo } from "react";

const IngredientItem = ({ ingredient, onClick }) => {
  const { bun, filling } = useSelector((store) => store.burger);

  const count = useMemo(() => {
    if (bun && bun._id === ingredient._id) {
      return 1;
    } else {
      return filling.filter((item) => item._id === ingredient._id).length;
    }
  }, [bun, filling, ingredient]);

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { ...ingredient },
  });

  return (
    <div className={ingredientItem.card} onClick={onClick} ref={dragRef}>
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
  onClick: PropTypes.func.isRequired,
};

export default IngredientItem;
