import PropTypes from "prop-types";
import { ingredientPropTypes } from "../../../types/types";
import BurgerConstructor from "../../burger-constructor/burger-constructor";
import BurgerIngredients from "../../burger-ingredients/burger-ingredients";
import constructor from "./constructor.module.scss";

const Constructor = () => {
  return (
    <div className={constructor.container}>
      <div className={constructor.grid}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </div>
  );
};

// Constructor.propTypes = {
//   data: PropTypes.arrayOf(ingredientPropTypes).isRequired,
// };

export default Constructor;
