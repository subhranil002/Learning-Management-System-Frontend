import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const safeParse = (item, defaultValue) => {
    try {
        return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
        return defaultValue;
    }
};

const initialState = {
    isLoggedIn: safeParse(sessionStorage.getItem("isLoggedIn"), false),
    role: sessionStorage.getItem("role") || "GUEST", 
    data: safeParse(sessionStorage.getItem("data"), { _: "" }),
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

export const getProfile = createAsyncThunk("auth/me", async () => {
    try {
        const res = await axiosInstance.get("/user/me");
        return res.data;
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
                state.isLoggedIn = action.payload?.success;
                state.role = action.payload?.user?.role;
                state.data = action.payload?.user;
                sessionStorage.setItem(
                    "isLoggedIn",
                    JSON.stringify(action.payload?.success)
                );
                sessionStorage.setItem("role", action.payload?.user?.role);
                sessionStorage.setItem(
                    "data",
                    JSON.stringify(action.payload?.user)
                );
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload?.success;
                state.role = action.payload?.user?.role;
                state.data = action.payload?.user;
                sessionStorage.setItem(
                    "isLoggedIn",
                    JSON.stringify(action.payload?.success)
                );
                sessionStorage.setItem("role", action.payload?.user?.role);
                sessionStorage.setItem(
                    "data",
                    JSON.stringify(action.payload?.user)
                );
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoggedIn = false;
                state.role = "GUEST";
                state.data = {};
                sessionStorage.setItem("isLoggedIn", JSON.stringify(false));
                sessionStorage.setItem("role", "GUEST");
                sessionStorage.setItem("data", JSON.stringify({ _: "" }));
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload?.success;
                state.role = action.payload?.user?.role;
                state.data = action.payload?.user;
                sessionStorage.setItem(
                    "isLoggedIn",
                    JSON.stringify(action.payload?.success)
                );
                sessionStorage.setItem("role", action.payload?.user?.role);
                sessionStorage.setItem(
                    "data",
                    JSON.stringify(action.payload?.user)
                );
            });
    },
});

export default AuthSlice;
