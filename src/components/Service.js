import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { api } from "../utils/APIMethods";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllServicesApi } from "../constants";
import { auth } from "../features/Login.reducer";
import { Box, LinearProgress } from "@mui/material";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";

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

const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
];
const Service = () => {
    const params = useParams();
    const user = useSelector(auth);
    const [personName, setPersonName] = useState([]);
    const [selectedConfig, setSelectedConfig] = useState({});
    const [headings, setHeadings] = useState([]);
    const [bindingTypes, setBindingTypes] = useState([]);
    const [printSizes, setprintSizes] = useState([]);
    const [printTypes, setprintTypes] = useState([]);
    const [printSides, setprintSides] = useState([]);
    const [paperTypes, setpaperTypes] = useState([]);
    const [orientation , setorientation ] = useState([]);
    const serviceId = params.id;
    const [data, setData] = useState({});
    const {
        isLoading,
        data: config,
        refetch,
    } = useQuery("configQuery", {
        queryFn: () => api({ url: `${getAllServicesApi}/${serviceId}` }, user),
        onError: (error) => {
            console.log(error);
        },
        onSuccess: (data) => {
            console.log(data);
            setData(data);
        },
    });
    // console.log(config.printTypes);
   return (
       <Box>
           {isLoading ? (
               <LinearProgress />
           ) : (
               <>
                   {config["printTypes"]?.length > 0 && (
                       <Select
                           multiple
                           value={printTypes}
                           input={<OutlinedInput label="Print Types" />}
                           renderValue={(selected) => selected.join(", ")}
                           MenuProps={MenuProps}
                       >
                           {config["printTypes"].map((printType) => (
                               <MenuItem
                                   key={printType.id}
                                   value={printType.type}
                               >
                                   <Checkbox
                                       checked={
                                           printTypes.indexOf(printType.type) >
                                           -1
                                       }
                                   />
                                   <ListItemText primary={printType.type} />
                               </MenuItem>
                           ))}
                       </Select>
                   )}
                   {config["printSides"]?.length > 0 && (
                       <Select
                           multiple
                           value={printSides}
                           input={<OutlinedInput label="Print Sizes" />}
                           renderValue={(selected) => selected.join(", ")}
                           MenuProps={MenuProps}
                       >
                           {config["printSides"].map((printSide) => (
                               <MenuItem
                                   key={printSide.id}
                                   value={printSide.type}
                               >
                                   <Checkbox
                                       checked={
                                           printSides.indexOf(printSide.type) >
                                           -1
                                       }
                                   />
                                   <ListItemText primary={printSide.type} />
                               </MenuItem>
                           ))}
                       </Select>
                   )}
                   {config["printSizes"]?.length > 0 && (
                       <Select
                           multiple
                           value={printSizes}
                           input={<OutlinedInput label="Print Sizes" />}
                           renderValue={(selected) => selected.join(", ")}
                           MenuProps={MenuProps}
                       >
                           {config["printSizes"].map((printSize) => (
                               <MenuItem
                                   key={printSize.id}
                                   value={printSize.type}
                               >
                                   <Checkbox
                                       checked={
                                           printSizes.indexOf(printSize.type) >
                                           -1
                                       }
                                   />
                                   <ListItemText primary={printSize.type} />
                               </MenuItem>
                           ))}
                       </Select>
                   )}
                   {config["paperTypes"]?.length > 0 && (
                       <Select
                           multiple
                           value={paperTypes}
                           input={<OutlinedInput label="Print Sizes" />}
                           renderValue={(selected) => selected.join(", ")}
                           MenuProps={MenuProps}
                       >
                           {config["paperTypes"].map((paperType) => (
                               <MenuItem
                                   key={paperType.id}
                                   value={paperType.type}
                               >
                                   <Checkbox
                                       checked={
                                           paperTypes.indexOf(paperType.type) >
                                           -1
                                       }
                                   />
                                   <ListItemText primary={paperType.type} />
                               </MenuItem>
                           ))}
                       </Select>
                   )}
                   {config["orientation"]?.length > 0 && (
                       <Select
                           multiple
                           value={orientation}
                           input={<OutlinedInput label="Print Sides" />}
                           renderValue={(selected) => selected.join(", ")}
                           MenuProps={MenuProps}
                       >
                           {config["orientation"].map((orient) => (
                               <MenuItem key={orient.id} value={orient.type}>
                                   <Checkbox
                                       checked={
                                           orientation.indexOf(orient.type) > -1
                                       }
                                   />
                                   <ListItemText primary={orient.type} />
                               </MenuItem>
                           ))}
                       </Select>
                   )}
                   {config["bindingTypes"]?.length > 0 && (
                       <Select
                           multiple
                           value={bindingTypes}
                           input={<OutlinedInput label="Binding Types" />}
                           renderValue={(selected) => selected.join(", ")}
                           MenuProps={MenuProps}
                       >
                           {config["bindingTypes"].map((bindingType) => (
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
                                   <ListItemText primary={bindingType.type} />
                               </MenuItem>
                           ))}
                       </Select>
                   )}
               </>
           )}
       </Box>
   );

};

export default Service;
