import styles from "./page-wrapper.module.scss";
import { Outlet } from "react-router-dom";
import AppHeader from "../header/header";

const PageWrapper = () => {
  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <div className={styles.container}>
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default PageWrapper;
