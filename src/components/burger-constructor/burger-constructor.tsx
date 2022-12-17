import { useCallback, useEffect, useState } from "react";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructor from "./burger-constructor.module.scss";
import Modal from "../ui/modal/modal";
import OrderDetails from "../ui/order-details/order-details";
import { useDrop } from "react-dnd";
import { postOrder } from "../../redux/syncs/orders/orders";
import DragItem from "../ui/drag-item/drag-item";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectBurger } from "../../redux/slices/burger";
import { selectUser } from "../../redux/slices/user";
import { selectOrder } from "../../redux/slices/order";
import {
  addBun,
  addFilling,
  removeFilling,
  updateFilling,
  clearBurger,
} from "../../redux/slices/burger";
import { clearOrder } from "../../redux/slices/order";
import { IIngredient } from "../../api/rest/ingredients/type";

const BurgerConstructor = () => {
  const { isLoggedIn } = useAppSelector(selectUser);
  const { newOrder, orderRequest } = useAppSelector(selectOrder);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { bun, filling } = useAppSelector(selectBurger);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const totalFilling = filling.reduce((total, item) => {
      return total + item.price;
    }, 0);

    setTotalPrice(bun ? bun.price * 2 + totalFilling : totalFilling);
  }, [bun, filling]);

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item: IIngredient) {
      if (item.type === "bun") {
        dispatch(addBun(item));
      } else {
        dispatch(addFilling(item));
      }
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const removeIngredient = (dragId: string) => {
    dispatch(removeFilling(dragId));
  };

  const sendBurger = () => {
    if (!isLoggedIn) {
      return navigate("/login");
    }

    if (bun && filling.length > 0) {
      const id = { ingredients: [bun._id] };
      filling.forEach((item: IIngredient) => {
        id.ingredients.push(item._id);
      });

      dispatch(postOrder(id));
    }
  };

  const closeModal = () => {
    dispatch(clearBurger());
    dispatch(clearOrder());
  };

  const moveElement = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = filling[dragIndex];
      const newCards = [...filling];
      newCards.splice(dragIndex, 1);
      newCards.splice(hoverIndex, 0, dragCard);
      dispatch(updateFilling(newCards));
    },
    [filling, dispatch]
  );

  return (
    <>
      <section className="pt-25" ref={dropTarget} data-testid="dropTarget">
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
                {filling.map((item: IIngredient, index: number) => (
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
                disabled={!bun || !filling ? true : false}
                data-testid="btn-send-burger"
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

      {newOrder && (
        <Modal onClose={closeModal} className="order">
          <OrderDetails order={newOrder} />
        </Modal>
      )}
    </>
  );
};

export default BurgerConstructor;
