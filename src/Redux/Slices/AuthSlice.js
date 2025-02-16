import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    isLoggedIn: localStorage.getItem("isLoggedIn") || false,
    role: localStorage.getItem("role") || "",
    data: localStorage.getItem("data") || {},
};

export const signUp = createAsyncThunk("/auth/signup", async (formData) => {
    try {
        const res = axiosInstance.post("/user/register", formData);
        toast.promise(res, {
            loading: "Wait! creating your account",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to SignUp",
        });
        return (await res).data;
    } catch (error) {
        console.log(error.message);
    }
});

export const login = createAsyncThunk("/auth/login", async (formData) => {
    try {
        const res = axiosInstance.post("/user/login", formData);
        toast.promise(res, {
            loading: "Wait! logging in...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to Login",
        });
        return (await res).data;
    } catch (error) {
        console.log(error.message);
    }
});

export const logout = createAsyncThunk("auth/logout", async () => {
    try {
        const res = axiosInstance.get("/user/logout");
        toast.promise(res, {
            loading: "Wait! logging out...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to Logout",
        });
    } catch (error) {
        console.log(error.message);
    }
});

const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signUp.fulfilled, (state, action) => {
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("role", action?.payload?.user?.role);
                localStorage.setItem(
                    "data",
                    JSON.stringify(action?.payload?.user)
                );
                state.isLoggedIn = true;
                state.role = action.payload?.user?.role;
                state.data = action.payload?.user;
            })
            .addCase(login.fulfilled, (state, action) => {
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("role", action?.payload?.user?.role);
                localStorage.setItem(
                    "data",
                    JSON.stringify(action?.payload?.user)
                );
                state.isLoggedIn = true;
                state.role = action.payload?.user?.role;
                state.data = action.payload?.user;
            })
            .addCase(logout.fulfilled, (state) => {
                localStorage.setItem("isLoggedIn", false);
                localStorage.setItem("role", "");
                localStorage.setItem("data", {});
                state.isLoggedIn = false;
                state.role = "";
                state.data = {};
            });
    },
});

export default AuthSlice;
