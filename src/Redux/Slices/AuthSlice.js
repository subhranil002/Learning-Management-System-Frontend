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

export const signUp = createAsyncThunk("/auth/signup", async (data) => {
    try {
        const accountRes = axiosInstance.post("/users/register", data);
        toast.promise(accountRes, {
            loading: "Wait! creating your account...",
        });
        await accountRes;
        const avatar = new FormData();
        avatar.append("avatar", data.file[0]);
        const avatarRes = axiosInstance.post("/users/change-avatar", avatar);
        toast.promise(avatarRes, {
            loading: "Wait! uploading your avatar...",
        });
        await avatarRes;
        const res = axiosInstance.get("/users/profile");
        toast.promise(res, {
            success: "User registered successfully!",
        });
        return (await res).data;
    } catch (error) {
        if (error?.response?.data?.message) {
            toast.error(error?.response?.data?.message);
        } else {
            console.log(error.message);
        }
    }
});

export const login = createAsyncThunk("/auth/login", async (formData) => {
    try {
        const res = axiosInstance.post("/users/login", formData);
        toast.promise(res, {
            loading: "Wait! logging in...",
            success: (data) => {
                return data?.data?.message;
            },
        });
        return (await res).data;
    } catch (error) {
        if (error?.response?.data?.message) {
            toast.error(error?.response?.data?.message);
        } else {
            console.log(error.message);
        }
    }
});

export const logout = createAsyncThunk("/auth/logout", async () => {
    try {
        const res = axiosInstance.get("/users/logout");
        toast.promise(res, {
            loading: "Wait! logging out...",
            success: (data) => {
                return data?.data?.message;
            },
        });
    } catch (error) {
        if (error?.response?.data?.message) {
            toast.error(error?.response?.data?.message);
        } else {
            console.log(error.message);
        }
    }
});

export const getProfile = createAsyncThunk("/auth/profile", async () => {
    try {
        const res = await axiosInstance.get("/users/profile");
        return res.data;
    } catch (error) {
        console.log(error?.response?.data?.message || error.message);
    }
});

export const updateProfile = createAsyncThunk(
    "auth/editprofile",
    async (data) => {
        try {
            if (data.fullName) {
                const accountRes = axiosInstance.post("/users/update", data);
                toast.promise(accountRes, {
                    loading: "Wait! updating your account...",
                });
                await accountRes;
            }
            if (data.file.length) {
                const avatar = new FormData();
                avatar.append("avatar", data.file[0]);
                const avatarRes = axiosInstance.post(
                    "/users/change-avatar",
                    avatar
                );
                toast.promise(avatarRes, {
                    loading: "Wait! uploading your avatar...",
                });
                await avatarRes;
            }
            toast.success("Profile updated successfully");
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message);
            } else {
                console.log(error.message);
            }
        }
    }
);

const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signUp.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload?.success;
                state.role = action.payload?.data?.role;
                state.data = action.payload?.data;
                sessionStorage.setItem(
                    "isLoggedIn",
                    JSON.stringify(action.payload?.success)
                );
                sessionStorage.setItem("role", action.payload?.data?.role);
                sessionStorage.setItem(
                    "data",
                    JSON.stringify(action.payload?.data)
                );
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload?.success;
                state.role = action.payload?.data?.role;
                state.data = action.payload?.data;
                sessionStorage.setItem(
                    "isLoggedIn",
                    JSON.stringify(action.payload?.success)
                );
                sessionStorage.setItem("role", action.payload?.data?.role);
                sessionStorage.setItem(
                    "data",
                    JSON.stringify(action.payload?.data)
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
                state.role = action.payload?.data?.role;
                state.data = action.payload?.data;
                sessionStorage.setItem(
                    "isLoggedIn",
                    JSON.stringify(action.payload?.success)
                );
                sessionStorage.setItem("role", action.payload?.data?.role);
                sessionStorage.setItem(
                    "data",
                    JSON.stringify(action.payload?.data)
                );
            });
    },
});

export default AuthSlice;
