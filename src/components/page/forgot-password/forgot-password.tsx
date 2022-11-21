import { ChangeEvent, FormEvent } from 'react';
import styles from "./forgot-password.module.scss";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useCallback } from "react";
import { Link, Navigate } from "react-router-dom";
import { checkEmail } from "../../../redux/thunkActions/password-reset/password-reset";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import selectPasswordReset from "../../../redux/selectors/password-reset";

const ForgotPassword = () => {
  const { successEmail, requestPasswordReset } =
    useAppSelector(selectPasswordReset);
  const dispatch = useAppDispatch();
  const [emailValue, setEmailValue] = useState("");
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(checkEmail({ email: emailValue }));
    },
    [dispatch, emailValue]
  );

  if (successEmail) {
    return <Navigate to="/reset-password" replace={true} />;
  }

  return (
    <section className={styles.section}>
      <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
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
