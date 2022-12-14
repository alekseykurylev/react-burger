import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient-item.module.scss";
import { useDrag } from "react-dnd";
import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useAppSelector } from "../../../redux/hooks";
import { selectBurger } from "../../../redux/slices/burger";
import { IIngredient } from "../../../api/rest/ingredients/type";

interface IProps {
  ingredient: IIngredient;
}

const IngredientItem = ({ ingredient }: IProps) => {
  const { bun, filling } = useAppSelector(selectBurger);
  const location = useLocation();

  const count = useMemo(() => {
    if (bun && bun._id === ingredient._id) {
      return 1;
    } else {
      return filling?.filter((item: IIngredient) => item._id === ingredient._id)
        .length;
    }
  }, [bun, filling, ingredient]);

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { ...ingredient, dragId: uuidv4() },
  });

  return (
    <Link
      key={ingredient._id}
      to={{
        pathname: `/ingredients/${ingredient._id}`,
      }}
      state={{ background: location }}
      className={styles.card}
      ref={dragRef}
    >
      <img src={ingredient.image} alt={ingredient.name} className="mb-1" />
      <p className={`text text_type_digits-default mb-1 ${styles.price}`}>
        {ingredient.price} <CurrencyIcon type="primary" />
      </p>
      <h3 className={`text text_type_main-default ${styles.title}`}>
        {ingredient.name}
      </h3>
      {count > 0 && <Counter count={count} size="default" />}
    </Link>
  );
};

export default IngredientItem;
