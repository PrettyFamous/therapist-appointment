import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import "./NewAppointment.scss";
import { useFormControls } from "../../hooks/useFormControls";

const inputFieldValues = [
  {
    name: "fullName",
    label: "ФИО*",
    id: "my-name",
  },
  {
    name: "phone",
    label: "Телефон*",
    id: "my-phone",
  },
  {
    name: "email",
    label: "Email",
    id: "my-email",
  },
];

const NewAppointment: React.FC = () => {
  const {
    handleInputValue,
    handleDateValue,
    handleFormSubmit,
    formIsValid,
    errors,
  } = useFormControls();
  const [date, setDate] = useState<Dayjs | null>(null);
  const [age, setAge] = useState("");

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
              <InputLabel id="demo-simple-select-label">Заболевание</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Заболевание*"
                onChange={(e) => {
                  setAge(e.target.value);
                  handleInputValue(e);
                }}
              >
                <MenuItem value={1}>Артрит</MenuItem>
                <MenuItem value={2}>Пневмония</MenuItem>
                <MenuItem value={3}>Мигрень</MenuItem>
                <MenuItem value={0}>Другое</MenuItem>
              </Select>
            </FormControl>
          </div>

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
            >
              Записаться
            </Button>
          </div>
        </form>
      </Box>
    </Container>
  );
};

export default NewAppointment;
