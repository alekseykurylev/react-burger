import { useState } from "react";
import PropTypes from "prop-types";
import { ingredientPropTypes } from "../../types/types";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientItem from "./ingredient-item.module.scss";
import Modal from "../ui/modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

const IngredientItem = ({ ingredient }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className={ingredientItem.card} onClick={() => setOpenModal(true)}>
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

      {openModal && (
        <Modal onClose={() => setOpenModal(false)}>
          <IngredientDetails ingredient={ingredient} />
        </Modal>
      )}
    </>
  );
};

IngredientItem.propTypes = {
  ingredient: ingredientPropTypes.isRequired,
};

export default IngredientItem;
