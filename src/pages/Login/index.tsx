import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
//@ts-ignore
import Visibility from "@mui/icons-material/Visibility";
//@ts-ignore
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import { useLoginControls } from "../../hooks/useLoginControls";
import { useState } from "react";

const loginFieldValues = [
  {
    name: "login",
    label: "Логин*",
  },
  {
    name: "password",
    label: "Пароль*",
  },
];

const Login: React.FC = () => {
  const { handleInputValue, handleFormSubmit, formIsValid, errors } =
    useLoginControls();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
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
        <h2>Авторизация</h2>
        <form className="new-appointment__form" onSubmit={handleFormSubmit}>
          <TextField
            margin="dense"
            onBlur={handleInputValue}
            onChange={handleInputValue}
            name="login"
            label="Логин"
            autoComplete="none"
            {...(errors["login"] && {
              error: true,
              helperText: errors["login"],
            })}
          />

          <TextField
            margin="dense"
            onBlur={handleInputValue}
            onChange={handleInputValue}
            name="password"
            label="Пароль"
            autoComplete="none"
            type={showPassword ? "text" : "password"}
            {...(errors["password"] && {
              error: true,
              helperText: errors["password"],
            })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

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
              Войти
            </Button>
          </div>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
