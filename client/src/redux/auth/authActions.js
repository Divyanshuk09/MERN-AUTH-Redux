import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

axios.defaults.withCredentials = true;

const BASE_URL = import.meta.env.VITE_BACKEND_URI || "http://localhost:5000/api";


//register and auto-login
export const registerUser = createAsyncThunk('auth/register', async (data, thunkAPI) => {
    try {
        const res = await axios.post(`${BASE_URL}/auth/register`, data);
        return {
            accessToken: res.data.accessToken,
            user: res.data.user
        };
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
});

export const loginUser = createAsyncThunk('auth/login', async (data, thunkAPI) => {
    try {
        const res = await axios.post(`${BASE_URL}/auth/login`, data);
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
})

export const logoutUser = createAsyncThunk("auth/logout", async () => {
    await axios.post(`${BASE_URL}/auth/logout`);
});

export const refreshAccessToken = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
    try {
        const res = await axios.get(`${BASE_URL}/auth/refresh-token`);
        return {
            accessToken: res.data.accessToken,
            user: res.data.user
        };
    } catch (error) {
        // Clear local storage if refresh fails
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        return thunkAPI.rejectWithValue("Session Expired");
    }
}
);