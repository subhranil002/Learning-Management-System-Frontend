import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BiCheckCircle, BiErrorCircle, BiRupee } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { getProfile } from "../../Redux/Slices/AuthSlice";
import {
    getKey,
    subscribe,
    verifyPayment,
} from "../../Redux/Slices/PaymentSlice";

function Checkout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { handleSubmit } = useForm();
    const userData = useSelector((state) => state?.auth?.data);
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function onSubmit() {
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
            handler: async function (response) {
                const res = await dispatch(verifyPayment(response));
                if (res?.payload?.success) {
                    await dispatch(getProfile());
                    navigate("/checkout/success");
                } else {
                    navigate("/checkout/failure");
                }
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();

        setIsSubmitting(false);
        toast.dismiss();
    }

    return (
        <HomeLayout>
            <form
                onSubmit={handleSubmit(onSubmit)}
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
                                <span>1 Year duration</span>
                            </div>
                        </div>
                        <div className="text-center mb-8">
                            <div className="flex justify-center items-center gap-5">
                                <span className="line-through opacity-70 text-xl text-error">
                                    ₹2000
                                </span>
                                <span className="text-4xl font-bold text-primary flex items-center">
                                    ₹1000
                                </span>
                            </div>
                            <p className="text-sm mt-2 text-error">
                                Save ₹1000 (50% OFF!)
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
                            * By continuing, you agree to our Terms of Service
                            and Privacy Policy
                        </p>
                    </div>
                </div>
            </form>
        </HomeLayout>
    );
}

export default Checkout;
