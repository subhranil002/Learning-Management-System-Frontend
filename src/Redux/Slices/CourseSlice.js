import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    courseData: [],
};

export const getAllCourses = createAsyncThunk(
    "course/getAllCourses",
    async () => {
        try {
            const res = axiosInstance.get("/course");
            toast.promise(res, {
                loading: "Wait! loading courses...",
                success: (data) => {
                    return data?.data?.message;
                },
                error: "Failed to load Courses",
            });
            return (await res).data;
        } catch (error) {
            console.log(error.message);
        }
    }
);

const CourseSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCourses.fulfilled, (state, action) => {
            state.courseData = [...action.payload.courses];
        });
    },
});

export default CourseSlice;
