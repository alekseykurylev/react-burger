import styles from "./login.module.scss";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useCallback } from "react";
import { Link, Navigate } from "react-router-dom";
import { login } from "../../../redux/thunkActions/auth";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import selectAuth from "../../../redux/selectors/auth";

const Login = () => {
  const { loadingAuth, isLoggedIn } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const [form, setValue] = useState({ email: "", password: "" });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  let handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(login({ email: form.email, password: form.password }));
    },
    [dispatch, form]
  );

  if (isLoggedIn) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <section className={styles.section}>
      <h1 className="text text_type_main-medium mb-6">Вход</h1>
      <form className={styles.form}>
        <EmailInput
          onChange={onChange}
          value={form.email}
          name={"email"}
          placeholder={"E-mail"}
          errorText="errorText"
          required
        />
        <PasswordInput
          onChange={onChange}
          value={form.password}
          name={"password"}
          placeholder={"Пароль"}
          errorText="errorText"
          required
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          onClick={handleSubmit}
        >
          {loadingAuth ? "Заходим..." : "Войти"}
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">
        Вы — новый пользователь? <Link to="/register">Зарегистрироваться</Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link>
      </p>
    </section>
  );
};

export default Login;
