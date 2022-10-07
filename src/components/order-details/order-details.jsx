import orderDetails from "./order-details.module.scss";
import check from "../../images/done.png";

const OrderDetails = () => {
  return (
    <div className={orderDetails.body}>
      <h3 className={orderDetails.id}>034536</h3>
      <p className={orderDetails.label}>идентификатор заказа</p>
      <img
        className={orderDetails.img}
        src={check}
        alt="Заказ готовится"
        width="120"
        height="120"
      />
      <p className={orderDetails.textWhite}>Ваш заказ начали готовить</p>
      <p className={orderDetails.textGray}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
