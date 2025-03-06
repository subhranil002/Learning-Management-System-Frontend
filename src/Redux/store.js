import { configureStore } from "@reduxjs/toolkit";

import AuthSlice from "./Slices/AuthSlice";
import CourseSlice from "./Slices/CourseSlice";
import paymentSlice from "./Slices/PaymentSlice";

const store = configureStore({
    reducer: {
        auth: AuthSlice.reducer,
        course: CourseSlice.reducer,
        payment: paymentSlice.reducer,
    },
    devTools: true,
});

export default store;
