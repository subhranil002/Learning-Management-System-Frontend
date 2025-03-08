import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BiRupee } from "react-icons/bi";
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

    async function onSubmit() {
        const apiKey = (await dispatch(getKey()))?.payload?.data?.key;
        const subscription_id = (await dispatch(subscribe()))?.payload?.data?.id;

        if (!apiKey || !subscription_id) {
            toast.error("Something went wrong");
            return;
        }

        const options = {
            key: apiKey,
            subscription_id,
            name: "Coursify Pvt. Ltd.",
            description: "Subscription",
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
                } else navigate("/checkout/fail");
            },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return (
        <HomeLayout>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="min-h-[90vh] flex items-center justify-center text-white"
            >
                <div className="w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative">
                    <h1 className="bg-yellow-500 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-tl0lg rounded-tr-lg">
                        Subscription Bundle
                    </h1>
                    <div className="px-4 space-y-5 text-center">
                        <p className="text-[17px]">
                            This purchase will allow you to access all available
                            course of our platform for{" "}
                            <span className="text-yellow-500 font-bold">
                                <br />1 Year duration
                            </span>{" "}
                            All the existing and new launched courses will be
                            also available
                        </p>

                        <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
                            <BiRupee />
                            <span>1000</span> only
                        </p>
                        <div className="text-gray-200">
                            <p>100% refund on cancellation</p>
                            <p>* Terms and conditions applied *</p>
                        </div>
                        <button
                            type="submit"
                            className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full left-0 text-xl font-bold rounded-bl-lg rounded-br-lg py-2"
                        >
                            Buy now
                        </button>
                    </div>
                </div>
            </form>
        </HomeLayout>
    );
}

export default Checkout;
