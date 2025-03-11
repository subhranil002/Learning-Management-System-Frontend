import { configureStore } from "@reduxjs/toolkit";

import AuthSlice from "./Slices/AuthSlice";
import CourseSlice from "./Slices/CourseSlice";
import LectureSlice from "./Slices/lectureSlice";
import PaymentSlice from "./Slices/PaymentSlice";

const store = configureStore({
    reducer: {
        auth: AuthSlice.reducer,
        course: CourseSlice.reducer,
        payment: PaymentSlice.reducer,
        lecture: LectureSlice.reducer,
    },
    devTools: true,
});

export default store;
