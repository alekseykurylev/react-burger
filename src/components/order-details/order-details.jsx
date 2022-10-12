import orderDetails from "./order-details.module.scss";
import check from "../../images/done.png";
import PropTypes from "prop-types";

const OrderDetails = ({ order }) => {
  return (
    <div className={orderDetails.body}>
      <h3 className={orderDetails.id}>{order.order.number}</h3>
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

OrderDetails.propTypes = {
  order: PropTypes.object,
};

export default OrderDetails;
