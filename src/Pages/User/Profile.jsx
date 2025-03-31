import {
    FaCheck,
    FaEdit,
    FaEnvelope,
    FaExclamationTriangle,
    FaKey,
    FaStar,
    FaTimes,
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
        if (!url) return "";
        return url.replace(
            "/upload/",
            "/upload/ar_1:1,c_auto,g_auto,w_500/r_max/"
        );
    }

    return (
        <HomeLayout>
            <dialog id="avatar-modal" className="modal">
                <div className="modal-box max-w-2xl bg-base-100 shadow-xl p-0 overflow-hidden">
                    <form
                        method="dialog"
                        className="absolute right-2 top-2 z-10"
                    >
                        <button className="btn btn-circle btn-neutral btn-sm">
                            <FaTimes className="text-xl" />
                        </button>
                    </form>
                    <div className="flex items-center justify-center min-h-[50vh]">
                        {userData?.avatar?.secure_url ? (
                            <img
                                src={userData.avatar.secure_url}
                                alt="Full Size Avatar"
                                className="w-full h-auto object-contain max-h-[70vh]"
                            />
                        ) : (
                            <div className="text-center p-8">
                                <p className="text-gray-500">
                                    No avatar available
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </dialog>
            <dialog id="cancel-subscription-modal" className="modal">
                <div className="modal-box bg-base-100 border border-error/20 shadow-xl mx-2">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="text-error mb-2 sm:mb-4">
                            <FaExclamationTriangle className="text-4xl sm:text-5xl animate-pulse" />
                        </div>
                        <h3 className="font-bold text-xl sm:text-2xl flex items-center gap-2">
                            Cancel Subscription?
                        </h3>
                        <p className="py-2 sm:py-4 text-base sm:text-lg text-base-content/80">
                            This will revoke your access to all premium content.
                            <br />
                            <span className="text-error font-semibold mt-1 sm:mt-2 block text-sm sm:text-base">
                                This action is irreversible!
                            </span>
                        </p>
                        <div className="modal-action flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 w-full">
                            <button
                                className="btn btn-outline btn-sm sm:btn-md gap-2"
                                onClick={() =>
                                    document
                                        .getElementById(
                                            "cancel-subscription-modal"
                                        )
                                        .close()
                                }
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-error btn-sm sm:btn-md gap-2"
                                onClick={() => {
                                    document
                                        .getElementById(
                                            "cancel-subscription-modal"
                                        )
                                        .close();
                                    handleCancelation();
                                }}
                            >
                                <FaCheck />
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </dialog>
            <div className="min-h-[90vh] flex items-center justify-center p-4">
                <div className="card w-full max-w-md bg-base-100 shadow-xl bg-opacity-90 backdrop-blur-sm">
                    <div className="card-body items-center text-center gap-4 px-4 sm:px-6">
                        <div className="avatar online">
                            <div
                                className="w-24 sm:w-32 rounded-full ring-2 ring-primary ring-offset-2 sm:ring-offset-4 cursor-pointer hover:ring-primary-focus transition-all"
                                onClick={() =>
                                    document
                                        .getElementById("avatar-modal")
                                        .showModal()
                                }
                            >
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
                                        userData?.role === "TEACHER" ||
                                        userData?.role === "ADMIN"
                                            ? "badge-success"
                                            : userData?.subscription?.status ===
                                              "active"
                                            ? "badge-success"
                                            : "badge-error"
                                    }`}
                                >
                                    {userData?.role === "TEACHER" ||
                                    userData?.role === "ADMIN"
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
                                className="btn btn-error gap-2 text-sm sm:text-base"
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
                            {userData?.role !== "TEACHER" &&
                                userData?.role !== "ADMIN" &&
                                userData?.subscription?.status === "active" && (
                                    <button
                                        onClick={() =>
                                            document
                                                .getElementById(
                                                    "cancel-subscription-modal"
                                                )
                                                .showModal()
                                        }
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
