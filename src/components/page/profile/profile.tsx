import styles from "./profile.module.scss";
import { ChangeEvent, FormEvent } from "react";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, useState } from "react";
import { updateUser } from "../../../redux/syncs/auth/auth";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectUser } from "../../../redux/slices/user";
import { TICons } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import NavbarProfile from "../../ui/navbar-profile/navbar-profile";

interface IForm {
  [key: string]: {
    value: string;
    disabled: boolean;
    icon: keyof TICons;
  };
}

const Profile = () => {
  const { email, name, isLoading } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [dirty, setDirty] = useState(false);

  const [form, setValue] = useState<IForm>({
    name: {
      value: name ? name : "",
      disabled: true,
      icon: "EditIcon",
    },
    email: {
      value: email ? email : "",
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
        value: name ? name : "",
        disabled: true,
        icon: "EditIcon",
      },
      email: {
        value: email ? email : "",
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
  }, [name, email]);

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
    <div className={styles.grid}>
      <aside>
        <NavbarProfile />
        <p className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете
          <br /> изменить свои персональные данные
        </p>
      </aside>
      <div>
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
                {isLoading ? "Сохраняем..." : "Сохранить"}
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;
