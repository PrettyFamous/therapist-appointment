import { Link } from "react-router-dom";
import { Box, Container } from "@mui/system";
import { Button } from "@mui/material";

import "./MainPage.scss";

const MainPage: React.FC = () => {
  return (
    <Container className="container" maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <h2>Выберите роль</h2>
        <Link to="/new-appointment">
          <Button className="main-page--button" variant="contained">
            Пациент
          </Button>
        </Link>
        <Link to="/login">
          <Button className="main-page--button" variant="contained">
            Администратор
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default MainPage;
