import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { Link } from "react-router-dom";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useFormControls } from "../../hooks/useFormControls";

import "./NewAppointment.scss";

const inputFieldValues = [
  {
    name: "fullName",
    label: "ФИО*",
  },
  {
    name: "phone",
    label: "Телефон*",
  },
  {
    name: "email",
    label: "Email",
  },
];

export const disiases = ["Другое", "Артрит", "Пневмония", "Мигрень"];

const NewAppointment: React.FC = () => {
  const {
    handleInputValue,
    handleDateValue,
    handleFormSubmit,
    formIsValid,
    errors,
  } = useFormControls();
  const [date, setDate] = useState<Dayjs | null>(null);
  const [disease, setDisease] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason !== "clickaway") {
      setOpen(false);
    }
  };

  return (
    <Container className="container" maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <h2>Запись на приём</h2>
        <form className="new-appointment__form" onSubmit={handleFormSubmit}>
          {inputFieldValues.map((inputFieldValue, index) => {
            return (
              <TextField
                margin="dense"
                key={index}
                onBlur={handleInputValue}
                onChange={handleInputValue}
                name={inputFieldValue.name}
                label={inputFieldValue.label}
                autoComplete="none"
                {...(errors[inputFieldValue.name] && {
                  error: true,
                  helperText: errors[inputFieldValue.name],
                })}
              />
            );
          })}

          <div className="new-appointment__form--select">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Заболевание*
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={disease}
                name="disease"
                label="Заболевание*"
                onChange={(e) => {
                  setIsVisible(true);
                  setDisease(e.target.value);
                  handleInputValue(e);
                }}
              >
                {disiases.map((item, index) => (
                  <MenuItem key={index} value={index}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          {!disease && isVisible && (
            <TextField
              margin="dense"
              onBlur={handleInputValue}
              onChange={handleInputValue}
              name="description"
              label="Описание заболевания*"
              rows={5}
              autoComplete="none"
              multiline
              {...(errors["description"] && {
                error: true,
                helperText: errors["description"],
              })}
            />
          )}

          <Typography id="discrete-slider-small-steps" gutterBottom>
            Тяжесть заболевания*
          </Typography>
          <Slider
            className="new-appointment__form--date"
            defaultValue={1}
            onChange={handleInputValue}
            aria-labelledby="discrete-slider-small-steps"
            step={1}
            marks
            name="symptomas"
            min={1}
            max={10}
            valueLabelDisplay="auto"
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Дата приёма*"
              minDate={dayjs(new Date())}
              value={date}
              inputFormat="DD/MM/YYYY"
              onChange={(newValue: Dayjs | null) => {
                setDate(newValue);
                handleDateValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            ></DatePicker>
          </LocalizationProvider>

          <div className="new-appointment__buttons">
            <Link to="/">
              <Button className="new-appointment--button" variant="outlined">
                Назад
              </Button>
            </Link>
            <Button
              className="new-appointment--button"
              variant="contained"
              type="submit"
              disabled={!formIsValid()}
              onClick={() => setOpen(true)}
            >
              Записаться
            </Button>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                Ваша заявка была отправлена на рассмотрение.
              </Alert>
            </Snackbar>
          </div>
        </form>
      </Box>
    </Container>
  );
};

export default NewAppointment;
