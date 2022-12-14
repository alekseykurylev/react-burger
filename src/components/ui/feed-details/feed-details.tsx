import styles from "./feed-details.module.scss";
import { useLocation, useParams } from "react-router-dom";
import { ordersNumberRequest } from "../../../api";
import { useEffect, useState } from "react";
import { IOrder } from "../../../api/rest/orders/type";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useGetIngredientsQuery } from "../../../redux/api/ingredientsApi";

const FeedDetails = () => {
  const [order, setOrder] = useState<IOrder>();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const { data } = useGetIngredientsQuery("");
  const location = useLocation();

  const background = location.state && location.state.background;

  const fetchData = async (number: string | undefined) => {
    try {
      setIsLoading(true);
      const data = await ordersNumberRequest(number);
      setOrder(data.orders[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(id);
  }, [id]);

  if (isLoading) {
    return <div>Загрузка</div>;
  }

  const orderIngredients = order?.ingredients.map((id) =>
    data?.data.find((item) => item._id === id)
  );

  const bun = orderIngredients
    ? orderIngredients.find((item) => item?.type === "bun")
    : null;
  const filling = orderIngredients
    ? orderIngredients.filter((item) => item?.type !== "bun")
    : [];

  const prise = [bun, bun, ...filling].reduce((total, item) => {
    return item ? total + item.price : 0;
  }, 0);

  return (
    <section className="pt-30 pb-30">
      <div className={styles.container}>
        <p
          className="text text_type_digits-default mb-10"
          style={!background ? { textAlign: "center" } : {}}
        >
          #{order?.number}
        </p>
        <h1 className="text text_type_main-medium mb-3">{order?.name}</h1>
        <p className="text text_type_main-default text_color_success mb-15">
          {order?.status}
        </p>
        <h2 className="text text_type_main-medium mb-6">Состав:</h2>
        <ul className={styles.list}>
          {bun && (
            <li className={styles.item}>
              <div className={styles.qwe}>
                <div className={styles.imgWrap}>
                  <img
                    className={styles.img}
                    src={bun.image}
                    width="112"
                    height="56"
                    alt={bun.name}
                  />
                </div>
              </div>
              <h3
                className="text text_type_main-default"
                style={{ alignSelf: "center" }}
              >
                {bun.name}
              </h3>
              <div className={styles.sum}>
                <p className="text text_type_digits-default">2 x {bun.price}</p>
                <CurrencyIcon type="primary" />
              </div>
            </li>
          )}
          {filling.length > 0 &&
            filling
              .filter((elem, index, self) => index === self.indexOf(elem))
              .map((item, index) => (
                <li className={styles.item} key={index}>
                  <div className={styles.qwe}>
                    <div className={styles.imgWrap}>
                      <img
                        className={styles.img}
                        src={item?.image}
                        width="112"
                        height="56"
                        alt={item?.name}
                      />
                    </div>
                  </div>
                  <h3
                    className="text text_type_main-default"
                    style={{ alignSelf: "center" }}
                  >
                    {item?.name}
                  </h3>
                  <div className={styles.sum}>
                    <p className="text text_type_digits-default">
                      {filling.reduce((total, i) => {
                        if (i?._id === item?._id) {
                          return total + 1;
                        }
                        return total;
                      }, 0)}
                      x{item?.price}
                    </p>
                    <CurrencyIcon type="primary" />
                  </div>
                </li>
              ))}
        </ul>
        <div className={styles.footer}>
          <p className="text text_type_main-default text_color_inactive">
            <FormattedDate
              date={new Date(order?.createdAt ? order.createdAt : "")}
            />
          </p>

          <div className={styles.sum}>
            <p className="text text_type_digits-default">{prise}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedDetails;
