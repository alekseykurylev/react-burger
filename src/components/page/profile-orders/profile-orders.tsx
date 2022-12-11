import styles from "./profile-orders.module.scss";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectOrders } from "../../../redux/slices/orders";
import OrdersList from "../../ui/orders-list/orders-list";
import {
  connect as connectLive,
  disconnect as disconnectLive,
} from "../../../redux/store";
import { useEffect } from "react";
import NavbarProfile from "../../ui/navbar-profile/navbar-profile";

export const LIVE_SERVER_URL = "wss://norma.nomoreparties.space/orders";

const Orders = () => {
  const dispatch = useAppDispatch();
  //const { status, orders, total, totalToday } = useAppSelector(selectOrders);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    dispatch(disconnectLive());
    dispatch(
      connectLive(`${LIVE_SERVER_URL}?token=${token?.replace("Bearer ", "")}`)
    );
  }, [dispatch, token]);

  return (
    <div className={styles.grid}>
      <aside>
        <NavbarProfile />
        <p className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете
          <br /> просмотреть свою историю заказов
        </p>
      </aside>
      <div>
        <OrdersList />
      </div>
    </div>
  );
};

export default Orders;
