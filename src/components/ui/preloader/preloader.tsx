import styles from "./preloader.module.scss";
import ReactDOM from "react-dom";
const portal = document.getElementById("react-portal") as HTMLDivElement;

const Preloader = () => {
  return ReactDOM.createPortal(
    <div className={styles.preloader}>
      <p className="text text_type_main-medium">Загрузка...</p>
    </div>,
    portal
  );
};

export default Preloader;
