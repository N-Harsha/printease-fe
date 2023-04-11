import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: "",
    email: "",
    role: "",
    name: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login(state, action) {
            state.token = action.payload.token;
            state.name = action.payload.name;
            state.role = action.payload.role;
            state.email = action.payload.email;
            return state;
        },
        logout(state, action) {
            state.token = "";
            state.name = "";
            state.role = "";
            state.email = "";
            return state;
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
