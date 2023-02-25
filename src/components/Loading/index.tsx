import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";

const Loading: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <CircularProgress size={100} />
    </Box>
  );
};

export default Loading;
