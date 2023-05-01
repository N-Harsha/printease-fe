import { Close, CloudUpload } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Collapse,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  LinearProgress,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { auth } from "../features/Login.reducer";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import {
  noOfPagesApi,
  serviceConfig,
  specificServiceDetailsApi,
} from "../constants";
import { api } from "../utils/APIMethods";
import DropDownRow from "../components/DropDownRow";
import { removeLastChar, roundToTwoDecimals } from "../utils/util";

const data = [
  {
    associatedServices: [
      {
        id: 1,
        orientation: {
          id: 1,
          type: "Portrait",
        },
        paperSize: {
          id: 4,
          type: "A4",
        },
        paperType: {
          id: 1,
          type: "Glossy",
        },
        printSide: {
          id: 1,
          type: "Single",
        },
        printType: {
          id: 1,
          type: "Black and White",
        },
        bindingType: null,
        printServiceId: null,
        price: 2.3,
      },
      {
        id: 2,
        orientation: {
          id: 1,
          type: "Portrait",
        },
        paperSize: {
          id: 4,
          type: "A4",
        },
        paperType: {
          id: 1,
          type: "Glossy",
        },
        printSide: {
          id: 1,
          type: "Single",
        },
        printType: {
          id: 2,
          type: "Color",
        },
        bindingType: null,
        printServiceId: null,
        price: 2.1,
      },
      {
        id: 3,
        orientation: {
          id: 1,
          type: "Portrait",
        },
        paperSize: {
          id: 4,
          type: "A4",
        },
        paperType: {
          id: 1,
          type: "Glossy",
        },
        printSide: {
          id: 2,
          type: "Double",
        },
        printType: {
          id: 1,
          type: "Black and White",
        },
        bindingType: null,
        printServiceId: null,
        price: 2.8,
      },
      {
        id: 4,
        orientation: {
          id: 1,
          type: "Portrait",
        },
        paperSize: {
          id: 4,
          type: "A4",
        },
        paperType: {
          id: 1,
          type: "Glossy",
        },
        printSide: {
          id: 2,
          type: "Double",
        },
        printType: {
          id: 2,
          type: "Color",
        },
        bindingType: null,
        printServiceId: null,
        price: 3.1,
      },
      {
        id: 5,
        orientation: {
          id: 1,
          type: "Portrait",
        },
        paperSize: {
          id: 4,
          type: "A4",
        },
        paperType: {
          id: 2,
          type: "Matte",
        },
        printSide: {
          id: 1,
          type: "Single",
        },
        printType: {
          id: 1,
          type: "Black and White",
        },
        bindingType: null,
        printServiceId: null,
        price: 2.1,
      },
      {
        id: 6,
        orientation: {
          id: 1,
          type: "Portrait",
        },
        paperSize: {
          id: 4,
          type: "A4",
        },
        paperType: {
          id: 2,
          type: "Matte",
        },
        printSide: {
          id: 1,
          type: "Single",
        },
        printType: {
          id: 2,
          type: "Color",
        },
        bindingType: null,
        printServiceId: null,
        price: 2.3,
      },
      {
        id: 7,
        orientation: {
          id: 2,
          type: "Landscape",
        },
        paperSize: {
          id: 3,
          type: "A3",
        },
        paperType: {
          id: 1,
          type: "Glossy",
        },
        printSide: {
          id: 1,
          type: "Single",
        },
        printType: {
          id: 1,
          type: "Black and White",
        },
        bindingType: null,
        printServiceId: null,
        price: 2.7,
      },
      {
        id: 8,
        orientation: {
          id: 2,
          type: "Landscape",
        },
        paperSize: {
          id: 3,
          type: "A3",
        },
        paperType: {
          id: 2,
          type: "Matte",
        },
        printSide: {
          id: 1,
          type: "Single",
        },
        printType: {
          id: 1,
          type: "Black and White",
        },
        bindingType: null,
        printServiceId: null,
        price: 2.4,
      },
      {
        id: 9,
        orientation: {
          id: 2,
          type: "Landscape",
        },
        paperSize: {
          id: 2,
          type: "A2",
        },
        paperType: {
          id: 1,
          type: "Glossy",
        },
        printSide: {
          id: 1,
          type: "Single",
        },
        printType: {
          id: 1,
          type: "Black and White",
        },
        bindingType: null,
        printServiceId: null,
        price: 2.5,
      },
      {
        id: 10,
        orientation: {
          id: 2,
          type: "Landscape",
        },
        paperSize: {
          id: 2,
          type: "A2",
        },
        paperType: {
          id: 2,
          type: "Matte",
        },
        printSide: {
          id: 2,
          type: "Double",
        },
        printType: {
          id: 2,
          type: "Color",
        },
        bindingType: null,
        printServiceId: null,
        price: 2.4,
      },
    ],
    serviceProviderId: 1,
    serviceProviderName: "John Doe",
    distance: 8.3004181273581,
  },

  {
    associatedServices: [
      {
        id: 1,
        orientation: {
          id: 1,
          type: "Portrait",
        },
        paperSize: {
          id: 4,
          type: "A4",
        },
        paperType: {
          id: 1,
          type: "Glossy",
        },
        printSide: {
          id: 1,
          type: "Single",
        },
        printType: {
          id: 1,
          type: "Black and White",
        },
        bindingType: null,
        printServiceId: null,
        price: 2.3,
      },
      {
        id: 2,
        orientation: {
          id: 1,
          type: "Portrait",
        },
        paperSize: {
          id: 4,
          type: "A4",
        },
        paperType: {
          id: 1,
          type: "Glossy",
        },
        printSide: {
          id: 1,
          type: "Single",
        },
        printType: {
          id: 2,
          type: "Color",
        },
        bindingType: null,
        printServiceId: null,
        price: 2.1,
      },
      {
        id: 3,
        orientation: {
          id: 1,
          type: "Portrait",
        },
        paperSize: {
          id: 4,
          type: "A4",
        },
        paperType: {
          id: 1,
          type: "Glossy",
        },
        printSide: {
          id: 2,
          type: "Double",
        },
        printType: {
          id: 1,
          type: "Black and White",
        },
        bindingType: null,
        printServiceId: null,
        price: 2.8,
      },
      {
        id: 4,
        orientation: {
          id: 1,
          type: "Portrait",
        },
        paperSize: {
          id: 4,
          type: "A4",
        },
        paperType: {
          id: 1,
          type: "Glossy",
        },
        printSide: {
          id: 2,
          type: "Double",
        },
        printType: {
          id: 2,
          type: "Color",
        },
        bindingType: null,
        printServiceId: null,
        price: 3.1,
      },
      {
        id: 5,
        orientation: {
          id: 1,
          type: "Portrait",
        },
        paperSize: {
          id: 4,
          type: "A4",
        },
        paperType: {
          id: 2,
          type: "Matte",
        },
        printSide: {
          id: 1,
          type: "Single",
        },
        printType: {
          id: 1,
          type: "Black and White",
        },
        bindingType: null,
        printServiceId: null,
        price: 2.1,
      },
      {
        id: 6,
        orientation: {
          id: 1,
          type: "Portrait",
        },
        paperSize: {
          id: 4,
          type: "A4",
        },
        paperType: {
          id: 2,
          type: "Matte",
        },
        printSide: {
          id: 1,
          type: "Single",
        },
        printType: {
          id: 2,
          type: "Color",
        },
        bindingType: null,
        printServiceId: null,
        price: 2.3,
      },
      {
        id: 7,
        orientation: {
          id: 2,
          type: "Landscape",
        },
        paperSize: {
          id: 3,
          type: "A3",
        },
        paperType: {
          id: 1,
          type: "Glossy",
        },
        printSide: {
          id: 1,
          type: "Single",
        },
        printType: {
          id: 1,
          type: "Black and White",
        },
        bindingType: null,
        printServiceId: null,
        price: 2.7,
      },
      {
        id: 8,
        orientation: {
          id: 2,
          type: "Landscape",
        },
        paperSize: {
          id: 3,
          type: "A3",
        },
        paperType: {
          id: 2,
          type: "Matte",
        },
        printSide: {
          id: 1,
          type: "Single",
        },
        printType: {
          id: 1,
          type: "Black and White",
        },
        bindingType: null,
        printServiceId: null,
        price: 2.4,
      },
      {
        id: 9,
        orientation: {
          id: 2,
          type: "Landscape",
        },
        paperSize: {
          id: 2,
          type: "A2",
        },
        paperType: {
          id: 1,
          type: "Glossy",
        },
        printSide: {
          id: 1,
          type: "Single",
        },
        printType: {
          id: 1,
          type: "Black and White",
        },
        bindingType: null,
        printServiceId: null,
        price: 2.5,
      },
      {
        id: 10,
        orientation: {
          id: 2,
          type: "Landscape",
        },
        paperSize: {
          id: 2,
          type: "A2",
        },
        paperType: {
          id: 2,
          type: "Matte",
        },
        printSide: {
          id: 2,
          type: "Double",
        },
        printType: {
          id: 2,
          type: "Color",
        },
        bindingType: null,
        printServiceId: null,
        price: 2.4,
      },
    ],
    serviceProviderId: 2,
    serviceProviderName: "James Trigger",
    // todo make this as the service provider shop name
    distance: 15.004181273581,
  },
];

