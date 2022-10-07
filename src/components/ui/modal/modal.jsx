import { useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Close from "../close/close";
import ModalOverlay from "../modal-overlay/modal-overlay";
import modal from "./modal.module.scss";
const modalRoot = document.getElementById("react-modals");

const Modal = ({ onClose, overlay = true, children }) => {
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
    <div className={modal.modal}>
      {overlay && <ModalOverlay onCloseModal={onClose} />}
      <div className={modal.content}>
        <Close onClose={onClose} className={modal.close} />
        {children}
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  overlay: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Modal;
