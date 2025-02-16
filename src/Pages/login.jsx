import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../Layouts/HomeLayout";
import { login } from "../Redux/Slices/AuthSlice";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    async function onSubmit(data) {
        const res = await dispatch(login(data));
        if (res?.payload?.success) {
            navigate("/");
        }
    }

    async function onError(errors) {
        if (errors.email) {
            toast.error(errors.email.message);
        }

        if (errors.password) {
            toast.error(errors.password.message);
        }
    }

    return (
        <HomeLayout>
            <div className="flex overflow-x-auto items-center justify-center h-[100vh]">
                <form
                    noValidate
                    onSubmit={handleSubmit(onSubmit, onError)}
                    className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]"
                >
                    <h1 className="text-center text-2xl font-bold">
                        Login Page
                    </h1>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="font-semibold">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email.."
                            className="bg-transparent px-2 py-1 border"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^(?=.{1,254}$)(?=.{1,64}@)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                                    message: "Invalid email format",
                                },
                            })}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="font-semibold">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter your password.."
                            className="bg-transparent px-2 py-1 border"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message:
                                        "Password must be at least 6 characters",
                                },
                                pattern: {
                                    value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/,
                                    message:
                                        "Password must contain at least one uppercase letter, one number, and one special character",
                                },
                            })}
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
                    >
                        Login
                    </button>
                    <p className="text-center">
                        Don&apos;t have an account ? &nbsp;
                        <Link
                            to="/signup"
                            className="link text-accent cursor-pointer"
                        >
                            SignUp
                        </Link>
                    </p>
                </form>
            </div>
        </HomeLayout>
    );
}
export default Login;
