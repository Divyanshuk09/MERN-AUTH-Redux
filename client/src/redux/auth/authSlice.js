import { createSlice } from "@reduxjs/toolkit";
import { logoutUser, loginUser, registerUser, refreshAccessToken } from "./authActions.js";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user:null,
        accessToken: localStorage.getItem('accessToken') || null,
        refreshToken: localStorage.getItem('refreshToken') || null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //Register
            .addCase(registerUser.fulfilled, (state, action) => {
                state.accessToken = action.payload.accessToken;
                state.user = action.payload.user;
                state.loading = false;
              })
              
              // Login
              .addCase(loginUser.fulfilled, (state, action) => {
                state.accessToken = action.payload.accessToken;
                state.user = action.payload.user;
                state.loading = false;
              })
        
              // Refresh Token
              .addCase(refreshAccessToken.fulfilled, (state, action) => {
                state.accessToken = action.payload.accessToken;
                state.user = action.payload.user;
                state.loading = false;
              })
        
              // Logout
              .addCase(logoutUser.fulfilled, (state) => {
                state.accessToken = null;
                state.user = null;
              });
          }
        });

export default authSlice.reducer;