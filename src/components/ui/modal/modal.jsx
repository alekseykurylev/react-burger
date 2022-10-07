import { useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Close from "../close/close";
import ModalOverlay from "../modal-overlay/modal-overlay";
import modal from "./modal.module.scss";
const modalRoot = document.getElementById("react-modals");

const Modal = ({ isOpen, onClose, overlay = true, children }) => {
  const closeOnEsc = (e) => {
    if (e.code === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", closeOnEsc);
    return () => {
      document.removeEventListener("keydown", closeOnEsc);
    };
  });

  if (!isOpen) return null;
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
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  overlay: PropTypes.bool,
  children: PropTypes.element.isRequired,
};

export default Modal;
