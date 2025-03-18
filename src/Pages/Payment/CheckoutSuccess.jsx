import { AiFillCheckCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";

function CheckoutSuccess() {
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
                                Welcome to the Pro Bundle
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
                                    1 Year subscription
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
}

export default CheckoutSuccess;
