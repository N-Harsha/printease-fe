import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Login.reducer";
import ThemeReducer from "./Theme.reducer";

const store = configureStore({
  name: "main",
  reducer: {
    user: userReducer,
    theme: ThemeReducer,
  },
});

export default store;
