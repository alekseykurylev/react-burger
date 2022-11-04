import styles from "./login.module.scss";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useCallback } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../services/thunkActions/auth";

const Login = () => {
  const dispatch = useDispatch();
  const [form, setValue] = useState({ email: "", password: "" });
  const { loadingAuth, isLoggedIn } = useSelector((store) => store.auth);

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

  return isLoggedIn ? (
    <Navigate to="/" replace={true} />
  ) : (
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
