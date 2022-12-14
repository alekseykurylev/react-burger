import { useAppSelector } from "../../../redux/hooks";
import { selectOrders } from "../../../redux/slices/orders";
import CardOrder from "../card-order/card-order";
import styles from "./orders-list.module.scss";

const OrdersList = () => {
  const { orders } = useAppSelector(selectOrders);

  return (
    <ul className={styles.orders}>
      {orders.map((item) => (
        <li className="mb-4" key={item._id}>
          <CardOrder order={item} />
        </li>
      ))}
    </ul>
  );
};

export default OrdersList;
