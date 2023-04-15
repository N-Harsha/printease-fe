import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
    token: localStorage.getItem("token") ?? "",
    email: localStorage.getItem("email") ?? "",
    role: localStorage.getItem("role") ?? "",
    name: localStorage.getItem("name") ?? "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login(state, action) {
            console.log(action);
            state.token = action.payload.token;
            state.name = action.payload.name;
            state.role = action.payload.role;
            state.email = action.payload.email;
            localStorage.setItem("token",action.payload.token);
            localStorage.setItem("name",action.payload.name);
            localStorage.setItem("role",action.payload.role);
            localStorage.setItem("email", action.payload.email);
            return state;
        },
        logout(state, action) {
            localStorage.removeItem("token");
            localStorage.removeItem("name");
            localStorage.removeItem("role");
            localStorage.removeItem("email");
            state.token = "";
            state.name = "";
            state.role = "";
            state.email = "";
            return state;
        },
    },
});

export const { login, logout } = userSlice.actions;
export const auth = (state) => state.user;
export const isLoggedIn = (state) => !(state.user.token.length===0); 
export default userSlice.reducer;
