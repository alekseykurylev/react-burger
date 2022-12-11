import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import OrdersList from "../../ui/orders-list/orders-list";
import styles from "./feed.module.scss";
import {
  connect as connectLive,
  disconnect as disconnectLive,
} from "../../../redux/store";
import { useEffect } from "react";
import { selectOrders } from "../../../redux/slices/orders";
import { v4 as uuidv4 } from "uuid";
import { liveUrl } from "../../../const/const";

const Feed = () => {
  const dispatch = useAppDispatch();
  const { status, orders, total, totalToday } = useAppSelector(selectOrders);

  useEffect(() => {
    dispatch(connectLive(liveUrl));
  }, [dispatch]);

  return (
    <section className="pt-10">
      <h1 className="text text_type_main-large mb-5">Лента заказов</h1>
      <div className={styles.grid}>
        <OrdersList />
        <div>
          <div className={styles.board}>
            <div>
              <h2 className="text text_type_main-medium mb-6">Готовы:</h2>
              <ul className={styles.boardList}>
                {orders
                  .filter((item) => item.status === "done")
                  .map(
                    (item, index) =>
                      index <= 9 && (
                        <li
                          className="text text_type_digits-default text_color_success"
                          key={uuidv4()}
                        >
                          {item.number}
                        </li>
                      )
                  )}
              </ul>
            </div>
            <div>
              <h2 className="text text_type_main-medium mb-6">В работе:</h2>
              <ul className={styles.boardList}>
                {orders
                  .filter((item) => item.status === "pending")
                  .map(
                    (item, index) =>
                      index <= 9 && (
                        <li
                          className="text text_type_digits-default"
                          key={uuidv4()}
                        >
                          {item.number}
                        </li>
                      )
                  )}
              </ul>
            </div>
          </div>
          <div className="mt-15">
            <h2 className="text text_type_main-medium">
              Выполнено за все время:
            </h2>
            <p className="text text_type_digits-large">{total}</p>
          </div>
          <div className="mt-15 mb-15">
            <h2 className="text text_type_main-medium">
              Выполнено за сегодня:
            </h2>
            <p className="text text_type_digits-large">{totalToday}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feed;
