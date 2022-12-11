import { FC, useEffect } from "react";
import ReactDOM from "react-dom";
import Close from "../close/close";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.scss";
const portal = document.getElementById("react-portal") as HTMLDivElement;

interface IProps {
  onClose: () => any;
  className: string;
  children: JSX.Element;
}

const Modal: FC<IProps> = ({ onClose, className, children }) => {
  useEffect(() => {
    const closeOnEsc = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", closeOnEsc);

    return () => {
      document.removeEventListener("keydown", closeOnEsc);
    };
  }, [onClose]);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.touchAction = "none";
    document.documentElement.style.paddingRight = "0px";
    return () => {
      document.documentElement.removeAttribute("style");
    };
  }, []);

  return ReactDOM.createPortal(
    <div
      className={
        className ? `${styles.modal} ${styles[className]}` : styles.modal
      }
    >
      <ModalOverlay onCloseModal={onClose} />
      <div className={styles.content}>
        <Close onClose={onClose} className={styles.close} />
        {children}
      </div>
    </div>,
    portal
  );
};

export default Modal;
