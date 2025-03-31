import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BiCheckCircle, BiErrorCircle, BiRupee } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { getProfile } from "../../Redux/Slices/AuthSlice";
import {
    createOrder,
    getKey,
    subscribe,
    verifyPayment,
    verifySubscription,
} from "../../Redux/Slices/PaymentSlice";
import NotFound from "../NotFound";

function Checkout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { handleSubmit } = useForm();
    const userData = useSelector((state) => state?.auth?.data);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { state } = useLocation();

    async function buySubscription() {
        if (isSubmitting) return;

        setIsSubmitting(true);
        toast.loading("Wait! Redirecting to the payment page...");

        const apiKey = (await dispatch(getKey()))?.payload?.data?.key;
        const subscription_id = (await dispatch(subscribe()))?.payload?.data
            ?.id;

        if (!apiKey || !subscription_id) {
            toast.dismiss();
            toast.error("Something went wrong");
            setIsSubmitting(false);
            return;
        }

        const options = {
            key: apiKey,
            subscription_id,
            name: "BrainXcel Pvt. Ltd.",
            description: "Subscription for BrainXcel",
            theme: {
                color: "#F37254",
            },
            prefill: {
                name: userData.fullName,
                email: userData.email,
                contact: "+91",
            },
            handler: async function (data) {
                const res = await dispatch(
                    verifySubscription({
                        ...data,
                        amount: import.meta.env.VITE_SUBSCRIPTION_OFFER_PRICE,
                        currency: import.meta.env.VITE_SUBSCRIPTION_CURRENCY,
                    })
                );
                if (res?.payload?.success) {
                    await dispatch(getProfile());
                    navigate("/checkout/success", {
                        state: { type: "subscription" },
                    });
                } else {
                    navigate("/checkout/failure", { state: true });
                }
            },
        };

        const paymentObject = new window.Razorpay(options);

        paymentObject.on("payment.success", () => {
            navigate("/checkout/success", {
                state: { type: "subscription" },
            });
        });

        paymentObject.on("payment.failed", () => {
            navigate("/checkout/failure", { state: true });
        });

        paymentObject.on("payment.cancel", () => {
            navigate("/checkout/failure", { state: true });
        });

        toast.dismiss();
        paymentObject.open();
        setIsSubmitting(false);
    }

    async function buyLifetimeAccess() {
        if (isSubmitting) return;

        setIsSubmitting(true);
        toast.loading("Wait! Redirecting to the payment page...");

        const apiKey = (await dispatch(getKey()))?.payload?.data?.key;
        const razorpay_order_id = (
            await dispatch(
                createOrder({
                    amount: state?.course?.price?.amount,
                    currency: state?.course?.price?.currency,
                    courseId: state?.course?._id,
                })
            )
        )?.payload?.data?.razorpay_order_id;

        if (!apiKey || !razorpay_order_id) {
            toast.dismiss();
            toast.error("Something went wrong");
            setIsSubmitting(false);
            return;
        }

        const options = {
            key: apiKey,
            name: "BrainXcel Pvt. Ltd.",
            description: state?.course?.title,
            currency: state?.course?.price?.currency,
            amount: state?.course?.price?.amount * 100,
            order_id: razorpay_order_id,
            theme: {
                color: "#F37254",
            },
            prefill: {
                name: userData.fullName,
                email: userData.email,
                contact: "+91",
            },
            handler: async function (data) {
                const res = await dispatch(
                    verifyPayment({
                        ...data,
                        amount: state?.course?.price?.amount,
                        currency: state?.course?.price?.currency,
                        courseId: state?.course?._id,
                    })
                );
                if (res?.payload?.success) {
                    await dispatch(getProfile());
                    navigate("/checkout/success", {
                        state: { type: "lifetime", course: state?.course },
                    });
                } else {
                    navigate("/checkout/failure", { state: true });
                }
            },
        };

        const paymentObject = new window.Razorpay(options);

        paymentObject.on("payment.success", () => {
            navigate("/checkout/success", {
                state: { type: "lifetime", course: state?.course },
            });
        });

        paymentObject.on("payment.failed", () => {
            navigate("/checkout/failure", { state: true });
        });

        paymentObject.on("payment.cancel", () => {
            navigate("/checkout/failure", { state: true });
        });

        toast.dismiss();
        paymentObject.open();
        setIsSubmitting(false);
    }

    if (state?.type === "lifetime") {
        return (
            <HomeLayout>
                <form
                    onSubmit={handleSubmit(buyLifetimeAccess)}
                    className="min-h-[90vh] flex items-center justify-center px-4"
                >
                    <div className="card w-full max-w-md bg-base-300 text-base-content shadow-xl hover:shadow-2xl transition-shadow duration-300">
                        <div className="card-body p-8">
                            <h2 className="card-title justify-center text-3xl mb-6 text-primary">
                                Lifetime Course Access
                            </h2>
                            <div className="space-y-4 mb-6">
                                <div className="flex items-center gap-2 text-lg">
                                    <BiCheckCircle className="text-success" />
                                    <span>
                                        Full lifetime access to{" "}
                                        {state?.course?.title}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-lg">
                                    <BiCheckCircle className="text-success" />
                                    <span>All future updates included</span>
                                </div>
                                <div className="flex items-center gap-2 text-lg">
                                    <BiCheckCircle className="text-success" />
                                    <span>Certificate of completion</span>
                                </div>
                            </div>
                            <div className="text-center mb-8">
                                <div className="flex justify-center items-center gap-5">
                                    <span className="text-4xl font-bold text-primary flex items-center">
                                        <BiRupee />
                                        {state?.course?.price?.amount}
                                    </span>
                                </div>
                                <p className="text-sm mt-2 text-success">
                                    One-time payment • No recurring charges
                                </p>
                            </div>
                            <div className="flex items-center gap-2 text-base mb-6">
                                <BiErrorCircle className="text-warning text-base" />
                                <span className="opacity-90">
                                    30-day money-back guarantee
                                </span>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary btn-lg hover:scale-105 transition-transform"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <span className="loading loading-spinner"></span>
                                        Processing...
                                    </span>
                                ) : (
                                    "Get Lifetime Access"
                                )}
                            </button>
                            <p className="text-xs text-center mt-4 opacity-75">
                                * Includes all future updates and content
                                additions
                            </p>
                        </div>
                    </div>
                </form>
            </HomeLayout>
        );
    } else if (state?.type === "subscription") {
        return (
            <HomeLayout>
                <form
                    onSubmit={handleSubmit(buySubscription)}
                    className="min-h-[90vh] flex items-center justify-center px-4"
                >
                    <div className="card w-full max-w-md bg-base-300 text-base-content shadow-xl hover:shadow-2xl transition-shadow duration-300">
                        <div className="card-body p-8">
                            <h2 className="card-title justify-center text-3xl mb-6 text-warning">
                                Premium Subscription
                            </h2>
                            <div className="space-y-4 mb-6">
                                <div className="flex items-center gap-2 text-lg">
                                    <BiCheckCircle className="text-success" />
                                    <span>Full access to all courses</span>
                                </div>
                                <div className="flex items-center gap-2 text-lg">
                                    <BiCheckCircle className="text-success" />
                                    <span>New courses included</span>
                                </div>
                                <div className="flex items-center gap-2 text-lg">
                                    <BiCheckCircle className="text-success" />
                                    <span>
                                        {
                                            import.meta.env
                                                .VITE_SUBSCRIPTION_DURATION
                                        }
                                        &nbsp;
                                        {
                                            import.meta.env
                                                .VITE_SUBSCRIPTION_PERIOD
                                        }{" "}
                                        duration
                                    </span>
                                </div>
                            </div>
                            <div className="text-center mb-8">
                                <div className="flex justify-center items-center gap-5">
                                    <span className="line-through opacity-70 text-xl text-error">
                                        ₹
                                        {
                                            import.meta.env
                                                .VITE_SUBSCRIPTION_REAL_PRICE
                                        }
                                    </span>
                                    <span className="text-4xl font-bold text-primary flex items-center">
                                        ₹
                                        {
                                            import.meta.env
                                                .VITE_SUBSCRIPTION_OFFER_PRICE
                                        }
                                    </span>
                                </div>
                                <p className="text-sm mt-2 text-error">
                                    Save ₹
                                    {import.meta.env
                                        .VITE_SUBSCRIPTION_REAL_PRICE -
                                        import.meta.env
                                            .VITE_SUBSCRIPTION_OFFER_PRICE}
                                    &nbsp; (
                                    {Math.round(
                                        (import.meta.env
                                            .VITE_SUBSCRIPTION_OFFER_PRICE /
                                            import.meta.env
                                                .VITE_SUBSCRIPTION_REAL_PRICE) *
                                            100
                                    )}
                                    % OFF!)
                                </p>
                            </div>
                            <div className="flex items-center gap-2 text-base mb-6">
                                <BiErrorCircle className="text-warning text-base" />
                                <span className="opacity-90">
                                    30-day money-back guarantee
                                </span>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-warning btn-lg hover:scale-105 transition-transform"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <span className="loading loading-spinner"></span>
                                        Processing...
                                    </span>
                                ) : (
                                    "Get Premium Access"
                                )}
                            </button>
                            <p className="text-xs text-center mt-4 opacity-75">
                                * By continuing, you agree to our Terms of
                                Service and Privacy Policy
                            </p>
                        </div>
                    </div>
                </form>
            </HomeLayout>
        );
    } else {
        return <NotFound />;
    }
}

export default Checkout;
