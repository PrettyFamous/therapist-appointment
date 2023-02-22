import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { postAppointment } from "../api";

export interface formValues {
  fullName: string;
  phone: string;
  email: string;
  date: Dayjs | null;
  symptomas: number;
  formSubmitted: boolean;
  success: boolean;
}

const initialFormValues: formValues = {
  fullName: "",
  phone: "",
  email: "",
  date: null,
  symptomas: 1,
  formSubmitted: false,
  success: false,
};

export const useFormControls = () => {
  const [values, setValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({} as any);

  const validate: any = (fieldValues = values) => {
    let temp: any = { ...errors };

    if ("fullName" in fieldValues)
      temp.fullName = fieldValues.fullName ? "" : "Это обязательное поле.";

    if ("phone" in fieldValues) {
      temp.phone = fieldValues.phone ? "" : "Это обязательное поле.";
      if (fieldValues.phone)
        temp.phone = /[78]+[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/.test(
          fieldValues.phone
        )
          ? ""
          : "Некорректный номер телефона.";
    }

    if ("email" in fieldValues) {
      if (fieldValues.email)
        temp.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email)
          ? ""
          : "Некорректный email.";
    }

    if ("date" in fieldValues)
      temp.date = fieldValues.date ? "" : "Это обязательное поле.";

    setErrors({
      ...temp,
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

  const handleDateValue = (newDate: Dayjs | null) => {
    setValues({
      ...values,
      ["date"]: newDate,
    });
    validate({ ["date"]: newDate });
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    if (formIsValid()) {
      await postAppointment(values);
      alert("Заявка успешно отправлена на рассмотрение!");
    }
  };

  const formIsValid = (fieldValues = values) => {
    const isValid =
      fieldValues.fullName && fieldValues.phone && fieldValues.date;
    Object.values(errors).every((x) => x === "");

    return isValid;
  };
  return {
    handleInputValue,
    handleFormSubmit,
    handleDateValue,
    formIsValid,
    errors,
  };
};
