import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiImage, FiLock, FiMail, FiUser, FiUserPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../Layouts/HomeLayout";
import { signUp } from "../Redux/Slices/AuthSlice";

function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, watch } = useForm();
    const selectedFile = watch("file")?.[0];

    async function onSubmit(data) {
        const res = await dispatch(signUp(data));
        if (res.payload?.success) navigate("/");
    }

    function onError(errors) {
        Object.values(errors).forEach((error) => {
            if (error.message) toast.error(error.message);
        });
    }

    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-base-100 to-base-200 p-4">
                <div className="card w-full max-w-md bg-base-100 shadow-lg">
                    <form
                        noValidate
                        onSubmit={handleSubmit(onSubmit, onError)}
                        className="card-body p-8 space-y-3"
                    >
                        <div className="text-center space-y-2">
                            <FiUserPlus className="inline-block text-4xl text-warning mb-2" />
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-warning to-success bg-clip-text text-transparent">
                                Create Account
                            </h2>
                            <p className="text-sm text-base-content/70">
                                Join our tech learning community
                            </p>
                        </div>
                        <div className="form-control mx-auto my-auto">
                            <label className="label justify-center cursor-pointer">
                                <div className="avatar">
                                    <div className="w-24 rounded-full bg-base-200 relative group">
                                        {selectedFile?.type?.startsWith(
                                            "image/"
                                        ) ? (
                                            <img
                                                src={URL.createObjectURL(
                                                    selectedFile
                                                )}
                                                className="rounded-full object-cover w-full h-full"
                                                alt="Profile preview"
                                            />
                                        ) : (
                                            <FiUser className="w-full h-full p-4 text-base-content/50" />
                                        )}
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                            <FiImage className="text-2xl text-white" />
                                        </div>
                                    </div>
                                </div>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept=".jpg, .jpeg, .png, .svg"
                                    {...register("file", {
                                        required: "Profile picture is required",
                                    })}
                                />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text flex items-center gap-2">
                                    <FiUser className="text-base-content/70" />
                                    Full Name
                                </span>
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    className="input input-bordered pl-10 w-full"
                                    {...register("fullName", {
                                        required: "Full name is required",
                                    })}
                                />
                                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50" />
                            </div>
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
                        </div>
                        <button
                            type="submit"
                            className="btn btn-warning btn-block gap-2"
                        >
                            <FiUserPlus className="text-xl" />
                            Create Account
                        </button>
                        <div className="text-center pt-4">
                            <span className="text-sm text-base-content/70">
                                Already have an account? &nbsp;
                                <Link
                                    to="/login"
                                    className="link link-accent font-semibold"
                                >
                                    Sign in
                                </Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </HomeLayout>
    );
}

export default Signup;
