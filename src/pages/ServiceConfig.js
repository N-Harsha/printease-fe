import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { api } from "../utils/APIMethods";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  createAssociatedServiceApi,
  deleteAssociatedServiceApi,
  editAssociatedServiceApi,
  getAllServicesApi,
  getAssociatedServicesApi,
} from "../constants";
import { auth } from "../features/Login.reducer";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  Input,
  LinearProgress,
  Typography,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Card from "@mui/material/Card";

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

function convertString(str) {
  return str.replace(/([a-z])([A-Z])/g, "$1 $2");
}

const Service = () => {
  const params = useParams();
  const user = useSelector(auth);

  const [bindingTypes, setBindingTypes] = useState([]);
  const [paperSizes, setPaperSizes] = useState([]);
  const [printTypes, setPrintTypes] = useState([]);
  const [printSides, setPrintSides] = useState([]);
  const [paperTypes, setPaperTypes] = useState([]);
  const [orientation, setOrientation] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [chosenCombination, setChosenCombination] = useState(null);
  const [isDeleteAction, setIsDeleteAction] = useState(false);
  const [price, setPrice] = useState(1);
  const priceRef = useRef("");

  const { isLoading, data: config } = useQuery("configQuery", {
    queryFn: () => api({ url: `${getAllServicesApi}/${serviceId}` }, user),
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });

  function checkCombinationMatch(combination) {
    return [
      bindingTypes.length === 0 ||
        bindingTypes.includes(combination.bindingType.type),
      paperSizes.length === 0 ||
        paperSizes.includes(combination.paperSize.type),
      printTypes.length === 0 ||
        printTypes.includes(combination.printType.type),
      printSides.length === 0 ||
        printSides.includes(combination.printSide.type),
      paperTypes.length === 0 ||
        paperTypes.includes(combination.paperType.type),
      orientation.length === 0 ||
        orientation.includes(combination.orientation.type),
    ].every((condition) => condition);
  }

  useEffect(() => {
    setFilteredData(combinations?.filter(checkCombinationMatch));
  }, [
    bindingTypes,
    paperSizes,
    printTypes,
    printSides,
    paperTypes,
    orientation,
  ]);

  const serviceId = params.id;

  const {
    isLoading: cardsLoading,
    data: combinations,
    refetch,
  } = useQuery("configCombinationQuery", {
    queryFn: () =>
      api(
        {
          url: `${getAssociatedServicesApi}`,
          params: { printServiceId: serviceId },
        },
        user
      ),
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      setFilteredData(data);
      // console.log(data);
    },
    enabled: Boolean(config),
  });

  const {
    mutate: addNewAssociatedService,
    isLoading: addNewAssociatedServiceIsLoading,
  } = useMutation(["AddNewAssociatedService"], {
    mutationFn: (body) =>
      api(
        {
          url: createAssociatedServiceApi,
          method: "POST",
          body,
        },
        user
      ),
    onSuccess: (data) => {
      refetch();
    },
  });
  const { mutate: editAssociatedService } = useMutation(
    ["EditAssociatedService"],
    {
      mutationFn: (body) =>
        api(
          {
            url: editAssociatedServiceApi,
            method: "PUT",
            body,
          },
          user
        ),
      onSuccess: (data) => {
        refetch();
      },
    }
  );
  const { mutate: deleteAssociatedService } = useMutation(
    ["DeleteAssociatedService"],
    {
      mutationFn: (associatedServiceId) =>
        api(
          {
            url: deleteAssociatedServiceApi(associatedServiceId),
            method: "DELETE",
          },
          user
        ),
      onSuccess: (data) => {
        refetch();
      },
    }
  );

  const handleBindingType = (event) => {
    const {
      target: { value },
    } = event;
    setBindingTypes(typeof value === "string" ? value.split(",") : value);
  };
  const handlePrintTypes = (event) => {
    const {
      target: { value },
    } = event;
    setPrintTypes(typeof value === "string" ? value.split(",") : value);
  };
  const handlePrintSides = (event) => {
    const {
      target: { value },
    } = event;
    setPrintSides(typeof value === "string" ? value.split(",") : value);
  };
  const handlePaperTypes = (event) => {
    const {
      target: { value },
    } = event;
    setPaperTypes(typeof value === "string" ? value.split(",") : value);
  };
  const handleOrientation = (event) => {
    const {
      target: { value },
    } = event;
    setOrientation(typeof value === "string" ? value.split(",") : value);
  };
  const handlePaperSizes = (event) => {
    const {
      target: { value },
    } = event;
    setPaperSizes(typeof value === "string" ? value.split(",") : value);
  };

  const currentAction =
    chosenCombination?.id === null ? "Add" : isDeleteAction ? "Delete" : "Edit";
  const currentActionColor =
    currentAction == "Add" ? "success" : isDeleteAction ? "error" : "info";

  const getPrice = () => {
    return priceRef.current.value;
  };

  const parseCombination = (data) => {
    if (!data) return;
    return (
      <>
        {Object.keys(data).map((combi, index) => {
          if (combi === "id" || combi === "price" || !data[combi]) return null;

          return (
            <Grid
              item
              ml={3}
              key={index}
              justifyContent={"space-between"}
              display={"flex"}
              sx={{ pr: 3 }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "grey",
                }}
                display={"inline"}
                key={`combi${data.id}`}
              >
                {convertString(combi)}
              </Typography>
              <Typography
                variant="body1"
                textAlign={"center"}
                alignSelf={"center"}
                ml={5}
                display={"inline"}
              >
                {data[combi].type ? data[combi]?.type : data[combi]}
              </Typography>
            </Grid>
          );
        })}
        <Grid
          item
          ml={3}
          justifyContent={"space-between"}
          display={"flex"}
          sx={{ pr: 3 }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "grey",
            }}
            display={"inline"}
          >
            price
          </Typography>
          <Input
            type="number"
            slotProps={{
              input: {
                min: 1,
                max: 2000,
                step: 0.1,
              },
            }}
            defaultValue={price}
            inputProps={{ style: { textAlign: "center" } }}
            sx={{ width: "50%" }}
            inputRef={priceRef}
            disabled={isDeleteAction}
          />
        </Grid>
      </>
    );
  };
  const onAddAction = (id) => {
    return () => {
      setChosenCombination(filteredData[id]);
      setPrice(1);
    };
  };

  const onUpdateAction = (id) => {
    return () => {
      setChosenCombination(filteredData[id]);
      setPrice(filteredData[id]["price"]);
      setIsDeleteAction(false);
    };
  };
  const onOrderDelete = (id) => {
    return () => {
      setChosenCombination(filteredData[id]);
      setPrice(filteredData[id]["price"]);
      setIsDeleteAction(true);
    };
  };
  const onClose = () => {
    setChosenCombination(null);
    setPrice(1);
    setIsDeleteAction(false);
  };
  const handleModalSubmit = () => {
    if (currentAction === "Add") {
      addNewAssociatedService({
        ...chosenCombination,
        price: getPrice(),
        printServiceId: serviceId,
      });
    } else if (currentAction === "Edit") {
      editAssociatedService({
        ...chosenCombination,
        price: getPrice(),
        printServiceId: serviceId,
      });
    } else {
      deleteAssociatedService(chosenCombination.id);
    }
    setChosenCombination(null);
  };

  return (
    <Box>
      {isLoading || cardsLoading ? (
        <LinearProgress />
      ) : (
        <>
          <Typography variant="h5" mx={5}>
            Associated Services
          </Typography>
          <Dialog open={chosenCombination !== null} onClose={onClose}>
            <DialogTitle textAlign={"center"}>
              {currentAction} Associated Service
            </DialogTitle>
            <DialogContentText>
              {parseCombination(chosenCombination)}
            </DialogContentText>
            <DialogActions
              sx={{ display: "flex", justifyContent: "center", mt: 2 }}
            >
              <Button
                variant="contained"
                sx={{ backgroundColor: "warning.main" }}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color={currentActionColor}
                onClick={handleModalSubmit}
              >
                {currentAction}
              </Button>
            </DialogActions>
          </Dialog>
          <Grid m={3} mt={1} container>
            {config["printTypes"]?.length > 0 && (
              <Grid item lg={3} md={4} sm={6} xs={12}>
                <FormControl sx={{ m: 1, width: "98%" }}>
                  <InputLabel>Print Types </InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    multiple
                    value={printTypes}
                    input={<OutlinedInput label="Print Types" />}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                    onChange={handlePrintTypes}
                  >
                    {config["printTypes"].map((printType) => (
                      <MenuItem key={printType.id} value={printType.type}>
                        <Checkbox
                          checked={printTypes.indexOf(printType.type) > -1}
                        />
                        <ListItemText primary={printType.type} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
            {config["printSides"]?.length > 0 && (
              <Grid item lg={3} md={4} sm={6} xs={12}>
                <FormControl sx={{ m: 1, width: "98%" }}>
                  <InputLabel>Print Sides</InputLabel>
                  <Select
                    multiple
                    value={printSides}
                    input={<OutlinedInput label="Print Sides" />}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                    onChange={handlePrintSides}
                  >
                    {config["printSides"].map((printSide) => (
                      <MenuItem key={printSide.id} value={printSide.type}>
                        <Checkbox
                          checked={printSides.indexOf(printSide.type) > -1}
                        />
                        <ListItemText primary={printSide.type} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
            {config["paperSizes"]?.length > 0 && (
              <Grid item lg={3} md={4} sm={6} xs={12}>
                <FormControl sx={{ m: 1, width: "98%" }}>
                  <InputLabel>Paper Sizes</InputLabel>
                  <Select
                    multiple
                    value={paperSizes}
                    input={<OutlinedInput label="Paper Sizes" />}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                    onChange={handlePaperSizes}
                  >
                    {config["paperSizes"].map((printSize) => (
                      <MenuItem key={printSize.id} value={printSize.type}>
                        <Checkbox
                          checked={paperSizes.indexOf(printSize.type) > -1}
                        />
                        <ListItemText primary={printSize.type} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
            {config["paperTypes"]?.length > 0 && (
              <Grid item lg={3} md={4} sm={6} xs={12}>
                <FormControl sx={{ m: 1, width: "98%" }}>
                  <InputLabel>Paper Types</InputLabel>
                  <Select
                    multiple
                    value={paperTypes}
                    input={<OutlinedInput label="Paper Types" />}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                    onChange={handlePaperTypes}
                  >
                    {config["paperTypes"].map((paperType) => (
                      <MenuItem key={paperType.id} value={paperType.type}>
                        <Checkbox
                          checked={paperTypes.indexOf(paperType.type) > -1}
                        />
                        <ListItemText primary={paperType.type} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
            {config["orientations"]?.length > 0 && (
              <Grid item lg={3} md={4} sm={6} xs={12}>
                <FormControl sx={{ m: 1, width: "98%" }}>
                  <InputLabel>Orientation</InputLabel>
                  <Select
                    multiple
                    value={orientation}
                    input={<OutlinedInput label="Orientation" />}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                    onChange={handleOrientation}
                  >
                    {config["orientations"].map((orient) => (
                      <MenuItem key={orient.id} value={orient.type}>
                        <Checkbox
                          checked={orientation.indexOf(orient.type) > -1}
                        />
                        <ListItemText primary={orient.type} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
            {config["bindingTypes"]?.length > 0 && (
              <Grid item lg={3} md={4} sm={6} xs={12}>
                <FormControl sx={{ m: 1, width: "98%" }}>
                  <InputLabel>Binding Types</InputLabel>
                  <Select
                    multiple
                    value={bindingTypes}
                    input={<OutlinedInput label="Binding Types" />}
                    renderValue={(selected) => selected.join(", ")}
                    onChange={handleBindingType}
                    MenuProps={MenuProps}
                  >
                    {config["bindingTypes"].map((bindingType) => (
                      <MenuItem key={bindingType.id} value={bindingType.type}>
                        <Checkbox
                          checked={bindingTypes.indexOf(bindingType.type) > -1}
                        />
                        <ListItemText primary={bindingType.type} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
            <Grid
              item
              lg={3}
              md={4}
              sm={6}
              xs={12}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Button
                startIcon={<ClearIcon />}
                variant="contained"
                sx={{ m: 1, width: "50%", margin: "auto" }}
                onClick={() => {
                  setBindingTypes([]);
                  setPaperSizes([]);
                  setPrintTypes([]);
                  setPrintSides([]);
                  setPaperTypes([]);
                  setOrientation([]);
                }}
              >
                Clear All
              </Button>
            </Grid>
          </Grid>
          <Box sx={{ marginLeft: "2%" }}>
            {filteredData?.map((combination, indexi) => {
              return (
                <Card
                  sx={{
                    width: "98%",
                    p: 1,
                    mb: 2,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                  key={indexi}
                >
                  <Grid
                    container
                    sx={{ justifyContent: "space-between", width: "80%" }}
                  >
                    {Object.keys(combination).map((combi, indexj) => {
                      if (!combination[combi] || combi === "id") return null;
                      return (
                        <Grid item ml={3} key={indexj}>
                          <Typography
                            variant="overline"
                            sx={{
                              fontSize: 15,
                              color: "grey",
                              fontWeight: "medium",
                            }}
                            key={`combi${combination.id}`}
                          >
                            {convertString(combi)}
                          </Typography>
                          <Typography variant="body2" textAlign={"center"}>
                            {combination[combi].type
                              ? combination[combi]?.type
                              : combination[combi]}
                          </Typography>
                        </Grid>
                      );
                    })}
                  </Grid>
                  <Grid
                    container
                    sx={{
                      width: "15%",
                      alignItems: "center",
                      justifyContent: "right",
                      px: 1,
                    }}
                    spacing={1}
                  >
                    {combination["id"] !== null ? (
                      <>
                        <Grid item lg={6} md={12}>
                          <Button
                            variant="contained"
                            color="info"
                            onClick={onUpdateAction(indexi)}
                          >
                            Edit
                          </Button>
                        </Grid>
                        <Grid item lg={6} md={12}>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={onOrderDelete(indexi)}
                          >
                            Delete
                          </Button>
                        </Grid>
                      </>
                    ) : (
                      <Grid item lg={6} md={12}>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={onAddAction(indexi)}
                        >
                          Add
                        </Button>
                      </Grid>
                    )}
                  </Grid>
                </Card>
              );
            })}
          </Box>
        </>
      )}
    </Box>
  );
};

export default Service;
