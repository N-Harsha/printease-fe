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
import { useForm } from "react-hook-form";
import LinearProgress from "@mui/material/LinearProgress";
import { useMutation } from "react-query";
import { api } from "../utils/APIMethods";
import { loginApi } from "../constants";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import MuiAlert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const LoginPaper = styled(Paper)`
    max-width: 380px;
    height: fit-content;
    padding: 80px 40px 30px;
    margin: 120px auto;
    position: relative;
`;
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isDirty },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const [open, setOpen] = useState(false);

    const { mutate, isLoading } = useMutation("LoginMutatation", {
        mutationFn: (body) => {
            api({ loginApi, method: "POST", body: body });
        },
        onSuccess: () => {},
        onError: (error) => {
            console.log(error);
        },
    });

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = (data) => {
        setOpen(true);
        //mutate(data);
    };

    return (
        <>
            {isLoading && <LinearProgress />}
            <Snackbar
                autoHideDuration={1400}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={open}
                onClose={() => setOpen(false)}
                message="I love snacks"
                key={"top" + "center"}
            >
                    <Alert
                        severity="success"
                        sx={{ width: "100%" }}
                        icon={<CheckIcon fontSize="inherit" />}
                    >
                        This is a success message!
                    </Alert>
            </Snackbar>
            <Container>
                <LoginPaper elevation={3}>
                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                    >
                        <Typography
                            component="h1"
                            variant="h4"
                            sx={{ mb: 2, textAlign: "center" }}
                        >
                            Log in
                        </Typography>

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
                            autoFocus
                            {...register("email", {
                                required: true,
                                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            })}
                        />
                        <TextField
                            error={errors.hasOwnProperty("password")}
                            helperText={
                                errors.hasOwnProperty("password")
                                    ? "Enater valid Password"
                                    : ""
                            }
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="Password"
                            autoComplete="password"
                            variant="filled"
                            type="password"
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
                            disabled={isLoading}
                        >
                            Log In
                        </Button>
                        <Grid
                            container
                            sx={{ justifyContent: "space-between", mt: 3 }}
                        >
                            <Typography variant="body2">
                                Don`t have an account?
                            </Typography>
                            <Link href="#" underline="hover">
                                Sign Up
                            </Link>
                        </Grid>
                    </Box>
                </LoginPaper>
            </Container>
        </>
    );
};

export default Login;
