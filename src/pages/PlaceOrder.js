import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputLabel,
  LinearProgress,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { auth } from "../features/Login.reducer";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import {
  createOrderApi,
  noOfPagesApi,
  recommendedServiceProvidersApi,
  serviceConfig,
  specificServiceDetailsApi,
} from "../constants";
import { api } from "../utils/APIMethods";
import DropDownRow from "../components/DropDownRow";
import { removeLastChar, roundToTwoDecimals, zeroAdder } from "../utils/util";
import FileInput from "../components/FileInput";
import { selectIsLightTheme } from "../features/Theme.reducer";

import MuiAlert from "@mui/material/Alert";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import dayjs from "dayjs";

function PlaceOrder() {
  const initalConfig = () =>
    serviceConfig.reduce((acc, curr) => ({ ...acc, [curr.key]: [] }), {});
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePages, setFilePages] = useState(1);
  const [configfilters, setConfigFilters] = useState(initalConfig);
  const [selectedConfig, setSelectedConfig] = useState(null);
  const [showDialogDropDown, setShowDialogDropDown] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [coOrd, setCoOrd] = useState({ longitude: "", latitude: "" });
  const [dueDate, setDueDate] = useState(null);
  const [erroMessage, setErrorMessage] = useState(null);

  const params = useParams();
  const user = useSelector(auth);
  const serviceId = params.id;
  const navigation = useNavigate();
  const commentRef = useRef();

  const recomendationParamString = useCallback(
    Object.entries({
      ...coOrd,
      ...serviceConfig.reduce(
        (acc, curr) => ({
          ...acc,
          [curr.key.slice(0, -1) + "Ids"]: configfilters[curr.key],
        }),
        {}
      ),
      printServiceId: serviceId,
    })
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return `${encodeURIComponent(key)}=${value
            .map((item) => `${encodeURIComponent(item)}`)
            .join(",")}`;
        } else {
          return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        }
      })
      .join("&"),
    [coOrd, configfilters, serviceId]
  );

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const isLightTheme = useSelector(selectIsLightTheme);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoOrd({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
      });
    }
  }, []);

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const { data: serviceDetails, isLoading: serviceDetailsLoading } = useQuery(
    "SpecificServiceQuery",
    {
      queryFn: () => api({ url: specificServiceDetailsApi(serviceId) }, user),
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );

  const { mutate: getPages, isLoading: loadingNoOfPages } = useMutation(
    ["NoOfPages"],
    {
      mutationFn: (file) => {
        const body = new FormData();
        body.append("file", file);
        return api(
          { url: noOfPagesApi, method: "POST", body, isFormData: true },
          user
        );
      },
      onSuccess: (data) => {
        setFilePages(data);
      },
      onError: (error) => {
        console.log(error);
        handleFileRemoval();
      },
    }
  );

  const { mutate: createOrderMutation, isLoading: isOrderCreating } =
    useMutation(["createOrder"], {
      mutationFn: (body) => {
        return api(
          { url: createOrderApi, method: "POST", body, isFormData: true },
          user
        );
      },
      onSuccess: (data) => {
        console.log(data);
        navigation("/orders");
      },
      onError: (error) => {
        console.log(error);
        setErrorMessage(error.message);
      },
    });

  const { data, isLoading: recommendationIsLoading } = useQuery(
    ["fetchRecomendations", coOrd, serviceId, configfilters],
    {
      queryFn: () =>
        api(
          { url: recommendedServiceProvidersApi + recomendationParamString },
          user
        ),
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );

  const handleFileChange = (file) => {
    setSelectedFile(file);
    getPages(file);
  };
  const handleFileRemoval = () => {
    setSelectedFile(null);
    setConfigFilters(initalConfig());
    setFilePages(1);
  };

  const handleSelectChange = (key, event) => {
    const {
      target: { value },
    } = event;
    setConfigFilters((configfilters) => ({
      ...configfilters,
      [key]: typeof value === "string" ? value.split(",") : value,
    }));
  };

  const handleAssociateServiceSelection = (outerIdx, innerIdx) => {
    setSelectedConfig([outerIdx, innerIdx]);
  };
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < 20) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleModalClose = () => {
    setSelectedConfig(null);
    setShowDialogDropDown(false);
    //TODO: this can work in two ways,
    //  meaning that if the user wants to retain the quntity then just comment this part
    setQuantity(1);
    setDueDate(null);
  };

  const processConfig = (data) => {
    return (
      <>
        {serviceConfig.map((item, idx) =>
          data[removeLastChar(item.key)] !== null ? (
            <TableRow key={idx}>
              <TableCell scope="row" component={"th"}>
                {removeLastChar(item.label)}
              </TableCell>
              <TableCell align="left">
                {data[removeLastChar(item.key)].type}
              </TableCell>
            </TableRow>
          ) : (
            ""
          )
        )}
        <TableRow>
          <TableCell scope="row" component={"th"}>
            Price
          </TableCell>
          <TableCell>₹ {data["price"]}</TableCell>
        </TableRow>
      </>
    );
  };
  console.log(dueDate);

  const parseConfiguratoin =
    selectedConfig === null ? (
      ""
    ) : (
      <Table>
        <TableRow>
          <TableCell align="left">
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold" }}
              display={"inline"}
            >
              Service Provider Name
            </Typography>
          </TableCell>
          <TableCell>{data[selectedConfig[0]].serviceProviderName}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold" }}
              display={"inline"}
            >
              Distance
            </Typography>
          </TableCell>
          <TableCell>
            {roundToTwoDecimals(data[selectedConfig[0]].distance) + " "}Km
          </TableCell>
        </TableRow>
        {selectedFile !== null && (
          <>
            <TableRow>
              <TableCell align="left">
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bold" }}
                  display={"inline"}
                >
                  Selected file Name
                </Typography>
              </TableCell>
              <TableCell>{selectedFile.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bold" }}
                  display={"inline"}
                >
                  No. of pages
                </Typography>
              </TableCell>
              <TableCell>{filePages}</TableCell>
            </TableRow>
          </>
        )}
        <TableRow onClick={() => setShowDialogDropDown((prev) => !prev)}>
          <TableCell colSpan={2}>
            <IconButton sx={{ pl: 0 }}>
              {showDialogDropDown ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </IconButton>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold" }}
              display={"inline"}
            >
              View Order Configuration
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}>
            <Collapse in={showDialogDropDown} timeout={"auto"} unmountOnExit>
              <Table>
                {processConfig(
                  data[selectedConfig[0]].associatedServices[selectedConfig[1]]
                )}
              </Table>
            </Collapse>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <InputLabel
              sx={{
                fontWeight: "bold",
                color: isLightTheme ? "black" : "white",
              }}
              htmlFor="quantity-input"
            >
              Quantity
            </InputLabel>
          </TableCell>
          <TableCell>
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <Button
                variant="contained"
                sx={{
                  fontWeight: "bold",
                  fontSize: 16,
                  minWidth: 0,
                  width: 32,
                  height: 32,
                  p: 0,
                }}
                onClick={handleDecrement}
              >
                -
              </Button>
              <Input
                type="number"
                sx={{ width: "10%" }}
                value={quantity}
                id="quantity-input"
                inputProps={{
                  min: 1,
                  max: 20,
                  style: { textAlign: "center" },
                }}
                onChange={(event) => {
                  const value = parseInt(event.target.value);
                  if (value >= 1 && value <= 20) {
                    setQuantity(value);
                  }
                }}
              />
              <Button
                variant="contained"
                sx={{
                  fontWeight: "bold",
                  fontSize: 16,
                  minWidth: 0,
                  width: 32,
                  height: 32,
                  p: 0,
                }}
                onClick={handleIncrement}
              >
                +
              </Button>
            </Stack>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Due Date
            </Typography>
          </TableCell>
          <TableCell>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDateTimePicker
                minDateTime={dayjs().add(30, "minute")}
                onChange={(date) =>
                  date === null
                    ? null
                    : setDueDate(
                        `${zeroAdder(date.$y)}-${zeroAdder(
                          date.$M + 1
                        )}-${zeroAdder(date.$D)}T${zeroAdder(
                          date.$H
                        )}:${zeroAdder(date.$m)}:${zeroAdder(date.$s)}`
                      )
                }
              />
            </LocalizationProvider>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <InputLabel
              sx={{
                fontWeight: "bold",
                color: isLightTheme ? "black" : "white",
              }}
              htmlFor="comment-input"
            >
              Comment (optional)
            </InputLabel>
          </TableCell>
          <TableCell>
            <textarea
              rows={3}
              style={{ width: "82%" }}
              id="comment-input"
              ref={commentRef}
            ></textarea>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold" }}
              display={"inline"}
            >
              Total Cost
            </Typography>
          </TableCell>
          <TableCell align="right">
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold" }}
              display={"inline"}
            >
              {"₹ " +
                roundToTwoDecimals(
                  data[selectedConfig[0]].associatedServices[selectedConfig[1]]
                    .price *
                    quantity *
                    filePages ?? 1
                )}
            </Typography>
          </TableCell>
        </TableRow>
      </Table>
    );

  const handlePlaceOrder = () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append(
      "associatedServiceId",
      data[selectedConfig[0]].associatedServices[selectedConfig[1]].id
    );
    formData.append("comment", commentRef.current.value);
    if (dueDate) formData.append("dueDate", dueDate);
    formData.append("quantity", quantity);
    createOrderMutation(formData);
  };

  return serviceDetailsLoading ? (
    <LinearProgress />
  ) : (
    <>
      <Snackbar
        autoHideDuration={1400}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={erroMessage}
        onClose={() => setErrorMessage(null)}
        key={"top" + "center"}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          sx={{ width: "100%" }}
          severity="error"
          alignItems="center"
        >
          {erroMessage?.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </MuiAlert>
      </Snackbar>
      <Typography variant="h5">
        Place Orders ({serviceDetails?.serviceName})
      </Typography>
      <Box sx={{ "&>*": { mt: "15px !important" } }}>
        {selectedFile === null ? (
          <>
            {/* TODO : add the new file input here. */}
            <FileInput handleFileChange={handleFileChange} />
          </>
        ) : (
          <>
            <Dialog
              onClose={handleModalClose}
              open={selectedConfig !== null}
              fullWidth
              // fullScreen
            >
              <DialogTitle textAlign={"center"} fontWeight={"bold"}>
                Confirm Order Details
              </DialogTitle>
              <DialogContent sx={{ fontSize: "14px", pb: "16px" }}>
                {parseConfiguratoin}
              </DialogContent>
              <DialogActions>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "error.main",
                    color: !isLightTheme ? "black" : "white",
                    ":hover": { backgroundColor: "error.dark" },
                    mr: "8px",
                    minWidth: "90px",
                  }}
                  onClick={handleModalClose}
                >
                  Cancel
                </Button>
                <LoadingButton
                  variant="contained"
                  sx={{
                    color: !isLightTheme ? "black" : "white",
                    minWidth: "90px",
                  }}
                  color="success"
                  onClick={handlePlaceOrder}
                  loading={isOrderCreating}
                >
                  Confirm
                </LoadingButton>
              </DialogActions>
            </Dialog>

            <Paper elevation={4}>
              <Table
                sx={{
                  "*": {
                    textAlign: "center",
                  },
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>File Name</TableCell>
                    <TableCell>File Type</TableCell>
                    <TableCell>File Size</TableCell>
                    <TableCell>No. of Pages</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{selectedFile.name}</TableCell>
                    <TableCell>{selectedFile.type}</TableCell>
                    <TableCell>
                      {Math.round(selectedFile.size / 1000) + " "}KB
                    </TableCell>
                    <TableCell>
                      {loadingNoOfPages ? (
                        <CircularProgress size={25} />
                      ) : (
                        filePages
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        endIcon={<Close />}
                        sx={{
                          backgroundColor: "error.main",
                          color: "white",
                          "&:hover": { backgroundColor: "error.dark" },
                        }}
                        onClick={handleFileRemoval}
                      >
                        Clear
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>

            <Grid item>
              <Typography variant="h5">
                Choose your Service Configuration
              </Typography>
              <Grid container>
                {serviceConfig.map(
                  (item, idx) =>
                    serviceDetails[item.key]?.length > 0 && (
                      <Grid item lg={3} md={4} sm={6} xs={12} key={idx}>
                        <FormControl sx={{ m: 1, width: "98%" }}>
                          <InputLabel>{item.label}</InputLabel>
                          <Select
                            labelId="demo-multiple-checkbox-label"
                            multiple
                            value={configfilters[item.key]}
                            input={<OutlinedInput label={item.label} />}
                            renderValue={(selected) =>
                              selected
                                .map(
                                  (selectedIdx) =>
                                    serviceDetails[item.key].find(
                                      (item) => item.id === selectedIdx
                                    ).type
                                )
                                .join(", ")
                            }
                            MenuProps={MenuProps}
                            onChange={(e) => handleSelectChange(item.key, e)}
                          >
                            {serviceDetails[item.key].map((listItem) => (
                              <MenuItem key={listItem.id} value={listItem.id}>
                                <Checkbox
                                  checked={
                                    configfilters[item.key]?.indexOf(
                                      listItem.id
                                    ) > -1
                                  }
                                />
                                <ListItemText primary={listItem.type} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    )
                )}
                <Grid item lg={3} md={4} sm={6} xs={12}>
                  <Button
                    startIcon={<Close />}
                    variant="contained"
                    sx={{
                      m: 1,
                      height: "78%",
                    }}
                    onClick={() => {
                      setConfigFilters(initalConfig());
                    }}
                  >
                    Clear All Filters
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Bussiness Name</TableCell>
                  <TableCell>Service Provider Name</TableCell>
                  <TableCell align="right">Distance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recommendationIsLoading ? (
                  <CircularProgress />
                ) : (
                  data.map((item, idx) => (
                    <DropDownRow
                      row={item}
                      serviceDetails={serviceDetails}
                      noOfPages={filePages}
                      outterIdx={idx}
                      handleSelection={handleAssociateServiceSelection}
                    />
                  ))
                )}
              </TableBody>
            </Table>
          </>
        )}
      </Box>
    </>
  );
}

export default PlaceOrder;
