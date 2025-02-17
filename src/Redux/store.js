import { configureStore } from "@reduxjs/toolkit";

import AuthSlice from "./Slices/AuthSlice";
import CourseSlice from "./Slices/CourseSlice";

const store = configureStore({
    reducer: {
        auth: AuthSlice.reducer,
        course: CourseSlice.reducer
    },
    devTools: true,
});

export default store;
