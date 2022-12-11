import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./drag-item.module.scss";
import { MouseEvent, useRef } from "react";
import { useDrop, useDrag, XYCoord, DropTargetMonitor } from "react-dnd";
import { IIngredient } from "../../../api/rest/ingredients/type";

interface IProps {
  item: IIngredient;
  index: number;
  removeIngredient: (d: string) => any;
  moveElement: (d: number, h: number) => any;
}

const DragItem = ({ item, index, removeIngredient, moveElement }: IProps) => {
  const ref = useRef<HTMLLIElement>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: "component",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: any, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveElement(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "component",
    item: () => ({ id: item._id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  if (item.type !== "bun") drag(drop(ref));
  const preventDefault = (e: MouseEvent) => e.preventDefault();

  return (
    <li
      className={styles.dragItem}
      ref={ref}
      onDrop={preventDefault}
      data-handler-id={handlerId}
      style={{ opacity }}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => removeIngredient(item.dragId)}
      />
    </li>
  );
};

export default DragItem;
