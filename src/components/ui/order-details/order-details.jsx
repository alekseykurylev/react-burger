import styles from "./order-details.module.scss";
import check from "../../../images/done.png";
import PropTypes from "prop-types";

const OrderDetails = ({ order }) => {
  return (
    <section className={styles.section}>
      <h3 className={styles.id}>{order.order.number}</h3>
      <p className={styles.label}>идентификатор заказа</p>
      <img
        className={styles.img}
        src={check}
        alt="Заказ готовится"
        width="120"
        height="120"
      />
      <p className={styles.textWhite}>Ваш заказ начали готовить</p>
      <p className={styles.textGray}>
        Дождитесь готовности на орбитальной станции
      </p>
    </section>
  );
};

OrderDetails.propTypes = {
  order: PropTypes.object,
};

export default OrderDetails;
