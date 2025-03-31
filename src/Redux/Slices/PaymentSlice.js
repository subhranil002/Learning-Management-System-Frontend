import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    key: "",
    subscription_id: "",
    isPaymentVerified: false,
    allPayments: {},
    finalMonths: {},
    monthlySalesRecord: [],
};

export const getKey = createAsyncThunk("/payments/apikey", async () => {
    try {
        const res = await axiosInstance.get("/payments/apikey");
        return res.data;
    } catch (error) {
        console.log(error.message);
    }
});

export const subscribe = createAsyncThunk("/payments/subscribe", async () => {
    try {
        const res = await axiosInstance.get("/payments/subscribe");
        return res.data;
    } catch (error) {
        if (error?.response?.data?.message) {
            toast.error(error?.response?.data?.message);
        } else {
            console.log(error.message);
        }
    }
});

export const createOrder = createAsyncThunk(
    "/payments/create/order",
    async (data) => {
        try {
            const res = await axiosInstance.post("/payments/order", data);
            return res.data;
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message);
            } else {
                console.log(error.message);
            }
        }
    }
);

export const verifySubscription = createAsyncThunk(
    "/payments/verify/subscription",
    async (data) => {
        try {
            const res = axiosInstance.post(
                "/payments/verify/subscription",
                data
            );
            toast.promise(res, {
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
    }
);

export const verifyPayment = createAsyncThunk(
    "/payments/verify/payment",
    async (data) => {
        try {
            const res = axiosInstance.post("/payments/verify/payment", data);
            toast.promise(res, {
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
    }
);

export const unsubscribe = createAsyncThunk(
    "/payments/unsubscribe",
    async () => {
        try {
            const res = axiosInstance.get("/payments/unsubscribe");
            toast.promise(res, {
                loading: "Wait! canceling the subscription",
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
    }
);

export const paymentHistory = createAsyncThunk(
    "/payments/history",
    async (count) => {
        try {
            const res = axiosInstance.get(`/payments/?count=${count}`);
            toast.promise(res, {
                loading: "Wait! getting the payment records",
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
    }
);

const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getKey.fulfilled, (state, action) => {
                state.key = action?.payload?.data?.key;
            })
            .addCase(subscribe.fulfilled, (state, action) => {
                state.subscription_id = action?.payload?.data?.id;
            })
            .addCase(verifyPayment.fulfilled, (state) => {
                state.isPaymentVerified = true;
            })
            .addCase(unsubscribe.fulfilled, (state) => {
                state.subscription_id = "";
                state.isPaymentVerified = false;
            })
            .addCase(paymentHistory.fulfilled, (state, action) => {
                state.allPayments = action?.payload?.data?.items;
            });
    },
});

export default paymentSlice;
