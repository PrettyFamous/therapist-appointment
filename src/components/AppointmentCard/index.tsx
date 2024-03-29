import { Alert, Button, Snackbar } from "@mui/material";
import { fetchedData, putAppointment } from "../../api";
import { disiases } from "../../pages/NewAppointment";
import { useState } from "react";

import "./AppointmentCard.scss";

interface IAppointmentCardProps extends fetchedData {
  setOpenApproved: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDeclined: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppointmentCard: React.FC<IAppointmentCardProps> = (props) => {
  const {
    id,
    fullName,
    phone,
    email,
    disease,
    description,
    symptomas,
    date,
    isAccepted,
    setOpenApproved,
    setOpenDeclined,
  } = props;
  const [isVisible, setIsVisible] = useState(true);

  const handleAccept = () => {
    setOpenApproved(true);
    setIsVisible(false);
    const data = {
      id,
      fullName,
      phone,
      email,
      disease,
      description,
      symptomas,
      date,
      status: "ARCHIVE",
      isAccepted: true,
    };
    putAppointment(data);
  };

  const handleDecline = () => {
    setOpenDeclined(true);
    setIsVisible(false);
    const data = {
      id,
      fullName,
      phone,
      email,
      disease,
      description,
      symptomas,
      date,
      status: "ARCHIVE",
      isAccepted: false,
    };
    putAppointment(data);
  };

  return isVisible ? (
    <div className="appointment-card">
      <p>
        <b>ФИО:</b> {fullName}
      </p>
      <p>
        <b>Телефон:</b> {phone}
      </p>
      <p>
        <b>Email:</b> {email}
      </p>
      <p>
        <b>Болезнь: </b>
        {disease != "0" ? disiases[Number(disease)] : description}
      </p>
      <p>
        <b>Степень тяжести:</b> {symptomas}
      </p>
      <p>
        <b>Дата записи:</b> {date.substring(0, 16)}
      </p>
      <div className="appointment-card__buttons">
        {isAccepted === undefined ? (
          <>
            <Button
              className="appointment-card--button"
              variant="contained"
              color="error"
              onClick={handleDecline}
            >
              Отклонить
            </Button>
            <Button
              className="appointment-card--button"
              variant="contained"
              color="success"
              onClick={handleAccept}
            >
              Подтвердить
            </Button>
          </>
        ) : isAccepted ? (
          <p className="appointment-card-approved">Подтверждено</p>
        ) : (
          <p className="appointment-card-declined">Отклонено</p>
        )}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default AppointmentCard;
