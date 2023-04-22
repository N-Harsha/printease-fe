import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import {
  customerRole,
  getAllOrdersApi,
  serviceProviderRole,
} from "../constants";
import { auth } from "../features/Login.reducer";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import { selectIsLightTheme } from "../features/Theme.reducer";
import { formatDate, getColor } from "../utils/util";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { api } from "../utils/APIMethods";
import { Inventory2, Inventory2TwoTone } from "@mui/icons-material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables() {
  const user = useSelector(auth);
  const isLightTheme = useSelector(selectIsLightTheme);
  const role = user.role;
  const navigate = useNavigate();

  function createData(
    orderId,
    serviceName,
    placedOn,
    dueDate,
    price,
    name,
    status
  ) {
    return { orderId, serviceName, placedOn, dueDate, price, name, status };
  }
  function getName(data) {
    if (role === serviceProviderRole) {
      return data.customerName;
    }
    return data.serviceProviderBusinessName;
  }

  const { isLoading, data, error, refetch } = useQuery(
    "orders",
    () => {
      return api({ url: getAllOrdersApi }, user);
    },
    {
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const mappedData = data?.map((row) =>
    createData(
      row.id,
      row.serviceName,
      formatDate(row.createdOn),
      formatDate(row.dueDate),
      row.price,
      getName(row),
      row.orderStatus
    )
  );

  const handleOnClick = (id) => {
    return () => {
      navigate(`/orders/${id}`);
    };
  };

  return (
    <>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <>
          <Typography variant="h5" textAlign={"left"} p={2}>
            Orders
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Order Id</StyledTableCell>
                  <StyledTableCell align="center">Service Name</StyledTableCell>
                  <StyledTableCell align="center">
                    {role == serviceProviderRole
                      ? "Customer Name"
                      : "Service Provider Name"}
                  </StyledTableCell>
                  <StyledTableCell align="center">Placed On</StyledTableCell>
                  <StyledTableCell align="center">Due Date</StyledTableCell>
                  <StyledTableCell align="center">Price</StyledTableCell>
                  <StyledTableCell align="center">status</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mappedData?.length === 0 ? (
                  <StyledTableCell align="center" colSpan={8}>
                    <Inventory2 fontSize="large" />
                    {role === customerRole ? (
                      <Typography>You havn't placed Any Orders</Typography>
                    ) : (
                      <Typography>You havn't received Any Orders</Typography>
                    )}
                  </StyledTableCell>
                ) : (
                  mappedData.map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell>{row.orderId}</StyledTableCell>
                      <StyledTableCell align="center">
                        {row.serviceName}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.placedOn}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.dueDate}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        ₹ {row.price}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Paper
                          elevation={10}
                          sx={{
                            backgroundColor: getColor(row.status, isLightTheme),
                            color: isLightTheme ? "white" : "black",
                            fontWeight: "700",
                            p: 1,
                          }}
                        >
                          {row.status}
                        </Paper>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Button
                          onClick={handleOnClick(row.orderId)}
                          variant="contained"
                          sx={{ fontWeight: "550" }}
                        >
                          View Details
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
}
