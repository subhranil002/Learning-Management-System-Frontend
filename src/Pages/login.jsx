import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiLock, FiLogIn, FiMail } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../Layouts/HomeLayout";
import { guestLogin, login } from "../Redux/Slices/AuthSlice";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoggedIn } = useSelector((state) => state.auth);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    async function onSubmit(data) {
        const res = await dispatch(login(data));
        if (res?.payload?.success) {
            navigate("/");
        }
    }

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
        }
    }, []);

    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-base-100 to-base-200 p-4">
                <div className="card w-full max-w-md bg-base-100 shadow-lg">
                    <form
                        noValidate
                        onSubmit={handleSubmit(onSubmit)}
                        className="card-body p-8 space-y-6"
                    >
                        <div className="text-center space-y-2">
                            <FiLogIn className="inline-block text-4xl text-warning mb-2" />
                            <h2 className="text-3xl bg-gradient-to-r from-warning to-success bg-clip-text text-transparent font-bold">
                                Welcome Back
                            </h2>
                            <p className="text-sm text-base-content/70">
                                Please Login to continue
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
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text flex items-center gap-2">
                                    <FiLock className="text-base-content/70" />
                                    Password
                                </span>
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="input input-bordered pl-10 w-full"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 8,
                                            message:
                                                "Password must be at least 8 characters",
                                        },
                                        pattern: {
                                            value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/,
                                            message:
                                                "Password must contain at least one uppercase letter, one number, and one special character",
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
                        <div className="flex flex-col gap-3">
                            <button
                                type="submit"
                                className="btn btn-warning btn-block gap-2"
                            >
                                <FiLogIn className="text-xl" />
                                Login
                            </button>
                            <button
                                onClick={async (e) => {
                                    e.preventDefault();
                                    await dispatch(guestLogin());
                                    navigate("/");
                                }}
                                className="btn btn-success btn-block gap-2"
                            >
                                <FiLogIn className="text-xl" />
                                Guest Login
                            </button>
                        </div>
                        <span>
                            <Link
                                to="/forgotpassword"
                                className="text-sm link link-primary"
                            >
                                Forgot Password?
                            </Link>
                        </span>
                        <div className="text-center">
                            <span className="text-sm text-base-content/70">
                                Don&apos;t have an account? &nbsp;
                                <Link
                                    to="/signup"
                                    className="link link-accent font-semibold"
                                >
                                    Create account
                                </Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </HomeLayout>
    );
}

export default Login;
