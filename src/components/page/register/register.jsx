import styles from "./register.module.scss";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useCallback } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../../services/thunkActions/auth";

const Register = () => {
  const dispatch = useDispatch();
  const [form, setValue] = useState({ name: "", email: "", password: "" });
  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const { loadingAuth, errorAuth, isLoggedIn } = useSelector(
    (store) => store.auth
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(
        register({
          email: form.email,
          name: form.name,
          password: form.password,
        })
      );
    },
    [dispatch, form]
  );

  if (isLoggedIn) {
    <Navigate to="/" replace={true} />;
  }

  return (
    <section className={styles.section}>
      <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
      {errorAuth === "User already exists" && (
        <div className="text text_type_main-default mb-4">
          Email: {form.email} уже зарегистрирован в системе.
        </div>
      )}
      <form className={styles.form}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onChange}
          value={form.name}
          name={"name"}
          required
        />
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
          required
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          onClick={handleSubmit}
        >
          {loadingAuth ? "Регистрация..." : "Зарегистрироваться"}
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">
        Уже зарегистрированы? <Link to="/login">Войти</Link>
      </p>
    </section>
  );
};

export default Register;
