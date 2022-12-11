import styles from "./register.module.scss";
import { ChangeEvent, FormEvent } from "react";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../../../redux/syncs/auth/auth";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectUser } from "../../../redux/slices/user";

const Register = () => {
  const { isLoading, error } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [form, setValue] = useState({ name: "", email: "", password: "" });
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(
        registerUser({
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
      {error === "User already exists" && (
        <div className="text text_type_main-default mb-4">
          Email: {form.email} уже зарегистрирован в системе.
        </div>
      )}
      <form className={styles.form} onSubmit={handleSubmit}>
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
        <Button htmlType="submit" type="primary" size="medium">
          {isLoading ? "Регистрация..." : "Зарегистрироваться"}
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">
        Уже зарегистрированы? <Link to="/login">Войти</Link>
      </p>
    </section>
  );
};

export default Register;
