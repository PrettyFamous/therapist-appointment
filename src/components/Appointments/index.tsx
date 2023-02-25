import { Pagination } from "@mui/lab";
import { Alert, Snackbar } from "@mui/material";

import { useState, useEffect } from "react";
import { fetchedData, getAppointments } from "../../api";
import SearchIcon from "@mui/icons-material/Search";

import AppointmentCard from "../AppointmentCard";

import "./Appointments.scss";
import Loading from "../Loading";

interface IAppointments {
  isArchive: number;
}

const Appointments: React.FC<IAppointments> = ({ isArchive }) => {
  const [data, setData] = useState<fetchedData[]>([]);
  const [openApproved, setOpenApproved] = useState(false);
  const [openDeclined, setOpenDeclined] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    setIsLoading(true);
  };

  const handleCloseAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason !== "clickaway") {
      setOpenApproved(false);
      setOpenDeclined(false);
    }
  };

  const onChangeSearch = (event: any) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    getAppointments(isArchive, page, search).then((response) => {
      setData(response.data.items);
      setCount(Math.floor(response.data.count / 12) + 1);
      setIsLoading(false);
    });
  }, [page, search]);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <div className="appointments__search">
        <SearchIcon className="appointments__search--icon" />
        <input
          value={search}
          onChange={(e) => onChangeSearch(e)}
          className="appointments__search--input"
          placeholder="Поиск…"
        />
      </div>
      <div className="appointments__wrapper">
        {data.map((item: fetchedData) => (
          <AppointmentCard
            {...{ ...item, setOpenApproved, setOpenDeclined }}
            key={item.id}
          />
        ))}
      </div>

      {!data.length ? (
        <h2>Ничего не найдено</h2>
      ) : (
        <>
          <Snackbar
            open={openApproved}
            autoHideDuration={3000}
            onClose={handleCloseAlert}
          >
            <Alert
              onClose={handleCloseAlert}
              severity="success"
              sx={{ width: "100%" }}
            >
              Запись подтверждена!
            </Alert>
          </Snackbar>
          <Snackbar
            open={openDeclined}
            autoHideDuration={3000}
            onClose={handleCloseAlert}
          >
            <Alert
              onClose={handleCloseAlert}
              severity="error"
              sx={{ width: "100%" }}
            >
              Запись отклонена!
            </Alert>
          </Snackbar>
          <Pagination
            className="appointments__pagination"
            count={count}
            page={page}
            onChange={handleChangePage}
            color="primary"
            size="large"
          />
        </>
      )}
    </>
  );
};

export default Appointments;
