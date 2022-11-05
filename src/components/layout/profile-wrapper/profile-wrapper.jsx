import styles from "./profile-wrapper.module.scss";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../services/thunkActions/auth";
import { useCallback } from "react";
import { getRefreshToken } from "../../../utils/utils";

const ProfileWrapper = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const handleLogout = useCallback(() => {
    const refreshToken = getRefreshToken();
    dispatch(logout({ token: refreshToken }));
  }, [dispatch]);

  const getStyleForNavLink = ({ isActive }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;

  return (
    <div className={styles.grid}>
      <aside>
        <nav className={styles.nav}>
          <NavLink to="/profile" end className={getStyleForNavLink}>
            Профиль
          </NavLink>
          <NavLink to="/profile/orders" className={getStyleForNavLink}>
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
