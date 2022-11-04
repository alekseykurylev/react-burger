import styles from "./forgot-password.module.scss";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useCallback } from "react";
import { Link, Navigate } from "react-router-dom";
import { checkEmail } from "../../../services/thunkActions/password-reset";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((store) => store.auth);
  const [emailValue, setEmailValue] = useState("");
  const onChange = (e) => {
    setEmailValue(e.target.value);
  };
  const { successEmail, requestPasswordReset } = useSelector(
    (store) => store.passwordReset
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(checkEmail({ email: emailValue }));
    },
    [dispatch, emailValue]
  );

  if (isLoggedIn) {
    return <Navigate to="/" replace={true} />;
  }

  if (successEmail) {
    return <Navigate to="/reset-password" replace={true} />;
  }

  return (
    <section className={styles.section}>
      <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>

      <form className={styles.form}>
        <EmailInput
          onChange={onChange}
          value={emailValue}
          name={"email"}
          placeholder={"Укажите e-mail"}
          required
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          onClick={handleSubmit}
        >
          {requestPasswordReset ? "Проверяем..." : "Восстановить"}
        </Button>
      </form>

      <p className="text text_type_main-default text_color_inactive">
        Вспомнили пароль? <Link to="/login">Войти</Link>
      </p>
    </section>
  );
};

export default ForgotPassword;
