import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import axiosInstance from "../Helpers/axiosInstance";
import HomeLayout from "../Layouts/HomeLayout";

function Contact() {
    const { handleSubmit, register, reset } = useForm();

    async function onSubmit(data) {
        try {
            const res = axiosInstance.post("/contact", data);
            toast.promise(res, {
                loading: "Submitting your message...",
                success: "Form submitted successfully",
                error: "Failed to submit the form",
            });
            const response = await res;
            console.log(response);
            if (response?.data?.success) {
                reset();
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh]">
                <form
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col items-center justify-center gap-2 p-5 rounded-md text-white shadow-[0_0_10px_black] w-[22rem]"
                >
                    <h1 className="text-3xl font-semibold">Contact Form</h1>
                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="name" className="text-xl font-semibold">
                            Name
                        </label>
                        <input
                            className="bg-transparent border px-2 py-1 rounded-sm"
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            {...register("name", {
                                required: "Name is required",
                            })}
                        />
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <label
                            htmlFor="email"
                            className="text-xl font-semibold"
                        >
                            Email
                        </label>
                        <input
                            className="bg-transparent border px-2 py-1 rounded-sm"
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^(?=.{1,254}$)(?=.{1,64}@)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                                    message: "Invalid email format",
                                },
                            })}
                        />
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <label
                            htmlFor="message"
                            className="text-xl font-semibold"
                        >
                            Message
                        </label>
                        <textarea
                            className="bg-transparent border px-2 py-1 rounded-sm resize-none h-40"
                            id="message"
                            name="message"
                            placeholder="Enter your email"
                            {...register("message", {
                                required: "Message is required",
                            })}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </HomeLayout>
    );
}
export default Contact;
