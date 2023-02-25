import axios from "axios";
import { formValues } from "../hooks/useFormControls";

const mainURL = "https://63f5d8fa9daf59d1ad7c8bcb.mockapi.io/";

export interface fetchedData {
  id: number;
  fullName: string;
  phone: string;
  email: string;
  symptomas: number;
  date: string;
  description: string;
  disease: string;
  status: string;
  isAccepted?: boolean;
}

export const postAppointment = (values: formValues) => {
  const { fullName, phone, email, symptomas, date, description, disease } =
    values;
  const res = {
    fullName,
    phone,
    email,
    symptomas,
    date: date?.toString(),
    description: disease == "0" ? description : "",
    disease,
    status: "NEW",
    createdAt: new Date(),
  };

  axios.post(mainURL + "appointments", res);
};

export const getAppointments = async (
  isArchive: number,
  page: number,
  search: string
) => {
  const status = isArchive === 1 ? "ARCHIVE" : "NEW";

  return await axios.get(
    mainURL +
      `appointments?&status=${status}&fullName=${search}&sortBy=createdAt&order=desc&page=${page}&limit=12`
  );
};

export const putAppointment = (appointment: fetchedData) => {
  axios.put(mainURL + "appointments/" + appointment.id, appointment);
};
