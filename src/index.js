import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./features/store";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { primaryColor } from "./constants";
import { QueryClient, QueryClientProvider } from "react-query";

const theme = createTheme({
    palette: {
        primary: {
          main:primaryColor,
          contrastText:"white"
        },
    },
});

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <React.StrictMode>
                    <App />
                </React.StrictMode>
            </QueryClientProvider>
        </ThemeProvider>
    </Provider>
);
