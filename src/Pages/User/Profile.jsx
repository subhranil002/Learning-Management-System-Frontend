import {
    FaEdit,
    FaEnvelope,
    FaKey,
    FaStar,
    FaTimesCircle,
    FaUserTag,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { getProfile } from "../../Redux/Slices/AuthSlice";
import { unsubscribe } from "../../Redux/Slices/PaymentSlice";

function Profile() {
    const userData = useSelector((state) => state?.auth?.data);
    const dispatch = useDispatch();

    async function handleCancelation() {
        await dispatch(unsubscribe());
        await dispatch(getProfile());
    }

    function modifyCloudinaryURL(url) {
        return url.replace(
            "/upload/",
            "/upload/ar_1:1,c_auto,g_auto,w_500/r_max/"
        );
    }

    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center p-4">
                <div className="card w-full max-w-md bg-base-100 shadow-xl bg-opacity-90 backdrop-blur-sm">
                    <div className="card-body items-center text-center gap-4 px-4 sm:px-6">
                        <div className="avatar online">
                            <div className="w-24 sm:w-32 rounded-full ring-2 ring-primary ring-offset-2 sm:ring-offset-4">
                                <img
                                    src={modifyCloudinaryURL(
                                        userData?.avatar?.secure_url
                                    )}
                                    className="object-cover"
                                    alt="User Avatar"
                                />
                            </div>
                        </div>
                        <h2 className="card-title text-lg sm:text-xl capitalize">
                            {userData?.fullName}
                            {userData?.role === "ADMIN" && (
                                <div className="badge badge-accent ml-2 text-xs sm:text-sm">
                                    ADMIN
                                </div>
                            )}
                        </h2>
                        <div className="w-full text-left space-y-2 sm:space-y-3">
                            <div className="flex items-center gap-2 text-sm sm:text-base">
                                <FaEnvelope className="text-primary shrink-0" />
                                <span className="flex-1">Email:</span>
                                <span className="font-medium truncate">
                                    {userData?.email}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm sm:text-base">
                                <FaUserTag className="text-secondary shrink-0" />
                                <span className="flex-1">Role:</span>
                                <span className="font-medium capitalize">
                                    {userData?.role}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm sm:text-base">
                                <FaStar className="text-accent shrink-0" />
                                <span className="flex-1">Subscription:</span>
                                <span
                                    className={`badge text-black font-semibold text-xs sm:text-sm ${
                                        userData?.subscription?.status ===
                                            "active" ||
                                        userData?.role === "ADMIN"
                                            ? "badge-success"
                                            : "badge-error"
                                    }`}
                                >
                                    {userData?.role === "ADMIN"
                                        ? "Active"
                                        : userData?.subscription?.status ===
                                          "active"
                                        ? "Active"
                                        : "Inactive"}
                                </span>
                            </div>
                        </div>
                        <div className="card-actions w-full gap-2 grid grid-cols-1 sm:grid-cols-2">
                            <Link
                                to="/users/changepassword"
                                className="btn btn-warning gap-2 text-sm sm:text-base"
                            >
                                <FaKey className="text-sm sm:text-lg" />
                                <span>Change Password</span>
                            </Link>
                            <Link
                                to="/users/editprofile"
                                className="btn btn-info gap-2 text-sm sm:text-base"
                            >
                                <FaEdit className="text-sm sm:text-lg" />
                                <span>Edit Profile</span>
                            </Link>
                            {userData?.role !== "ADMIN" &&
                                userData?.subscription?.status === "active" && (
                                    <button
                                        onClick={handleCancelation}
                                        className="btn btn-error gap-2 col-span-full text-sm sm:text-base"
                                    >
                                        <FaTimesCircle className="text-sm sm:text-lg" />
                                        <span>Cancel Subscription</span>
                                    </button>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default Profile;
