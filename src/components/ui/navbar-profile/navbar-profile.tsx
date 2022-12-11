import React, { useCallback } from "react";
import styles from "./navbar-profile.module.scss";
import { NavLink, useLocation } from "react-router-dom";
import { getRefreshToken } from "../../../utils/utils";
import { logoutUser } from "../../../redux/syncs/auth/auth";
import { useAppDispatch } from "../../../redux/hooks";

const NavbarProfile = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const handleLogout = useCallback(() => {
    const refreshToken = getRefreshToken();
    dispatch(logoutUser({ token: refreshToken }));
  }, [dispatch]);

  return (
    <nav className={styles.nav}>
      <NavLink
        to="/profile"
        end
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
      >
        Профиль
      </NavLink>
      <NavLink
        to="/profile/orders"
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
      >
        История заказов
      </NavLink>
      <button className={styles.link} onClick={handleLogout}>
        Выход
      </button>
    </nav>
  );
};

export default NavbarProfile;
