import { useEffect } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import NotFound from "../NotFound";

function CheckoutSuccess() {
    const { state } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!state) navigate("/courses");
    }, []);

    console.log(state);
    

    if (state?.type === "lifetime") {
        return (
            <HomeLayout>
                <div className="min-h-[90vh] flex items-center justify-center px-4">
                    <div className="card w-full max-w-md bg-base-300 text-base-content shadow-xl hover:shadow-2xl transition-shadow duration-300">
                        <div className="card-body items-center text-center p-8">
                            <div className="mb-6">
                                <AiFillCheckCircle className="text-6xl text-success animate-pulse" />
                            </div>
                            <h2 className="card-title text-3xl text-success mb-4">
                                Purchase Successful!
                            </h2>
                            <div className="space-y-4 mb-8">
                                <p className="text-xl font-semibold">
                                    You now have lifetime access to:
                                </p>
                                <div className="text-left space-y-2">
                                    <p className="flex items-center gap-2">
                                        <AiFillCheckCircle className="text-success" />
                                        {state?.course?.title}
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <AiFillCheckCircle className="text-success" />
                                        All course materials & resources
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <AiFillCheckCircle className="text-success" />
                                        Future updates included
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <AiFillCheckCircle className="text-success" />
                                        Certificate of completion
                                    </p>
                                </div>
                            </div>
                            <Link
                                to={"/courses"}
                                className="w-full"
                            >
                                <button className="btn btn-primary btn-lg w-full hover:scale-105 transition-transform">
                                    Start Learning Now
                                </button>
                            </Link>
                            <p className="text-sm mt-4 opacity-75">
                                Need assistance? &nbsp;
                                <Link
                                    to="/contact"
                                    className="link link-accent font-semibold"
                                >
                                    Contact our support team
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </HomeLayout>
        );
    } else if (state?.type === "subscription") {
        return (
            <HomeLayout>
                <div className="min-h-[90vh] flex items-center justify-center px-4">
                    <div className="card w-full max-w-md bg-base-300 text-base-content shadow-xl hover:shadow-2xl transition-shadow duration-300">
                        <div className="card-body items-center text-center p-8">
                            <div className="mb-6">
                                <AiFillCheckCircle className="text-6xl text-success animate-pulse" />
                            </div>
                            <h2 className="card-title text-3xl text-success mb-4">
                                Payment Successful!
                            </h2>
                            <div className="space-y-4 mb-8">
                                <p className="text-xl font-semibold">
                                    Welcome to the Premium Bundle
                                </p>
                                <div className="text-left space-y-2">
                                    <p className="flex items-center gap-2">
                                        <AiFillCheckCircle className="text-success" />
                                        Full access to all courses
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <AiFillCheckCircle className="text-success" />
                                        Premium content unlocked
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <AiFillCheckCircle className="text-success" />
                                        {
                                            import.meta.env
                                                .VITE_SUBSCRIPTION_DURATION
                                        }
                                        &nbsp;
                                        {
                                            import.meta.env
                                                .VITE_SUBSCRIPTION_PERIOD
                                        }{" "}
                                        subscription
                                    </p>
                                </div>
                            </div>
                            <Link to="/courses" className="w-full">
                                <button className="btn btn-success btn-lg w-full hover:scale-105 transition-transform">
                                    Start Learning Now
                                </button>
                            </Link>
                            <p className="text-sm mt-4 opacity-75">
                                Need help? &nbsp;
                                <Link
                                    to="/contact"
                                    className="link link-accent font-semibold"
                                >
                                    Contact Support
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </HomeLayout>
        );
    } else {
        return <NotFound />;
    }
}

export default CheckoutSuccess;
