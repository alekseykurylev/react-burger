import styles from "./page-wrapper.module.scss";
import { Outlet } from "react-router-dom";

const PageWrapper = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Outlet />
      </div>
    </main>
  );
};

export default PageWrapper;
