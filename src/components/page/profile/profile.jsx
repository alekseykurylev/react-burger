import styles from "./profile.module.scss";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../services/thunkActions/auth";

const Profile = () => {
  const dispatch = useDispatch();
  const [dirty, setDirty] = useState(false);
  const refInputName = useRef();
  const { emailAuth, nameAuth, loadingAuth, isLoggedIn } = useSelector(
    (store) => store.auth
  );

  const [form, setValue] = useState({
    name: {
      value: nameAuth,
      disabled: true,
      icon: "EditIcon",
    },
    email: {
      value: emailAuth,
      disabled: true,
      icon: "EditIcon",
    },
    password: {
      value: "",
      disabled: true,
      icon: "EditIcon",
    },
  });

  const onChange = (e) => {
    setValue({
      ...form,
      [e.target.name]: { ...form[e.target.name], value: e.target.value },
    });
    setDirty(true);
  };

  const handleResetForm = useCallback(() => {
    setValue({
      name: {
        value: nameAuth,
        disabled: true,
        icon: "EditIcon",
      },
      email: {
        value: emailAuth,
        disabled: true,
        icon: "EditIcon",
      },
      password: {
        value: "",
        disabled: true,
        icon: "EditIcon",
      },
    });
    setDirty(false);
  }, [nameAuth, emailAuth]);

  const handleIconClick = useCallback(
    (name) => {
      setValue({
        ...form,
        [name]: {
          ...form[name],
          disabled: !form[name].disabled,
          icon: form[name].disabled ? "CloseIcon" : "EditIcon",
        },
      });
    },
    [form]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(
        updateUser({
          email: form.email.value,
          password: form.password.value,
          name: form.name.value,
        })
      );
      setDirty(false);
    },
    [dispatch, form]
  );

  return (
    <form className={styles.form}>
      <Input
        ref={refInputName}
        type={"text"}
        placeholder={"Имя"}
        icon={form.name.icon}
        onChange={onChange}
        value={form.name.value}
        name={"name"}
        onIconClick={() => handleIconClick("name")}
        disabled={form.name.disabled}
      />
      <Input
        type={"email"}
        placeholder={"E-mail"}
        icon={form.email.icon}
        onChange={onChange}
        value={form.email.value}
        name={"email"}
        onIconClick={() => handleIconClick("email")}
        disabled={form.email.disabled}
      />
      <Input
        type={"password"}
        placeholder={"Пароль"}
        icon={form.password.icon}
        onChange={onChange}
        value={form.password.value}
        name={"password"}
        onIconClick={() => handleIconClick("password")}
        disabled={form.password.disabled}
      />
      {dirty && (
        <div className={styles.form__buttons}>
          <Button
            type="secondary"
            size="medium"
            htmlType="button"
            onClick={handleResetForm}
          >
            Отмена
          </Button>
          <Button
            type="primary"
            size="medium"
            htmlType="submit"
            onClick={handleSubmit}
          >
            {loadingAuth ? "Сохраняем..." : "Сохранить"}
          </Button>
        </div>
      )}
    </form>
  );
};

export default Profile;
