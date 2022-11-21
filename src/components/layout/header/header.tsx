import styles from "./header.module.scss";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, NavLink } from "react-router-dom";

const AppHeader = () => {

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.left}>
            <nav className={styles.nav}>
              <NavLink to="/" end className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }>
                <BurgerIcon type="primary" /> 
                Конструктор
              </NavLink>
              <NavLink to="/order-feed" className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }>
                <ListIcon type="primary" />
                Лента заказов
              </NavLink>
            </nav>
          </div>
          <Link to="/">
            <Logo />
          </Link>
          <div className={styles.right}>
            <nav className={styles.nav}>
              <NavLink to="/profile" className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }>
                <ProfileIcon type="primary" />
                Личный кабинет
              </NavLink>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
