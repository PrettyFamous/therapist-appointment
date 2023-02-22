import { useState, useEffect } from "react";
import { fetchedData, getArchiveAppointments } from "../../api";

import AppointmentCard from "../AppointmentCard";

const ArchiveAppointments = () => {
  const [data, setData] = useState<fetchedData[]>([]);

  useEffect(() => {
    getArchiveAppointments().then((response) => setData(response.data));
  }, []);

  return (
    <div className="admin-panel__wrapper">
      {data.map((item: fetchedData) => (
        <AppointmentCard key={item.id} {...item} />
      ))}
    </div>
  );
};

export default ArchiveAppointments;
