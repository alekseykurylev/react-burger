import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import close from "./close.module.scss";

const Close = ({ onClose, className }) => {
  return (
    <button
      onClick={onClose}
      className={`${close.button}${className ? ` ${className}` : ""}`}
      type="button"
    >
      <CloseIcon type="primary" />
    </button>
  );
};

export default Close;
