import BurgerConstructor from "../../burger-constructor/burger-constructor";
import BurgerIngredients from "../../burger-ingredients/burger-ingredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import constructor from "./constructor.module.scss";

const Constructor = () => {
  return (
    <div className={constructor.container}>
      <div className={constructor.grid}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </div>
    </div>
  );
};

export default Constructor;
