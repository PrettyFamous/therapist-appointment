import { useState } from "react";
import { useNavigate } from "react-router-dom";

export interface loginValues {
  login: string;
  password: string;
}

const initialFormValues: loginValues = {
  login: "",
  password: "",
};

export const useLoginControls = () => {
  const [values, setValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({} as any);
  const navigate = useNavigate();

  const validate: any = (fieldValues = values) => {
    let newErrors: any = { ...errors };

    if ("login" in fieldValues) {
      newErrors.login = fieldValues.login ? "" : "Это обязательное поле.";
      if (fieldValues.login)
        newErrors.login =
          /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.login) ||
          /\b[+]?[78][0-9]{10}\b/.test(fieldValues.login)
            ? ""
            : "Некорректный логин.";
    }

    if ("password" in fieldValues)
      newErrors.password = fieldValues.password ? "" : "Это обязательное поле.";

    setErrors({
      ...newErrors,
    });
  };

  const handleInputValue = (e: any) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    validate({ [name]: value });
  };

  const handleFormSubmit = async (e: any, fieldValues = values) => {
    e.preventDefault();
    if (formIsValid()) {
      // Здесь должен быть запрос к серверу для получения токена,
      // но т.к. полноценного сервера нет, просимулируем его получение
      if (
        fieldValues.login === "ak.abaz@yandex.ru" &&
        fieldValues.password === "admin"
      ) {
        localStorage.setItem(
          "token",
          "125hjfg215kj5hgk1j23hg52kjh5g1kj2h5gk1125jhg"
        );
        navigate("/admin-panel");
      } else {
        let newErrors: any = { ...errors };

        newErrors.login = "Неверный логин или пароль.";
        newErrors.password = "Неверный логин или пароль.";

        setErrors({
          ...newErrors,
        });
      }
    }
  };

  const formIsValid = (fieldValues = values) => {
    const isValid = fieldValues.login && fieldValues.password;

    Object.values(errors).every((x) => x === "");

    return isValid;
  };
  return {
    handleInputValue,
    handleFormSubmit,
    formIsValid,
    errors,
  };
};
