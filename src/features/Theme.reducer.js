import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLightTheme: JSON.parse(localStorage.getItem("isLightTheme") ?? "true"),
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state, action) {
      state.isLightTheme = !state.isLightTheme;
      localStorage.setItem("isLightTheme", state.isLightTheme);
      return state;
    },
  },
});

export const selectIsLightTheme = (state) => state.theme.isLightTheme;

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
