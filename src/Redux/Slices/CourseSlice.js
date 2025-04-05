import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    courseData: [],
};

export const getAllCourses = createAsyncThunk(
    "course/getAllCourses",
    async (data) => {
        try {
            const res = axiosInstance.get("/courses/");
            toast.promise(res, {
                loading: "Wait! loading courses...",
                success: (data) => {
                    return data?.data?.message;
                },
                error: "Failed to load Courses",
            });
            return (await res).data;
        } catch (error) {
            console.log(error?.response?.data?.message || error.message);
        }
    }
);

export const createNewCourse = createAsyncThunk(
    "course/createNewCourse",
    async (data) => {
        try {
            const courseRes = axiosInstance.post("/courses/create", data);
            toast.promise(courseRes, {
                loading: "Wait! Creating course...",
            });
            const res = (await courseRes).data;
            const thumbnail = new FormData();
            thumbnail.append("thumbnail", data.file[0]);
            const thumbnailRes = axiosInstance.post(
                `/courses/change-thumbnail/${res.data._id}`,
                thumbnail
            );
            toast.promise(thumbnailRes, {
                loading: "Wait! Uploading course thumbnail...",
            });
            await thumbnailRes;
            toast.success("Course created successfully");
            return {
                success: true,
            };
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message);
            } else {
                console.log(error.message);
            }
        }
    }
);

export const updateCourse = createAsyncThunk(
    "/course/updateCourse",
    async (data) => {
        try {
            if (
                data?.title !== "" ||
                data?.description !== "" ||
                data?.category !== ""
            ) {
                const courseRes = axiosInstance.post(
                    `/courses/update/${data.courseId}`,
                    data
                );
                toast.promise(courseRes, {
                    loading: "Wait! Updating course...",
                });
                await courseRes;
            }
            if (data.file.length) {
                const thumbnail = new FormData();
                thumbnail.append("thumbnail", data.file[0]);
                const thumbnailRes = axiosInstance.post(
                    `/courses/change-thumbnail/${data.courseId}`,
                    thumbnail
                );
                toast.promise(thumbnailRes, {
                    loading: "Wait! Uploading course thumbnail...",
                });
                await thumbnailRes;
            }
            toast.success("Course updated successfully");
            return {
                success: true,
            };
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message);
            } else {
                console.log(error.message);
            }
        }
    }
);

export const deleteCourse = createAsyncThunk("/courses/delete", async (id) => {
    try {
        const courseRes = axiosInstance.get(`/courses/delete/${id}`);
        toast.promise(courseRes, {
            loading: "Wait! Deleting the course...",
            success: (data) => {
                return data?.data?.message;
            },
        });
        await courseRes;
        return {
            success: true,
        };
    } catch (error) {
        if (error?.response?.data?.message) {
            toast.error(error?.response?.data?.message);
        } else {
            console.log(error.message);
        }
    }
});

const CourseSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCourses.fulfilled, (state, action) => {
            if (action?.payload?.data?.length) {
                state.courseData = action.payload?.data;
            }
        });
    },
});

export default CourseSlice;
