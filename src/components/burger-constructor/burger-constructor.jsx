import { useCallback } from "react";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructor from "./burger-constructor.module.scss";
import Modal from "../ui/modal/modal";
import OrderDetails from "../ui/order-details/order-details";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import { burgerSlice } from "../../services/slices/burger";
import { getOrder } from "../../services/thunkActions/orders";
import { orderSlice } from "../../services/slices/order";
import DragItem from "../ui/drag-item/drag-item";
import { useNavigate } from "react-router-dom";

const BurgerConstructor = () => {
  const navigate = useNavigate();
  const { bun, filling } = useSelector((store) => store.burger);
  const { isLoggedIn } = useSelector((store) => store.auth);
  const { order, orderRequest } = useSelector((store) => store.order);
  const {
    addBun,
    addFilling,
    removeFilling,
    countTotalPrice,
    updateFilling,
    clearBurger,
  } = burgerSlice.actions;
  const { clearOrder } = orderSlice.actions;
  const { totalPrice } = useSelector((store) => store.burger);
  const dispatch = useDispatch();

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      if (item.type === "bun") {
        dispatch(addBun(item));
      } else {
        dispatch(addFilling(item));
      }
      dispatch(countTotalPrice());
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const removeIngredient = (dragId) => {
    dispatch(removeFilling(dragId));
    dispatch(countTotalPrice());
  };

  const sendBurger = () => {
    if (!isLoggedIn) {
      return navigate("/login");
    }
    const id = { ingredients: [bun._id] };
    filling.forEach((item) => {
      id.ingredients.push(item._id);
    });

    dispatch(getOrder(id));
  };

  const closeModal = () => {
    dispatch(clearBurger());
    dispatch(clearOrder());
  };

  const moveElement = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = filling[dragIndex];
      const newCards = [...filling];
      newCards.splice(dragIndex, 1);
      newCards.splice(hoverIndex, 0, dragCard);
      dispatch(updateFilling(newCards));
    },
    [filling, dispatch, updateFilling]
  );

  return (
    <>
      <section className="pt-25" ref={dropTarget}>
        {bun || filling.length > 0 ? (
          <>
            <div className={burgerConstructor.burger}>
              <div className={burgerConstructor.bun}>
                {bun && (
                  <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.image}
                  />
                )}
              </div>
              <ul className={burgerConstructor.dragList}>
                {filling.map((item, index) => (
                  <DragItem
                    key={item.dragId}
                    item={item}
                    index={index}
                    removeIngredient={removeIngredient}
                    moveElement={moveElement}
                  />
                ))}
              </ul>
              <div className={burgerConstructor.bun}>
                {bun && (
                  <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image}
                  />
                )}
              </div>
            </div>

            <div className={burgerConstructor.total}>
              <p className="text text_type_digits-medium">
                {totalPrice} <CurrencyIcon type="primary" />
              </p>
              <Button
                type="primary"
                size="large"
                htmlType="button"
                onClick={sendBurger}
                disabled={!bun || filling.length <= 0 ? true : false}
              >
                {orderRequest ? "Оформляем..." : "Оформить заказ"}
              </Button>
            </div>
          </>
        ) : (
          <div className={burgerConstructor.emptyDrop}>
            <p
              className={`text text_type_main-medium ${
                !isHover && `text_color_inactive`
              }`}
            >
              Переместите сюда
              <br /> ингредиенты
            </p>
          </div>
        )}
      </section>

      {order && (
        <Modal onClose={closeModal} className="order">
          <OrderDetails order={order} />
        </Modal>
      )}
    </>
  );
};

export default BurgerConstructor;
