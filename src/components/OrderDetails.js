import {
  Paper,
  Typography,
  Grid,
  Box,
  Stack,
  Button,
  LinearProgress,
} from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import {
  formatDate,
  getColor,
  getFileExtension,
  nextStatus,
  showActions,
} from "../utils/util";
import GridItem from "./GridItem";
import { useSelector } from "react-redux";
import { selectIsLightTheme } from "../features/Theme.reducer";
import { auth } from "../features/Login.reducer";
import OrderStatusLog from "./OrderStatusLog";
import { useMutation, useQuery } from "react-query";
import {
  cancelOrderStatusApi,
  promoteOrderStatusApi,
  specificOrderDetailsApi,
} from "../constants";
import { api } from "../utils/APIMethods";
import { useState } from "react";

function OrderDetails() {
  const [isPromoteRequest, setIsPromoteRequest] = useState(false);
  const isLightTheme = useSelector(selectIsLightTheme);

  const { id } = useParams();

  const user = useSelector(auth);

  const {
    data: orderDetail,
    isLoading,
    refetch,
  } = useQuery("orderDetails", {
    queryFn: () => api({ url: specificOrderDetailsApi(id) }, user),
    onError: (error) => console.log(error),
  });

  const downloadFile = (url) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        const fileName = orderDetail.id + "." + getFileExtension(blob.type);
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error(`Error downloading file: ${error}`);
      });
  };

  const { mutate: orderStatusPromoteMutate, isLoading: promoteIsLoading } =
    useMutation(["PromoteOrder"], {
      mutationFn: (id) =>
        api(
          {
            url: promoteOrderStatusApi(id),
            method: "PUT",
            body: { comment: "" },
          },
          user
        ),
      onSuccess: (data) => {
        refetch();
      },
    });
  const { mutate: orderStatusCancelMutate, isLoading: cancelIsLoading } =
    useMutation(["CancelOrder"], {
      mutationFn: (id) =>
        api(
          {
            url: cancelOrderStatusApi(id),
            method: "PUT",
            body: { comment: "" },
          },
          user
        ),
      onSuccess: (data) => {
        console.log("test");
        console.log(data);
        refetch();
      },
    });

  return (
    <>
      {isLoading || promoteIsLoading || cancelIsLoading ? (
        <LinearProgress />
      ) : (
        <>
          <Typography variant="h5" textAlign={"left"}>
            Order Details Page
          </Typography>
          <Paper elevation={5}>
            <Grid container p={2} pt={0} mt={2} rowSpacing={3}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  <Typography variant="h4" mr={1} sx={{ fontSize: { xs: 25 } }}>
                    Order ID:
                  </Typography>
                  <Typography variant="h4" sx={{ fontSize: { xs: 25 } }}>
                    {orderDetail.id}
                  </Typography>
                </Box>
              </Grid>
              <GridItem
                title={"Order Date:"}
                value={formatDate(orderDetail.createdOn, false)}
                sx={{ color: "grey" }}
              />
              <GridItem
                title={"Due Date :"}
                value={formatDate(orderDetail.dueDate, false)}
                sx={{ color: "warning.main" }}
              />

              <GridItem title={"Service :"} value={orderDetail.serviceName} />

              {orderDetail.serviceProviderBusinessName && (
                <GridItem
                  title="Service Provider:"
                  value={orderDetail.serviceProviderBusinessName}
                />
              )}
              {orderDetail.customerName && (
                <GridItem
                  title="Customer Name:"
                  value={orderDetail.customerName}
                />
              )}
              <GridItem
                title={"Order Status:"}
                value={orderDetail.orderStatus}
                sx={{
                  backgroundColor: getColor(
                    orderDetail.orderStatus,
                    isLightTheme
                  ),
                  color: isLightTheme ? "white" : "black",
                  borderRadius: 2,
                  fontWeight: "700",
                  p: 1,
                }}
              />
              <GridItem
                value={"₹" + orderDetail.price}
                title={"Order Price:"}
              />
              <GridItem value={orderDetail.quantity} title={" Quantity:"} />
              <GridItem
                value={"link"}
                sx={{
                  color: "info.main",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={() => downloadFile(orderDetail.fileDownloadableUrl)}
                title={"Download file:"}
              />
              {orderDetail.comment && (
                <Grid item xs={12} textAlign={"left"}>
                  <Typography variant="h5" mr={1} sx={{ fontSize: { xs: 25 } }}>
                    Comment:
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ maxHeight: "100px", overflow: "auto" }}
                    px={4}
                  >
                    {orderDetail.comment}
                  </Typography>
                </Grid>
              )}
              {showActions(user.role, orderDetail.orderStatus) && (
                <Grid item xs={12}>
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Typography
                      variant="h5"
                      mr={1}
                      sx={{ fontSize: { xs: 25 }, textAlign: "left" }}
                    >
                      Update Order Status:
                    </Typography>
                    <Stack direction={"row"} spacing={2} px={4} py={2}>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "success.light",
                          fontWeight: "bold",
                          color: isLightTheme ? "white" : "black",
                          boxShadow: 10,
                          ":hover": {
                            backgroundColor: "success.dark",
                          },
                        }}
                        onClick={() => orderStatusPromoteMutate(orderDetail.id)}
                      >
                        {nextStatus(orderDetail.orderStatus)}
                      </Button>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "error.light",
                          fontWeight: "bold",
                          color: isLightTheme ? "white" : "black",
                          boxShadow: 10,
                          ":hover": {
                            backgroundColor: "error.dark",
                          },
                        }}
                        onClick={() => orderStatusCancelMutate(orderDetail.id)}
                      >
                        {orderDetail.orderStatus === "Pending"
                          ? "Reject"
                          : "Cancel"}
                      </Button>
                    </Stack>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Paper>
          <Typography
            variant="h4"
            m={2}
            p={2}
            // sx={{ textDecoration: "underline" }}
          >
            Order Status Log
          </Typography>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {<OrderStatusLog log={orderDetail.orderStatusLogList} />}
          </div>
        </>
      )}
    </>
  );
}

export default OrderDetails;
