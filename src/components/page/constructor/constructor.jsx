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

export default Constructor;
