import { useForm } from "react-hook-form";
import { FiArrowLeft, FiMail } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { forgotPassword } from "../../Redux/Slices/AuthSlice";

function ForgotPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const res = await dispatch(forgotPassword(data));
        if (res?.payload?.success) {
            navigate("/signin");
        }
    };

    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-base-100 to-base-200 p-4">
                <div className="card w-full max-w-md bg-base-100 shadow-lg relative">
                    <Link
                        to="/signin"
                        className="absolute top-4 left-4 btn btn-ghost btn-circle z-10"
                    >
                        <FiArrowLeft className="text-xl text-error" />
                    </Link>
                    <form
                        noValidate
                        onSubmit={handleSubmit(onSubmit)}
                        className="card-body p-8 space-y-4"
                    >
                        <h1 className="text-2xl font-bold text-center my-4 text-warning">
                            Forgot Password ?
                        </h1>
                        <div className="text-center mb-4">
                            <p className="text-base-content/70">
                                Enter your email address and we&apos;ll send you
                                a link to reset your password.
                            </p>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text flex items-center gap-2">
                                    <FiMail className="text-base-content/70" />
                                    Email
                                </span>
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    className="input input-bordered pl-10 w-full"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^(?=.{1,254}$)(?=.{1,64}@)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                                            message: "Invalid email format",
                                        },
                                    })}
                                />
                                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50" />
                            </div>
                            {errors.email && (
                                <label className="label">
                                    <span className="label-text-alt text-error whitespace-normal">
                                        {errors.email.message}
                                    </span>
                                </label>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="btn btn-warning btn-block gap-2 mt-4"
                        >
                            Send Reset Link
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

export default ForgotPassword;
