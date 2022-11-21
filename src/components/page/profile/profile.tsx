import styles from "./profile.module.scss";
import { ChangeEvent, FormEvent } from "react";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, useState } from "react";
import { updateUser } from "../../../redux/thunkActions/auth/auth";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import selectAuth from "../../../redux/selectors/auth";
import { TICons } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";

interface IForm {
  [key: string]: {
    value: string;
    disabled: boolean;
    icon: keyof TICons;
  };
}

const Profile = () => {
  const { emailAuth, nameAuth, loadingAuth } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const [dirty, setDirty] = useState(false);

  const [form, setValue] = useState<IForm>({
    name: {
      value: nameAuth ? nameAuth : "",
      disabled: true,
      icon: "EditIcon",
    },
    email: {
      value: emailAuth ? emailAuth : "",
      disabled: true,
      icon: "EditIcon",
    },
    password: {
      value: "",
      disabled: true,
      icon: "EditIcon",
    },
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...form,
      [e.target.name]: { ...form[e.target.name], value: e.target.value },
    });
    setDirty(true);
  };

  const handleResetForm = useCallback(() => {
    setValue({
      name: {
        value: nameAuth ? nameAuth : "",
        disabled: true,
        icon: "EditIcon",
      },
      email: {
        value: emailAuth ? emailAuth : "",
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
    (name: string) => {
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
    (e: FormEvent<HTMLFormElement>) => {
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
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
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
          <Button type="primary" size="medium" htmlType="submit">
            {loadingAuth ? "Сохраняем..." : "Сохранить"}
          </Button>
        </div>
      )}
    </form>
  );
};

export default Profile;
