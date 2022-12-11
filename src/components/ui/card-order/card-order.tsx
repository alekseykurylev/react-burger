import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { Order } from "../../../redux/slices/orders";
import styles from "./card-order.module.scss";
import { v4 as uuidv4 } from "uuid";
import { useGetIngredientsQuery } from "../../../redux/api/ingredientsApi";

interface ICardOrderProps {
  order: Order;
}

const CardOrder: FC<ICardOrderProps> = ({ order }) => {
  const { data } = useGetIngredientsQuery("");
  const location = useLocation();

  const orderIngredients = order.ingredients.map((id) =>
    data?.data.find((item) => item._id === id)
  );

  const bun = orderIngredients.find((item) => item?.type === "bun");
  const filling = orderIngredients.filter((item) => item?.type !== "bun");

  const prise = [bun, bun, ...filling].reduce((total, item) => {
    return item ? total + item.price : 0;
  }, 0);

  const maxShowIngredients = 5;

  const orderIngredientsRender = () => {
    return [bun, ...filling].map(
      (item, index) =>
        index < maxShowIngredients && (
          <li className={styles.ingredient} key={uuidv4()}>
            <div className={styles.imgWrap}>
              <img
                className={styles.img}
                src={item?.image}
                width="112"
                height="56"
                alt={item?.name}
              />
            </div>
          </li>
        )
    );
  };

  const getStatus = () => {
    switch (order.status) {
      case "done":
        return "Выполнен";
      case "pending":
        return "Готовится";
      case "created":
        return "Создан";
    }
  };

  const orderIngredientsMoreRender = () => {
    if ([bun, ...filling].length > maxShowIngredients) {
      const plusCount = [bun, ...filling].length - maxShowIngredients;
      return (
        <li className={styles.ingredient}>
          <div className={styles.imgWrap}>
            <img
              className={styles.img}
              src={orderIngredients[maxShowIngredients]?.image}
              width="112"
              height="56"
              alt={orderIngredients[maxShowIngredients]?.name}
            />
            <div className={styles.imgCount}>
              <p className="text text_type_main-default">+{plusCount}</p>
            </div>
          </div>
        </li>
      );
    }
    return null;
  };

  console.log(location.pathname);

  return (
    <Link
      to={{
        pathname: `${location.pathname}/${order.number}`,
      }}
      state={{ background: location }}
      className={styles.card}
    >
      <div className={styles.header}>
        <p className="text text_type_digits-default">{order.number}</p>
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(order.createdAt)} />
        </p>
      </div>
      <h2 className="text text_type_main-medium mt-6">{order.name}</h2>
      {location.pathname === "/profile/orders" && (
        <p className="text text_type_main-default text_color_success mt-2">
          {getStatus()}
        </p>
      )}

      <div className={styles.footer}>
        <ul className={styles.ingredients}>
          <>
            {orderIngredientsRender()}
            {orderIngredientsMoreRender()}
          </>
        </ul>
        <div className={styles.sum}>
          <p className="text text_type_digits-default">{prise}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  );
};

export default CardOrder;
