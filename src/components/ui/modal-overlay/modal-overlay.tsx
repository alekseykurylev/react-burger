import modalOverlay from "./modal-overlay.module.scss";

interface IProps {
  onCloseModal: () => any
}

const ModalOverlay = ({ onCloseModal }: IProps) => {
  return <div className={modalOverlay.overlay} onClick={onCloseModal} />;
};



export default ModalOverlay;
