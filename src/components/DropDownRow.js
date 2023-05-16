import React from "react";
import { serviceConfig } from "../constants";
import {
  Box,
  Button,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { roundToTwoDecimals } from "../utils/util";
import { useSelector } from "react-redux";
import { selectIsLightTheme } from "../features/Theme.reducer";

function DropDownRow(props) {
  const { row, serviceDetails, noOfPages, handleSelection, outterIdx } = props;

  const [open, setOpen] = React.useState(false);
  const isLightTheme = useSelector(selectIsLightTheme);

  const filteredServiceConfig = [...serviceConfig].filter(
    (item) => serviceDetails[item.key]?.length > 0
  );

  return (
    <React.Fragment>
      <TableRow onClick={() => setOpen((open) => !open)}>
        <TableCell>
          <IconButton aria-label="expand row" size="small">
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.serviceProviderBusinessName}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.serviceProviderName}
        </TableCell>
        <TableCell align="right">
          {roundToTwoDecimals(row.distance)} KM
        </TableCell>
        {/* later add additional feilds here. */}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Associated Services
              </Typography>
              <TableContainer sx={{ maxHeight: 250 }}>
                <Table
                  size="small"
                  stickyHeader
                  aria-label="associatedServices"
                >
                  <TableHead>
                    <TableRow>
                      {filteredServiceConfig.map((item, idx) => (
                        <TableCell align="left" key={idx}>
                          {item.label}
                        </TableCell>
                      ))}
                      <TableCell align="left">Price</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.associatedServices.map(
                      (associatedService, inneridx) => (
                        <TableRow key={inneridx}>
                          {filteredServiceConfig.map((item, idx) => (
                            <TableCell align="left" key={idx}>
                              {associatedService[item.key.slice(0, -1)].type}
                            </TableCell>
                          ))}
                          <TableCell align="left">
                            {roundToTwoDecimals(
                              associatedService["price"] * noOfPages
                            )}
                          </TableCell>
                          <TableCell align="right">
                            <Button
                              variant="contained"
                              sx={{
                                color: isLightTheme ? "white" : "black",
                                backgroundColor: "success.main",
                                "&:hover": {
                                  backgroundColor: "success.dark",
                                },
                              }}
                              onClick={() =>
                                handleSelection(outterIdx, inneridx)
                              }
                            >
                              Select
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default DropDownRow;
