import styles from "./reset-password.module.scss";
import {
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useCallback } from "react";
import { Link, Navigate } from "react-router-dom";
import { resetPassword } from "../../../services/thunkActions/password-reset";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const [form, setValue] = useState({ password: "", token: "" });
  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const { successEmail, successPassword, requestPasswordReset } = useSelector(
    (store) => store.passwordReset
  );

  const handleSubmit = useCallback(
    (e) => {
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

      <form className={styles.form}>
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
          onClick={handleSubmit}
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
