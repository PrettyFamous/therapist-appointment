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
  };

  axios.post(mainURL + "appointments", res);
};

export const getNewAppointments = async () => {
  return await axios.get<fetchedData[]>(mainURL + "appointments?status=NEW");
};

export const getArchiveAppointments = async () => {
  return await axios.get<fetchedData[]>(
    mainURL + "appointments?status=ARCHIVE"
  );
};

export const putAppointment = (appointment: fetchedData) => {
  axios.put(mainURL + "appointments/" + appointment.id, appointment);
};
