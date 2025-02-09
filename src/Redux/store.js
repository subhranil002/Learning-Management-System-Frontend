import { configureStore } from "@reduxjs/toolkit";

import AuthSlice from "./Slices/AuthSlice";

const store = configureStore({
    reducer: {
        auth: AuthSlice.reducer
    },
    devTools: true,
});

export default store;
