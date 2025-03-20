import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    lectures: [],
};

export const createLecture = createAsyncThunk(
    "/lecture/create",
    async (data) => {
        try {
            const lectureRes = axiosInstance.post(
                `/courses/${data.courseId}/create`,
                data
            );
            toast.promise(lectureRes, {
                loading: "Wait! creating lecture...",
            });
            const lectureResRes = await lectureRes;
            const lecture = new FormData();
            lecture.append("lecture", data.file[0]);
            const lecvidRes = axiosInstance.post(
                `/courses/${data.courseId}/${lectureResRes.data.data._id}`,
                lecture
            );
            toast.promise(lecvidRes, {
                loading: "Wait! uploading your lecture...",
                success: "Lecture created successfully",
            });
            return (await lecvidRes).data;
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message);
            } else {
                console.log(error.message);
            }
        }
    }
);

export const getLecturesByCourse = createAsyncThunk(
    "/lecture/getByCourse",
    async (id) => {
        try {
            const lectureRes = axiosInstance.get(`/courses/${id}`);
            toast.promise(lectureRes, {
                loading: "Wait! getting lectures...",
                success: (data) => {
                    return data?.data?.message;
                },
            });
            return (await lectureRes).data;
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message);
            } else {
                console.log(error.message);
            }
        }
    }
);

export const updateLecture = createAsyncThunk(
    "/lecture/update",
    async (data) => {
        try {
            if (data.title || data.description) {
                const lectureRes = axiosInstance.post(
                    `/courses/${data.courseId}/update/${data.lectureId}`,
                    data
                );
                toast.promise(lectureRes, {
                    loading: "Wait! updating lecture...",
                });
                await lectureRes;
            }
            if (data.file.length) {
                const lecture = new FormData();
                lecture.append("lecture", data.file[0]);
                const lecvidRes = axiosInstance.post(
                    `/courses/${data.courseId}/${data.lectureId}`,
                    lecture
                );
                toast.promise(lecvidRes, {
                    loading: "Wait! uploading your lecture...",
                });
                await lecvidRes;
            }
            toast.success("Lecture updated successfully");
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

export const deleteLecture = createAsyncThunk(
    "/lecture/delete",
    async (data) => {
        try {
            const lectureRes = axiosInstance.get(
                `/courses/${data.courseId}/delete/${data.lectureId}`
            );
            toast.promise(lectureRes, {
                loading: "Wait! deleting lecture...",
                success: (data) => {
                    return data?.data?.message;
                },
            });
            await lectureRes;
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message);
            } else {
                console.log(error.message);
            }
        }
    }
);

const LectureSlice = createSlice({
    name: "lecture",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getLecturesByCourse.fulfilled, (state, action) => {
            state.lectures = action.payload?.data;
        });
    },
});

export default LectureSlice;
