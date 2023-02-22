import axios from "axios";
import { formValues } from "../hooks/useFormControls";

export const postAppointment = (values: formValues) => {
  const { fullName, phone, email, symptomas, date } = values;
  const res = {
    fullName,
    phone,
    email,
    symptomas,
    date: date?.toString(),
    status: "NEW",
  };

  axios.post("https://63f5d8fa9daf59d1ad7c8bcb.mockapi.io/appointments", res);
};
