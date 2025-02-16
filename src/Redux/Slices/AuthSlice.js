import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    isLoggedIn: localStorage.getItem("isLoggedIn") || false,
    role: localStorage.getItem("role") || "",
    data: localStorage.getItem("data") || {},
};

const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
});

export const signUp = async (formData) => {
    try {
        const res = axiosInstance.post("/user/register", formData);
        toast.promise(res, {
            loading: "Wait! creating your account",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to create account",
        });
        const response = (await res).data;
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};

// export const {} = AuthSlice.actions;
export default AuthSlice;
