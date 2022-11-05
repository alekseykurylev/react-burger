import { Link } from "react-router-dom";
import styles from "./not-found.module.scss";

const NotFound404 = () => {
  return (
    <section className={styles.section}>
      <h1 className="text text_type_digits-large">404</h1>
      <p className="text text_type_main-default text_color_inactive">
        Перейти на <Link to="/">главную страницу</Link>
      </p>
    </section>
  );
};

export default NotFound404;
