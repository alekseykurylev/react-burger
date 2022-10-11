import { useState, useContext, useEffect } from "react";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructor from "./burger-constructor.module.scss";
import Modal from "../ui/modal/modal";
import OrderDetails from "../order-details/order-details";
import { BurgerContext } from "../app/app";
import { getOrder } from "../../utils/api";

const BurgerConstructor = () => {
  const [openModal, setOpenModal] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const { burger, setBurger } = useContext(BurgerContext);
  const [order, setOrder] = useState(null);

  const bun = burger.find((ingredient) => ingredient.type === "bun");

  const removeIngredient = (key) => {
    const noRemote = burger.filter((_, index) => index !== key);
    setBurger([...noRemote]);
  };

  const sendBurger = () => {
    setOrder(null);
    let id = { ingredients: [] };
    burger.forEach((ingredient) => {
      id = { ingredients: [...id.ingredients, ingredient._id] };
    });
    getOrder(id, setOrder);
    setOpenModal(true);
  };

  useEffect(() => {
    let total = 0;
    burger
      .filter((ingredient) => ingredient.type === "bun")
      .map((ingredient) => (total += ingredient.price * 2));
    burger
      .filter((ingredient) => ingredient.type !== "bun")
      .map((ingredient) => (total += ingredient.price));
    setTotalPrice(total);
  }, [burger]);

  return (
    <>
      <section className="pt-25">
        {burger.length > 0 ? (
          <>
            <div className={burgerConstructor.burger}>
              {bun && (
                <div className={burgerConstructor.bun}>
                  <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.image}
                  />
                </div>
              )}

              <ul className={burgerConstructor.dragList}>
                {burger
                  .filter((ingredient) => ingredient.type !== "bun")
                  .map((ingredient, index) => (
                    <li key={index} className={burgerConstructor.dragItem}>
                      <DragIcon type="primary" />
                      <ConstructorElement
                        key={ingredient._id}
                        text={ingredient.name}
                        price={ingredient.price}
                        thumbnail={ingredient.image}
                        handleClose={() => removeIngredient(index)}
                      />
                    </li>
                  ))}
              </ul>
              {bun && (
                <div className={burgerConstructor.bun}>
                  <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image}
                  />
                </div>
              )}
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
              >
                Оформить заказ
              </Button>
            </div>
          </>
        ) : (
          <div>Добавьте ингредиенты...</div>
        )}
      </section>

      {openModal && order && (
        <Modal onClose={() => setOpenModal(false)}>
          <OrderDetails order={order} />
        </Modal>
      )}
    </>
  );
};

export default BurgerConstructor;
