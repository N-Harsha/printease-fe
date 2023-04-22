import { Box, Grid, Typography } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

const GridItem = ({ title, value, sx, onClick }) => {
  return (
    <Grid item xs={12} md={6} lg={3}>
      <Box display={"flex"} alignItems={"center"}>
        <Typography
          variant="h6"
          mr={1}
          sx={{
            fontSize: { xs: 15, md: 20 },
            width: { sx: "50%", md: "30%" },
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="h6"
          onClick={onClick}
          sx={{
            fontSize: { xs: 15, md: 20 },
            width: { sx: "50%", md: "70%" },
            ...sx,
          }}
        >
          {value}
        </Typography>
      </Box>
    </Grid>
  );
};

export default GridItem;
