import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructor from "./burger-constructor.module.scss";

const BurgerConstructor = ({ data }) => {
  return (
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
              <li className={burgerConstructor.dragItem}>
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
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
