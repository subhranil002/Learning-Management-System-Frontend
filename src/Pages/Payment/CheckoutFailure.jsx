import { RxCrossCircled } from "react-icons/rx";
import { Link } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";

function CheckoutFailure() {
    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center px-4">
                <div className="card w-full max-w-md bg-base-300 text-base-content shadow-xl hover:shadow-2xl transition-shadow duration-300">
                    <div className="card-body items-center text-center p-8">
                        <div className="mb-6">
                            <RxCrossCircled className="text-6xl text-error animate-pulse" />
                        </div>
                        <h2 className="card-title text-3xl text-error mb-4">
                            Payment Failed
                        </h2>
                        <div className="space-y-4 mb-8">
                            <p className="text-xl font-semibold">
                                We couldn&apos;t process your payment
                            </p>
                            <div className="text-left space-y-2">
                                <p className="flex items-center gap-2">
                                    <RxCrossCircled className="text-error" />
                                    Check payment details
                                </p>
                                <p className="flex items-center gap-2">
                                    <RxCrossCircled className="text-error" />
                                    Ensure sufficient funds
                                </p>
                                <p className="flex items-center gap-2">
                                    <RxCrossCircled className="text-error" />
                                    Try again or use different method
                                </p>
                            </div>
                        </div>
                        <Link to="/checkout" className="w-full">
                            <button className="btn btn-error btn-lg w-full hover:scale-105 transition-transform">
                                Try Again
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

export default CheckoutFailure;
