import { useState } from "react";
import PropTypes from "prop-types";
import { ingredientPropTypes } from "../../types/types";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructor from "./burger-constructor.module.scss";
import Modal from "../ui/modal/modal";
import OrderDetails from "../order-details/order-details";

const BurgerConstructor = ({ data }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <section className="pt-25">
        <div className={burgerConstructor.burger}>
          <div className={burgerConstructor.bun}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text="Краторная булка N-200i (верх)"
              price={200}
              thumbnail={"https://code.s3.yandex.net/react/code/bun-01.png"}
            />
          </div>
          <ul className={burgerConstructor.dragList}>
            {data
              .filter((ingredient) => ingredient.type !== "bun")
              .map((ingredient) => (
                <li key={ingredient._id} className={burgerConstructor.dragItem}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    key={ingredient._id}
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image}
                  />
                </li>
              ))}
          </ul>
          <div className={burgerConstructor.bun}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text="Краторная булка N-200i (верх)"
              price={200}
              thumbnail={"https://code.s3.yandex.net/react/code/bun-01.png"}
            />
          </div>
        </div>
        <div className={burgerConstructor.total}>
          <p className="text text_type_digits-medium">
            610 <CurrencyIcon type="primary" />
          </p>
          <Button
            type="primary"
            size="large"
            htmlType="button"
            onClick={() => setOpenModal(true)}
          >
            Оформить заказ
          </Button>
        </div>
      </section>

      {openModal && (
        <Modal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          overlay="true"
        >
          <OrderDetails />
        </Modal>
      )}
    </>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropTypes).isRequired,
};

export default BurgerConstructor;
