//import ReactDOM from "react-dom";
import modalOverlay from "./modal-overlay.module.scss";
//const modalRoot = document.getElementById("react-modals");

const ModalOverlay = ({ onCloseModal }) => {
  // return ReactDOM.createPortal(
  //   <div className={modalOverlay.overlay} onClick={onCloseModal} />,
  //   modalRoot
  // );

  return <div className={modalOverlay.overlay} onClick={onCloseModal} />;
};

export default ModalOverlay;
