import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { getProfile } from "../../Redux/Slices/AuthSlice";
import { unsubscribe } from "../../Redux/Slices/PaymentSlice";

function Profile() {
    const userData = useSelector((state) => state?.auth?.data);
    const dispatch = useDispatch();

    async function handleCancelation() {
        const res = await dispatch(unsubscribe());
        if (res?.payload?.success) {
            await dispatch(getProfile());
        }
    }

    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center">
                <div className="my-10 flex flex-col gap-4 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
                    <img
                        src={userData?.avatar?.secure_url}
                        className="w-40 m-auto rounded-full border border-black"
                    />
                    <h3 className="text-xl font-semibold text-center capitalize">
                        {userData?.fullName}
                    </h3>
                    <div className="grid grid-cols-2">
                        <p>Email: </p>
                        <p>{userData?.email}</p>
                        <p>Role: </p>
                        <p>{userData?.role}</p>
                        <p>Subscription: </p>
                        <p>
                            {userData?.role === "ADMIN"
                                ? "Active"
                                : userData?.subscription?.status === "active"
                                ? "Active"
                                : "Inactive"}
                        </p>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                        <Link
                            to="/users/changepassword"
                            className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center"
                        >
                            <button>Change password</button>
                        </Link>
                        <Link
                            to="/users/editprofile"
                            className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center"
                        >
                            <button>Edit profile</button>
                        </Link>
                    </div>
                    {userData?.role !== "ADMIN" &&
                        userData?.subscription?.status === "active" && (
                            <button
                                onClick={handleCancelation}
                                className="w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center"
                            >
                                Cancel Subscription
                            </button>
                        )}
                </div>
            </div>
        </HomeLayout>
    );
}

export default Profile;
