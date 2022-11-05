import { useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Close from "../close/close";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.scss";
const modalRoot = document.getElementById("react-modals");

const Modal = ({ onClose, children, className }) => {
  useEffect(() => {
    const closeOnEsc = (e) => {
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
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
};

export default Modal;
