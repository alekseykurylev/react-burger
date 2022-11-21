import styles from "./reset-password.module.scss";
import { ChangeEvent, FormEvent } from 'react';
import {
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useCallback } from "react";
import { Link, Navigate } from "react-router-dom";
import { resetPassword } from "../../../redux/thunkActions/password-reset/password-reset";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import selectPasswordReset from "../../../redux/selectors/password-reset";

const ResetPassword = () => {
  const { successEmail, successPassword, requestPasswordReset } =
    useAppSelector(selectPasswordReset);
  const dispatch = useAppDispatch();
  const [form, setValue] = useState({ password: "", token: "" });
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(resetPassword({ password: form.password, token: form.token }));
    },
    [dispatch, form]
  );

  if (successPassword) {
    return <Navigate to="/login" replace={true} />;
  }

  if (!successEmail) {
    return <Navigate to="/forgot-password" replace={true} />;
  }

  return (
    <section className={styles.section}>
      <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <PasswordInput
          placeholder={"Пароль"}
          onChange={onChange}
          value={form.password}
          name={"password"}
          required
        />
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={onChange}
          value={form.token}
          name={"token"}
          required
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
        >
          {requestPasswordReset ? "Сохраняем..." : "Сохранить"}
        </Button>
      </form>

      <p className="text text_type_main-default text_color_inactive">
        Вспомнили пароль? <Link to="/login">Войти</Link>
      </p>
    </section>
  );
};

export default ResetPassword;
