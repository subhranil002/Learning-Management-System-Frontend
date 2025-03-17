import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BiLock } from "react-icons/bi";
import { FiArrowLeft, FiLock } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { changePassword } from "../../Redux/Slices/AuthSlice";

function ChangePassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        if (data.oldPassword === data.newPassword) {
            toast.error("New password must be different from current password");
            return;
        }
        if (data.newPassword !== data.confirmPassword) {
            toast.error("New password and confirm password must be same");
            return;
        }

        const res = await dispatch(changePassword(data));
        if (res?.payload?.success) {
            navigate("/users/profile");
        }
    };

    function onError(errors) {
        Object.values(errors).forEach((error) => {
            if (error.message) toast.error(error.message);
        });
    }

    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-base-100 to-base-200 p-4">
                <div className="card w-full max-w-md bg-base-100 shadow-lg relative">
                    <Link
                        to="/users/profile"
                        className="absolute top-4 left-4 btn btn-ghost btn-circle z-10"
                    >
                        <FiArrowLeft className="text-xl text-error" />
                    </Link>
                    <form
                        onSubmit={handleSubmit(onSubmit, onError)}
                        className="card-body p-8 space-y-4"
                    >
                        <h1 className="text-2xl font-bold text-center my-4">
                            Change Password
                        </h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text flex items-center gap-2">
                                    <FiLock className="text-base-content/70" />
                                    Old Password
                                </span>
                            </label>
                            <div className="relative">
                                <input
                                    type="oldPassword"
                                    placeholder="••••••••"
                                    className="input input-bordered pl-10 w-full"
                                    {...register("oldPassword", {
                                        required: "Old password is required",
                                        minLength: {
                                            value: 8,
                                            message:
                                                "Old password must be at least 8 characters",
                                        },
                                        pattern: {
                                            value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/,
                                            message:
                                                "Old password must contain at least one uppercase letter, one number, and one special character",
                                        },
                                    })}
                                />
                                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50" />
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text flex items-center gap-2">
                                    <FiLock className="text-base-content/70" />
                                    New Password
                                </span>
                            </label>
                            <div className="relative">
                                <input
                                    type="newPassword"
                                    placeholder="••••••••"
                                    className="input input-bordered pl-10 w-full"
                                    {...register("newPassword", {
                                        required: "New password is required",
                                        minLength: {
                                            value: 8,
                                            message:
                                                "New password must be at least 8 characters",
                                        },
                                        pattern: {
                                            value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/,
                                            message:
                                                "New password must contain at least one uppercase letter, one number, and one special character",
                                        },
                                    })}
                                />
                                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50" />
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text flex items-center gap-2">
                                    <FiLock className="text-base-content/70" />
                                    Confirm Password
                                </span>
                            </label>
                            <div className="relative">
                                <input
                                    type="confirmPassword"
                                    placeholder="••••••••"
                                    className="input input-bordered pl-10 w-full"
                                    {...register("confirmPassword", {
                                        required:
                                            "Please confirm your password",
                                        minLength: {
                                            value: 8,
                                            message:
                                                "Confirm password must be at least 8 characters",
                                        },
                                        pattern: {
                                            value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/,
                                            message:
                                                "Confirm password must contain at least one uppercase letter, one number, and one special character",
                                        },
                                    })}
                                />
                                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50" />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-error btn-block gap-2 mt-4"
                        >
                            <BiLock className="text-lg" />
                            Update Password
                        </button>
                    </form>
                </div>
            </div>
        </HomeLayout>
    );
}

export default ChangePassword;
