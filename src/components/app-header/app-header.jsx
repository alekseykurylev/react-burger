import appHeader from "./app-header.module.scss";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import HeaderLink from "../ui/header-link/header-link";

const AppHeader = () => {
  return (
    <header className={appHeader.header}>
      <div className={appHeader.container}>
        <div className={appHeader.grid}>
          <div className={appHeader.left}>
            <nav className={appHeader.nav}>
              <HeaderLink icon={<BurgerIcon />} pathname="/">
                Конструктор
              </HeaderLink>
              <HeaderLink icon={<ListIcon />} pathname="/order-feed">
                Лента заказов
              </HeaderLink>
            </nav>
          </div>
          <Logo />
          <div className={appHeader.right}>
            <nav className={appHeader.nav}>
              <HeaderLink icon={<ProfileIcon />} pathname="/login">
                Личный кабинет
              </HeaderLink>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
