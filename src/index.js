import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./features/store";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { primaryColor } from "./constants";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
    palette: {
        primary: {
            main: primaryColor,
            contrastText: "white",
        },
        delete: createColor("#F40B27"),
        edit: createColor("#ffc107"),
    },
});

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 3,
        },
    },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <React.StrictMode>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </React.StrictMode>
            </QueryClientProvider>
        </ThemeProvider>
    </Provider>
);