function PlaceOrder() {
  const initalConfig = () =>
    serviceConfig.reduce((acc, curr) => ({ ...acc, [curr.key]: [] }), {});
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePages, setFilePages] = useState(1);
  const [configfilters, setConfigFilters] = useState(initalConfig);
  const [selectedConfig, setSelectedConfig] = useState(null);
  const [showDialogDropDown, setShowDialogDropDown] = useState(false);

  const params = useParams();
  const user = useSelector(auth);
  const serviceId = params.id;

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const {
    data: serviceDetails,
    isLoading: serviceDetailsLoading,
    refetch,
  } = useQuery("SpecificServiceQuery", {
    queryFn: () => api({ url: specificServiceDetailsApi(serviceId) }, user),
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });

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
    }
  );

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    getPages(e.target.files[0]);
  };
  const handleFileRemoval = () => {
    setSelectedFile(null);
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
  const handleModalClose = () => {
    setSelectedConfig(null);
    setShowDialogDropDown(false);
  };
  const processConfig = (data) => {
    return serviceConfig.map((item, idx) =>
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
    );
  };

  const parseConfiguratoin = () => {
    return selectedConfig === null ? (
      ""
    ) : (
      <Table>
        <TableRow>
          <TableCell sx={{ fontWeight: "bold" }} align="left">
            Service Provider Name
          </TableCell>
          <TableCell>{data[selectedConfig[0]].serviceProviderName}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell sx={{ fontWeight: "bold" }} align="left">
            Distance
          </TableCell>
          <TableCell>
            {roundToTwoDecimals(data[selectedConfig[0]].distance) + " "}Km
          </TableCell>
        </TableRow>
        {selectedFile !== null && (
          <>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }} align="left">
                Selected file Name
              </TableCell>
              <TableCell>{selectedFile.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }} align="left">
                No. of pages
              </TableCell>
              <TableCell>{filePages}</TableCell>
            </TableRow>
          </>
        )}
        <TableRow onClick={() => setShowDialogDropDown((prev) => !prev)}>
          <TableCell colSpan={2} sx={{ fontWeight: "bold" }}>
            <IconButton sx={{ pl: 0 }}>
              {showDialogDropDown ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </IconButton>
            View Order Configuration
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
          <TableCell sx={{ fontWeight: "bold" }} align="left">
            Total Cost
          </TableCell>
          <TableCell>
            {"₹ " +
              roundToTwoDecimals(
                data[selectedConfig[0]].associatedServices[selectedConfig[1]]
                  .price * filePages ?? 1
              )}
          </TableCell>
        </TableRow>
      </Table>
    );
  };

  return serviceDetailsLoading ? (
    <LinearProgress />
  ) : (
    <>
      <Typography variant="h5">
        Place Orders ({serviceDetails?.serviceName})
      </Typography>
      <Box sx={{ "&>*": { mt: "15px !important" } }}>
        {selectedFile === null ? (
          <>
            <Button
              variant="contained"
              startIcon={<CloudUpload />}
              sx={{ p: 2 }}
              onClick={() => {
                document.querySelector(".orderFileInput").click();
              }}
            >
              Upload A File
            </Button>
            <input
              type="file"
              style={{ display: "none" }}
              className="orderFileInput"
              onChange={handleFileChange}
            ></input>
          </>
        ) : (
          <>
            <Dialog
              onClose={handleModalClose}
              open={selectedConfig !== null}
              fullWidth
            >
              <DialogTitle textAlign={"center"}>
                Confirm Order Details
              </DialogTitle>
              <DialogContent>{parseConfiguratoin()}</DialogContent>
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
                    {!loadingNoOfPages && <TableCell>No. of Pages</TableCell>}
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
                    {!loadingNoOfPages && <TableCell>{filePages}</TableCell>}
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
                            renderValue={(selected) => selected.join(", ")}
                            MenuProps={MenuProps}
                            onChange={(e) => handleSelectChange(item.key, e)}
                          >
                            {serviceDetails[item.key].map((listItem) => (
                              <MenuItem key={listItem.id} value={listItem.type}>
                                <Checkbox
                                  checked={
                                    configfilters[item.key]?.indexOf(
                                      listItem.type
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
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Distance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item, idx) => (
                  <DropDownRow
                    row={item}
                    serviceDetails={serviceDetails}
                    noOfPages={filePages}
                    outterIdx={idx}
                    handleSelection={handleAssociateServiceSelection}
                  />
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </Box>
    </>
  );
}

export default PlaceOrder;
