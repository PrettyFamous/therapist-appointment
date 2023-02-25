import { useState } from "react";
import { Dayjs } from "dayjs";
import { postAppointment } from "../api";

export interface formValues {
  fullName: string;
  phone: string;
  email: string;
  date: Dayjs | null;
  symptomas: number;
  formSubmitted: boolean;
  success: boolean;
  description: string;
  disease: string;
}

const initialFormValues: formValues = {
  fullName: "",
  phone: "",
  email: "",
  date: null,
  symptomas: 1,
  formSubmitted: false,
  success: false,
  description: "",
  disease: "",
};

export const useFormControls = () => {
  const [values, setValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({} as any);

  const validate: any = (fieldValues = values) => {
    let newErrors: any = { ...errors };

    if ("fullName" in fieldValues)
      newErrors.fullName = fieldValues.fullName ? "" : "Это обязательное поле.";

    if ("phone" in fieldValues) {
      newErrors.phone = fieldValues.phone ? "" : "Это обязательное поле.";
      if (fieldValues.phone)
        newErrors.phone = /\b[+]?[78][0-9]{10}\b/.test(fieldValues.phone)
          ? ""
          : "Некорректный номер телефона.";
    }

    if ("email" in fieldValues) {
      if (fieldValues.email)
        newErrors.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email)
          ? ""
          : "Некорректный email.";
    }

    if ("date" in fieldValues)
      newErrors.date = fieldValues.date ? "" : "Это обязательное поле.";

    if ("description" in fieldValues)
      newErrors.description = fieldValues.description
        ? ""
        : "Это обязательное поле.";

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
    }
  };

  const formIsValid = (fieldValues = values) => {
    const isValid =
      fieldValues.fullName &&
      fieldValues.phone &&
      fieldValues.date &&
      (fieldValues.description || fieldValues.disease != "0");
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
