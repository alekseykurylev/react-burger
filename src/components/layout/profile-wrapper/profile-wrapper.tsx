import styles from "./profile-wrapper.module.scss";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { logout } from "../../../redux/thunkActions/auth/auth";
import { useCallback } from "react";
import { getRefreshToken } from "../../../utils/utils";
import { useAppDispatch } from "../../../redux/hooks";

const ProfileWrapper = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const handleLogout = useCallback(() => {
    const refreshToken = getRefreshToken();
    dispatch(logout({ token: refreshToken }));
  }, [dispatch]);


  return (
    <div className={styles.grid}>
      <aside>
        <nav className={styles.nav}>
          <NavLink to="/profile" end className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }>
            Профиль
          </NavLink>
          <NavLink to="/profile/orders" className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }>
            История заказов
          </NavLink>
          <button className={styles.link} onClick={handleLogout}>
            Выход
          </button>
        </nav>
        {pathname === "/profile" && (
          <p className="text text_type_main-default text_color_inactive mt-20">
            В этом разделе вы можете
            <br /> изменить свои персональные данные
          </p>
        )}
        {pathname === "/profile/orders" && (
          <p className="text text_type_main-default text_color_inactive mt-20">
            В этом разделе вы можете
            <br /> просмотреть свою историю заказов
          </p>
        )}
      </aside>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileWrapper;
