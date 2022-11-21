import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { MouseEvent } from "react";
import close from "./close.module.scss";

interface IProps {
  onClose: () => MouseEvent<HTMLElement>;
  className: string;
}

const Close = ({ onClose, className }: IProps) => {
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
