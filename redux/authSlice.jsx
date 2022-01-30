import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: "",
    password: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.password = action.payload.password;
            state.username = action.payload.username;
        },
        logout: (state, action) => {
            state.password = "";
            state.username = "";
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
