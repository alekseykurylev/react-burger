import styles from "./register.module.scss";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { register } from "../../../redux/thunkActions/auth";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import selectAuth from "../../../redux/selectors/auth";

const Register = () => {
  const { loadingAuth, errorAuth } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const [form, setValue] = useState({ name: "", email: "", password: "" });
  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

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
