import styles from "./login.module.scss";
import { ChangeEvent, FormEvent, useEffect } from "react";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useCallback } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { loginUser } from "../../../redux/syncs/auth/auth";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectUser } from "../../../redux/slices/user";

const Login = () => {
  const { isLoading, isLoggedIn } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [form, setValue] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(loginUser({ email: form.email, password: form.password }));
      navigate("/");
    },
    [dispatch, form, navigate]
  );

  return (
    <section className={styles.section}>
      <h1 className="text text_type_main-medium mb-6">Вход</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <EmailInput
          onChange={onChange}
          value={form.email}
          name={"email"}
          placeholder={"E-mail"}
          required
        />
        <PasswordInput
          onChange={onChange}
          value={form.password}
          name={"password"}
          placeholder={"Пароль"}
          required
        />
        <Button htmlType="submit" type="primary" size="medium">
          {isLoading ? "Заходим..." : "Войти"}
          {/* {isLoading ? "Заходим..." : "Войти"} */}
        </Button>
        {/* {error && "status" in error && error.status === 401 && (
          <p className="text text_type_main-small">
            Адрес электронной почты или пароль неверны
          </p>
        )} */}
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
