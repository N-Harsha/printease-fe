import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { api } from "../utils/APIMethods";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllServicesApi, getAssociatedServicesApi } from "../constants";
import { auth } from "../features/Login.reducer";
import {
    Box,
    Button,
    FormControl,
    Grid,
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
   
    const { isLoading: cardsLoading, data: combinations } = useQuery(
        "configCombinationQuery",
        {
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


    return (
        <Box>
            {isLoading||cardsLoading ? (
                <LinearProgress />
            ) : (
                <>
                    <Box m={3} mt={1}>
                        {config["printTypes"]?.length > 0 && (
                            <FormControl sx={{ m: 1, width: "23.8%" }}>
                                <InputLabel>Print Types </InputLabel>
                                <Select
                                    labelId="demo-multiple-checkbox-label"
                                    multiple
                                    value={printTypes}
                                    input={
                                        <OutlinedInput label="Print Types" />
                                    }
                                    renderValue={(selected) =>
                                        selected.join(", ")
                                    }
                                    MenuProps={MenuProps}
                                    onChange={handlePrintTypes}
                                >
                                    {config["printTypes"].map((printType) => (
                                        <MenuItem
                                            key={printType.id}
                                            value={printType.type}
                                        >
                                            <Checkbox
                                                checked={
                                                    printTypes.indexOf(
                                                        printType.type
                                                    ) > -1
                                                }
                                            />
                                            <ListItemText
                                                primary={printType.type}
                                            />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                        {config["printSides"]?.length > 0 && (
                            <FormControl sx={{ m: 1, width: "23.8%" }}>
                                <InputLabel>Print Sides</InputLabel>
                                <Select
                                    multiple
                                    value={printSides}
                                    input={
                                        <OutlinedInput label="Print Sides" />
                                    }
                                    renderValue={(selected) =>
                                        selected.join(", ")
                                    }
                                    MenuProps={MenuProps}
                                    onChange={handlePrintSides}
                                >
                                    {config["printSides"].map((printSide) => (
                                        <MenuItem
                                            key={printSide.id}
                                            value={printSide.type}
                                        >
                                            <Checkbox
                                                checked={
                                                    printSides.indexOf(
                                                        printSide.type
                                                    ) > -1
                                                }
                                            />
                                            <ListItemText
                                                primary={printSide.type}
                                            />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                        {config["paperSizes"]?.length > 0 && (
                            <FormControl sx={{ m: 1, width: "23.8%" }}>
                                <InputLabel>Paper Sizes</InputLabel>
                                <Select
                                    multiple
                                    value={paperSizes}
                                    input={
                                        <OutlinedInput label="Paper Sizes" />
                                    }
                                    renderValue={(selected) =>
                                        selected.join(", ")
                                    }
                                    MenuProps={MenuProps}
                                    onChange={handlePaperSizes}
                                >
                                    {config["paperSizes"].map((printSize) => (
                                        <MenuItem
                                            key={printSize.id}
                                            value={printSize.type}
                                        >
                                            <Checkbox
                                                checked={
                                                    paperSizes.indexOf(
                                                        printSize.type
                                                    ) > -1
                                                }
                                            />
                                            <ListItemText
                                                primary={printSize.type}
                                            />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                        {config["paperTypes"]?.length > 0 && (
                            <FormControl sx={{ m: 1, width: "23.8%" }}>
                                <InputLabel>Paper Types</InputLabel>
                                <Select
                                    multiple
                                    value={paperTypes}
                                    input={
                                        <OutlinedInput label="Paper Types" />
                                    }
                                    renderValue={(selected) =>
                                        selected.join(", ")
                                    }
                                    MenuProps={MenuProps}
                                    onChange={handlePaperTypes}
                                >
                                    {config["paperTypes"].map((paperType) => (
                                        <MenuItem
                                            key={paperType.id}
                                            value={paperType.type}
                                        >
                                            <Checkbox
                                                checked={
                                                    paperTypes.indexOf(
                                                        paperType.type
                                                    ) > -1
                                                }
                                            />
                                            <ListItemText
                                                primary={paperType.type}
                                            />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                        {config["orientations"]?.length > 0 && (
                            <FormControl sx={{ m: 1, width: "23.8%" }}>
                                <InputLabel>Orientation</InputLabel>
                                <Select
                                    multiple
                                    value={orientation}
                                    input={
                                        <OutlinedInput label="Orientation" />
                                    }
                                    renderValue={(selected) =>
                                        selected.join(", ")
                                    }
                                    MenuProps={MenuProps}
                                    onChange={handleOrientation}
                                >
                                    {config["orientations"].map((orient) => (
                                        <MenuItem
                                            key={orient.id}
                                            value={orient.type}
                                        >
                                            <Checkbox
                                                checked={
                                                    orientation.indexOf(
                                                        orient.type
                                                    ) > -1
                                                }
                                            />
                                            <ListItemText
                                                primary={orient.type}
                                            />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                        {config["bindingTypes"]?.length > 0 && (
                            <FormControl sx={{ m: 1, width: "23.8%" }}>
                                <InputLabel>Binding Types</InputLabel>
                                <Select
                                    multiple
                                    value={bindingTypes}
                                    input={
                                        <OutlinedInput label="Binding Types" />
                                    }
                                    renderValue={(selected) =>
                                        selected.join(", ")
                                    }
                                    onChange={handleBindingType}
                                    MenuProps={MenuProps}
                                >
                                    {config["bindingTypes"].map(
                                        (bindingType) => (
                                            <MenuItem
                                                key={bindingType.id}
                                                value={bindingType.type}
                                            >
                                                <Checkbox
                                                    checked={
                                                        bindingTypes.indexOf(
                                                            bindingType.type
                                                        ) > -1
                                                    }
                                                />
                                                <ListItemText
                                                    primary={bindingType.type}
                                                />
                                            </MenuItem>
                                        )
                                    )}
                                </Select>
                            </FormControl>
                        )}
                    </Box>
                    <Box sx={{ marginLeft: "2%" }}>
                        {filteredData?.map((combination) => {
                            return (
                                <Card
                                    sx={{
                                        width: "98%",
                                        p: 1,
                                        mb: 2,
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                    key={`Card${combination.id}`}
                                >
                                    <Grid
                                        container
                                        sx={{
                                            width: "80%",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        {Object.keys(combination).map(
                                            (combi) => {
                                                if (!combination[combi])
                                                    return null;
                                                return (
                                                    <Grid item mx={3}>
                                                        <Typography
                                                            variant="overline"
                                                            sx={{
                                                                fontSize: 15,
                                                                color: "grey",
                                                                fontWeight:
                                                                    "medium",
                                                            }}
                                                            key={`combi${combination.id}`}
                                                        >
                                                            {convertString(
                                                                combi
                                                            )}
                                                        </Typography>
                                                        <Typography variant="body2">
                                                            {
                                                                combination[
                                                                    combi
                                                                ]?.type
                                                            }
                                                        </Typography>
                                                    </Grid>
                                                );
                                            }
                                        )}
                                    </Grid>
                                    <Box>
                                        <Button
                                            variant="contained"
                                            sx={{ m: 2 }}
                                            color="edit"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="contained"
                                            sx={{ m: 2 }}
                                            color="error"
                                        >
                                            Delete
                                        </Button>
                                    </Box>
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
