import { useState } from "react";
import burgerIngredients from "./burger-ingredients.module.scss";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientItem from "../ui/ingredient-item/ingredient-item";

const BurgerIngredients = ({ data }) => {
  const [current, setCurrent] = useState("bun");

  const categories = [
    {
      type: "bun",
      name: "Булки",
    },
    {
      type: "sauce",
      name: "Соусы",
    },
    {
      type: "main",
      name: "Начинки",
    },
  ];

  return (
    <section className="pt-10">
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <div className={burgerIngredients.tab}>
        {categories.map((category) => (
          <Tab
            key={category.type}
            value={category.type}
            active={current === category.type}
            onClick={setCurrent}
          >
            {category.name}
          </Tab>
        ))}
      </div>
      <div className={burgerIngredients.menu}>
        {categories.map((category) => (
          <div key={category.type}>
            <h2 className="text text_type_main-medium mb-6">{category.name}</h2>
            <ul className={burgerIngredients.list}>
              {data
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
    </section>
  );
};

export default BurgerIngredients;
