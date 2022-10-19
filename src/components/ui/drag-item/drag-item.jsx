import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./drag-item.module.scss";
import { useRef } from "react";
import { useDrop, useDrag } from "react-dnd";
import PropTypes from "prop-types";
import { ingredientPropTypes } from "../../../types/types";

const DragItem = ({ item, index, removeIngredient, moveElement }) => {
  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: "component",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
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
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
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
    item: () => ({ id: item.id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  if (item.type !== "bun") drag(drop(ref));
  const preventDefault = (e) => e.preventDefault();

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
        key={item.dragId}
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => removeIngredient(item.dragId)}
      />
    </li>
  );
};

DragItem.propTypes = {
  item: ingredientPropTypes.isRequired,
  index: PropTypes.number.isRequired,
  removeIngredient: PropTypes.func.isRequired,
  moveElement: PropTypes.func.isRequired,
};

export default DragItem;
