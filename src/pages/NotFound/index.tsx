import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { Box, Container } from "@mui/system";

import sad from "../../assets/img/sad.png";

import "./NotFound.scss";

const NotFound: React.FC = () => {
  return (
    <Container className="container" maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <h2>Страница не найдена</h2>
        <img src={sad} />

        <Link to="/">
          <Button className="main-page--button" variant="contained">
            На главную
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default NotFound;
