import styles from "./profile-orders.module.scss";
import { useAppDispatch } from "../../../redux/hooks";
import OrdersList from "../../ui/orders-list/orders-list";
import {
  connect as connectLive,
  disconnect as disconnectLive,
} from "../../../redux/store";
import { useEffect } from "react";
import NavbarProfile from "../../ui/navbar-profile/navbar-profile";
import { liveUrl } from "../../../const/const";

const Orders = () => {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    dispatch(connectLive(`${liveUrl}?token=${token?.replace("Bearer ", "")}`));
    return () => {
      dispatch(disconnectLive());
    };
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
