import PropTypes from "prop-types";
import modalOverlay from "./modal-overlay.module.scss";

const ModalOverlay = ({ onCloseModal }) => {
  return <div className={modalOverlay.overlay} onClick={onCloseModal} />;
};

ModalOverlay.propTypes = {
  onClose: PropTypes.func,
};

export default ModalOverlay;
