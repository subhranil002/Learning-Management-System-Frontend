import { useForm } from "react-hook-form";
import { BiLock } from "react-icons/bi";
import { FiLock } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { resetPassword } from "../../Redux/Slices/AuthSlice";

function ResetPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useParams();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const newPassword = watch("password");

    const onSubmit = async (data) => {
        if (data.password !== data.confirmPassword) {
            return;
        }

        const res = await dispatch(
            resetPassword({ ...data, resetToken: token })
        );
        if (res?.payload?.success) {
            navigate("/signin");
        }
    };

    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-base-100 to-base-200 p-4">
                <div className="card w-full max-w-md bg-base-100 shadow-lg relative">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="card-body p-8 space-y-4"
                    >
                        <h1 className="text-2xl font-bold text-center my-4 text-success">
                            Reset Your Password
                        </h1>
                        <div className="text-center mb-4">
                            <p className="text-base-content/70">
                                Create a new password for your account
                            </p>
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
                                    type="password"
                                    placeholder="••••••••"
                                    className="input input-bordered pl-10 w-full"
                                    {...register("password", {
                                        required: "New password is required",
                                        minLength: {
                                            value: 8,
                                            message:
                                                "Password must be at least 8 characters",
                                        },
                                        pattern: {
                                            value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/,
                                            message:
                                                "Must contain uppercase, number, and special character",
                                        },
                                    })}
                                />
                                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50" />
                            </div>
                            {errors.password && (
                                <label className="label">
                                    <span className="label-text-alt text-error whitespace-normal">
                                        {errors.password.message}
                                    </span>
                                </label>
                            )}
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
                                    type="password"
                                    placeholder="••••••••"
                                    className="input input-bordered pl-10 w-full"
                                    {...register("confirmPassword", {
                                        required:
                                            "Please confirm your password",
                                        validate: (value) =>
                                            value === newPassword ||
                                            "Passwords do not match",
                                    })}
                                />
                                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50" />
                            </div>
                            {errors.confirmPassword && (
                                <label className="label">
                                    <span className="label-text-alt text-error whitespace-normal">
                                        {errors.confirmPassword.message}
                                    </span>
                                </label>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="btn btn-success btn-block gap-2 mt-4"
                        >
                            <BiLock className="text-lg" />
                            Reset Password
                        </button>
                        <div className="text-center mt-4">
                            <p className="text-sm text-base-content/70">
                                Remember your password?{" "}
                                <Link to="/signin" className="link link-accent">
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </HomeLayout>
    );
}

export default ResetPassword;
