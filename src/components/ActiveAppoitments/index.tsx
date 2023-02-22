import { useState, useEffect } from "react";
import { fetchedData, getNewAppointments } from "../../api";

import AppointmentCard from "../AppointmentCard";

const ActiveAppointments = () => {
  const [data, setData] = useState<fetchedData[]>([]);

  useEffect(() => {
    getNewAppointments().then((response) => setData(response.data));
  }, []);

  return (
    <div className="admin-panel__wrapper">
      {data.map((item: fetchedData) => (
        <AppointmentCard key={item.id} {...item} />
      ))}
    </div>
  );
};

export default ActiveAppointments;
