import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { auth } from "../features/Login.reducer";
import {
  Box,
  Button,
  CssBaseline,
  Grid,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "react-query";
import { api } from "../utils/APIMethods";
import { getAllServicesApi, serviceProviderRole } from "../constants";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const user = useSelector(auth);
  const role = user.role;
  const navigate = useNavigate();
  const {
    isLoading,
    data: services,
    refetch,
  } = useQuery("ServiceQuery", {
    queryFn: () => api({ url: getAllServicesApi }, user),
    onError: (error) => {
      console.log(error);
    },
  });
  useEffect(() => {
    refetch();
  }, [user]);
  return (
    <>
      {isLoading && <LinearProgress />}
      <CssBaseline />
      <Typography variant="h5" mx={4}>
        Services
      </Typography>
      <Box
        p={4}
        mx="auto"
        width="100%"
        justifyContent="center"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          container
          gap={2}
          columns={10}
          alignSelf="center"
          justifyContent={"space-between"}
        >
          {services?.map((service) => {
            return (
              <Grid key={service.id} item lg={3} md={3} sm={4} xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    height: "300px",
                    overflow: "auto",
                    scrollbarWidth: "3px",
                    position: "relative",
                  }}
                  elevation={3}
                >
                  <Typography variant="h5" mb={2}>
                    {service.serviceName}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {service.description}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      position: "absolute",
                      bottom: "12px",
                      right: "12px",
                    }}
                    onClick={() => {
                      if (role === serviceProviderRole) {
                        navigate(`/services/${service.id}`);
                      } else {
                        navigate(`/placeOrder`);
                      }
                    }}
                  >
                    {role === serviceProviderRole ? "Edit" : "Select"}
                  </Button>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
};

export default Services;
