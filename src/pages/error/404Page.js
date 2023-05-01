import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      height={"70vh"}
    >
      <Box textAlign={"center"}>
        <Typography variant="h1" fontFamily={"Courier New"} fontWeight={"bold"}>
          404
        </Typography>
        <Typography variant="h3" fontFamily={"Courier New"}>
          Page Not Found
        </Typography>
        <Typography variant="body1">
          We're sorry, the page you requested could not be found.
        </Typography>
        <Typography variant="body1">please go back to the homepage</Typography>
        <Button
          variant="contained"
          sx={{ mt: 3, fontWeight: "bold", borderRadius: "50px", p: 2 }}
          onClick={() => navigate("/")}
        >
          Go Home
        </Button>
      </Box>
    </Box>
  );
}

export default NotFoundPage;
