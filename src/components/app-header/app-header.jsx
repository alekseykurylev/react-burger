import appHeader from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import HeaderLink from "../ui/header-link/header-link";

const AppHeader = () => {
  return (
    <header className={appHeader.header}>
      <div className={appHeader.container}>
        <div className={appHeader.wrap}>
          <div className={appHeader.left}>
            <nav className={appHeader.nav}>
              <HeaderLink icon={<BurgerIcon />} active>Конструктор</HeaderLink>
              <HeaderLink icon={<ListIcon />}>Лента заказов</HeaderLink>
            </nav>
          </div>
          <Logo />
          <div className={appHeader.right}>
            <nav className={appHeader.nav}>
              <HeaderLink icon={<ProfileIcon />}>Личный кабинет</HeaderLink>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
