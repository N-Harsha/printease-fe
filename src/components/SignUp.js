import {
    Avatar,
    Box,
    Button,
    Container,
    Grid,
    Link,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "./../images/logo.png";
import LinearProgress from "@mui/material/LinearProgress";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector from "@mui/material/StepConnector";
import ErrorIcon from '@mui/icons-material/Error';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

const LoginPaper = styled(Paper)`
    max-width: 380px;
    height: fit-content;
    padding: 80px 40px 30px;
    margin: 120px auto;
    position: relative;
`;

const SignUp = () => {
    const {
        register,
        handleSubmit,
        formState: { errors,isValid },
    } = useForm({
        defaultValues: {    
            name: "",
            email: "",
        },
    });
    const [activeStep, setActiveStep] = useState(0);
    const [value, setValue] = useState(0);
    function getPersonalDetails() {
        return (
            <>
                <TextField
                    size="small"
                    error={errors.hasOwnProperty("name")}
                    helperText={
                        errors.hasOwnProperty("name") ? "Enter valid name" : ""
                    }
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    autoComplete="name"
                    variant="filled"
                    key="name"
                    autoFocus
                    {...register("name", {
                        required: true,
                        pattern: /^[a-z A-Z]+$/,
                    })}
                />
                <TextField
                    size="small"
                    error={errors.hasOwnProperty("email")}
                    helperText={
                        errors.hasOwnProperty("email")
                            ? "Enter valid email"
                            : ""
                    }
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    autoComplete="email"
                    variant="filled"
                    key="email"
                    {...register("email", {
                        required: true,
                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    })}
                />
                <TextField
                    size="small"
                    error={errors.hasOwnProperty("phoneNumber")}
                    helperText={
                        errors.hasOwnProperty("phoneNumber")
                            ? "Enter valid Phone Number"
                            : ""
                    }
                    margin="normal"
                    required
                    fullWidth
                    id="PhoneNumber"
                    label="Phone Number"
                    autoComplete="Phone Number"
                    variant="filled"
                    key="phoneNumber"
                    type="text"
                    {...register("phoneNumbr", {
                        required: true,
                        minLength: 10,
                    })}
                />
                <TextField
                    size="small"
                    error={errors.hasOwnProperty("password")}
                    helperText={
                        errors.hasOwnProperty("password")
                            ? "Enter valid Password"
                            : ""
                    }
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    autoComplete="password"
                    variant="filled"
                    key="password"
                    type="text"
                    {...register("password", {
                        required: true,
                        minLength: 8,
                    })}
                />
                <TextField
                    size="small"
                    error={errors.hasOwnProperty("bussinessName")}
                    helperText={
                        errors.hasOwnProperty("bussinessName")
                            ? "Enter valid Bussiness Name"
                            : ""
                    }
                    margin="normal"
                    required
                    fullWidth
                    id="bussinessName"
                    label="Bussiness Name"
                    autoComplete="Bussiness Name"
                    variant="filled"
                    type="text"
                    key="bussinessName"
                    {...register("bussinessName", {
                        required: true,
                        minLength: 8,
                    })}
                />
                <TextField
                    size="small"
                    error={errors.hasOwnProperty("gstIn")}
                    helperText={
                        errors.hasOwnProperty("gstIn")
                            ? "Enter valid Gst Number"
                            : ""
                    }
                    margin="normal"
                    key="gstIn"
                    required
                    fullWidth
                    id="gstIn"
                    label="Gst Number"
                    autoComplete="gstIn"
                    variant="filled"
                    type="text"
                    {...register("gstIn", {
                        required: true,
                        minLength: 8,
                    })}
                />
            </>
        );
    }
    function getBussinessDetails() {
        return (
            <>
                <TextField
                    size="small"
                    error={errors.hasOwnProperty("addressLine1")}
                    helperText={
                        errors.hasOwnProperty("addressLine1")
                            ? "Enter valid address"
                            : ""
                    }
                    margin="normal"
                    required
                    fullWidth
                    key="AddressLine1"
                    id="addressLane1"
                    label="Address Line 1"
                    autoComplete="address"
                    variant="filled"
                    type="text"
                    {...register("addressLine1", {
                        required: true,
                        minLength: 8,
                    })}
                />
                <TextField
                    size="small"
                    margin="normal"
                    fullWidth
                    id="addressLine2"
                    key="addressLine2"
                    label="Address Line 2 "
                    autoComplete="address"
                    variant="filled"
                    type="text"
                    {...register("addressLine2", {
                        required: false,
                        minLength: 8,
                    })}
                />
                <TextField
                    size="small"
                    error={errors.hasOwnProperty("pincode")}
                    helperText={
                        errors.hasOwnProperty("pincode")
                            ? "Enter valid address"
                            : ""
                    }
                    margin="normal"
                    required
                    fullWidth
                    key="pincode"
                    id="pincode"
                    label="Pin Code"
                    autoComplete="PinCode"
                    variant="filled"
                    type="text"
                    {...register("pincode", {
                        required: true,
                        minLength: 6,
                    })}
                />
                <TextField
                    size="small"
                    error={errors.hasOwnProperty("state")}
                    helperText={
                        errors.hasOwnProperty("state")
                            ? "Enter valid address"
                            : ""
                    }
                    margin="normal"
                    required
                    fullWidth
                    id="state"
                    key="state"
                    label="State"
                    autoComplete="state"
                    variant="filled"
                    type="text"
                    {...register("state", {
                        required: true,
                        minLength: 6,
                    })}
                />
            </>
        );
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleNext = () => {
        handleSubmit(onSubmit);
        if(Object.keys(errors).length!=0){
            console.log("kfsabuhfis");
            return;
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const onSubmit = (data) => {
        console.log(errors);
        console.log(data);
    }
    const steps = ["Enter Bussiness Details", "Enter Address"];
    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            "aria-controls": `simple-tabpanel-${index}`,
        };
    }
    return (
        <Container>
            <Box>
                <LoginPaper
                    elevation={3}
                    //sx={{ maxWidth: `${value === 1 ? "520px" : "320px"}` }}
                >
                    <Box sx={{ width: "100%" }}>
                        <Typography
                            component="h1"
                            variant="h4"
                            sx={{ mb: 2, textAlign: "center" }}
                        >
                            Sign Up
                        </Typography>
                        <Box
                            sx={{
                                borderBottom: 1,
                                borderColor: "divider",
                                display: "flex",
                                justifyContent: "space-evenly",
                            }}
                        >
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                aria-label="basic tabs example"
                            >
                                <Tab label="Customer" {...a11yProps(0)} />
                                <Tab
                                    label="Service Provider"
                                    {...a11yProps(1)}
                                />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <Box
                                component="form"
                                onSubmit={handleSubmit(onSubmit)}
                                noValidate
                            >
                                <Avatar
                                    src={logo}
                                    sx={{
                                        position: "absolute",
                                        top: "-60px",
                                        left: "calc(50% - 60px)",
                                        width: "120px",
                                        height: "120px",
                                    }}
                                ></Avatar>
                                <TextField
                                    size="small"
                                    error={errors.hasOwnProperty("name")}
                                    helperText={
                                        errors.hasOwnProperty("name")
                                            ? "Enter valid name"
                                            : ""
                                    }
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    autoComplete="name"
                                    variant="filled"
                                    autoFocus
                                    {...register("name", {
                                        required: true,
                                        pattern: /^[a-z A-Z]+$/,
                                    })}
                                />
                                <TextField
                                    size="small"
                                    error={errors.hasOwnProperty("email")}
                                    helperText={
                                        errors.hasOwnProperty("email")
                                            ? "Enter valid email"
                                            : ""
                                    }
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    autoComplete="email"
                                    variant="filled"
                                    {...register("email", {
                                        required: true,
                                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    })}
                                />
                                <TextField
                                    size="small"
                                    error={errors.hasOwnProperty("phoneNumber")}
                                    helperText={
                                        errors.hasOwnProperty("phoneNumber")
                                            ? "Enter valid Phone Number"
                                            : ""
                                    }
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="PhoneNumber"
                                    label="Phone Number"
                                    autoComplete="Phone Number"
                                    variant="filled"
                                    type="text"
                                    {...register("phoneNumber", {
                                        required: true,
                                        minLength: 10,
                                    })}
                                />
                                <TextField
                                    size="small"
                                    error={errors.hasOwnProperty("password")}
                                    helperText={
                                        errors.hasOwnProperty("password")
                                            ? "Enter valid Password"
                                            : ""
                                    }
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="password"
                                    label="Password"
                                    autoComplete="password"
                                    variant="filled"
                                    type="text"
                                    {...register("password", {
                                        required: true,
                                        minLength: 8,
                                    })}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 6, mb: 0, height: "50px" }}
                                >
                                    Sign Up
                                </Button>
                                <Grid
                                    container
                                    sx={{
                                        justifyContent: "space-between",
                                        mt: 3,
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        component="span"
                                    >
                                        already have an account?
                                    </Typography>
                                    <Link href="#" underline="hover">
                                        Log In
                                    </Link>
                                </Grid>
                            </Box>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <Stepper
                                activeStep={activeStep}
                                connector={<StepConnector />}
                            >
                                {steps.map((label, index) => {
                                    const stepProps = {};
                                    const labelProps = {};
                                    if(activeStep==index){
                                        if(Object.keys(errors).length!=0) {
                                            labelProps.icon = <ErrorIcon/>
                                        }
                                    }
                                    return (
                                        <Step key={label} {...stepProps} >
                                            <StepLabel {...labelProps} color="red" 
                                        
                                            >
                                                {label}
                                            </StepLabel>
                                        </Step>
                                    );
                                })}
                            </Stepper>
                            <Box
                                component="form"
                                onSubmit={handleSubmit(onSubmit)}
                                noValidate
                                mt={2}
                            >
                                <Avatar
                                    src={logo}
                                    sx={{
                                        position: "absolute",
                                        top: "-60px",
                                        left: "calc(50% - 60px)",
                                        width: "120px",
                                        height: "120px",
                                    }}
                                ></Avatar>
                                {activeStep === 0
                                    ? getPersonalDetails()
                                    : getBussinessDetails()}
                                <Grid
                                    container
                                    justifyContent="space-between"
                                    mt={3}
                                >
                                    <Grid item>
                                        <Button
                                            disabled={!(activeStep === 1)}
                                            variant="contained"
                                            onClick={handleBack}
                                        >
                                            Back
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        {activeStep === 0 ? (
                                            <Button
                                                variant="contained"
                                                onClick={handleNext}
                                                key="NextButton"
                                            >Next</Button>
                                        ) : (
                                            <Button
                                                variant="contained"
                                                onClick={handleSubmit(onSubmit)}
                                                key="signUpButton"
                                            >Sign Up</Button>
                                        )}
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    sx={{
                                        justifyContent: "space-between",
                                        mt: 3,
                                    }}
                                >
                                    <Typography variant="body2">
                                        already have an account?
                                    </Typography>
                                    <Link href="#" underline="hover">
                                        Log In
                                    </Link>
                                </Grid>
                            </Box>
                        </TabPanel>
                    </Box>
                </LoginPaper>
            </Box>
        </Container>
    );
};

export default SignUp;
