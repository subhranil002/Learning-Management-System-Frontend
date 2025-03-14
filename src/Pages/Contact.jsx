import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FaComment, FaEnvelope, FaPaperPlane, FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";

import HomeLayout from "../Layouts/HomeLayout";
import { contactUs } from "../Redux/Slices/AuthSlice";

function Contact() {
    const { handleSubmit, register, reset } = useForm();
    const dispatch = useDispatch();

    async function onSubmit(data) {
        reset();
        await dispatch(contactUs(data));
    }

    function onError(errors) {
        if (errors.name) {
            toast.error(errors.name.message);
        }
        if (errors.email) {
            toast.error(errors.email.message);
        }
        if (errors.message) {
            toast.error(errors.message.message);
        }
    }

    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-base-100 to-base-200 p-4">
                <div className="card w-full max-w-md bg-base-100 shadow-lg rounded-box">
                    <div className="card-body p-6 md:p-8">
                        <div className="text-center space-y-2 mb-6">
                            <FaPaperPlane className="inline-block text-4xl text-warning mb-2" />
                            <h2 className="text-3xl bg-gradient-to-r from-warning to-success bg-clip-text text-transparent font-bold">
                                Contact Us
                            </h2>
                            <p className="text-sm text-base-content/70">
                                We&apos;ll get back to you within 24 hours
                            </p>
                        </div>
                        <form
                            onSubmit={handleSubmit(onSubmit, onError)}
                            className="space-y-4"
                        >
                            <div className="form-control">
                                <label className="label pb-1">
                                    <span className="label-text flex items-center gap-2">
                                        <FaUser className="text-base-content/70" />
                                        Name
                                    </span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="input input-bordered w-full pl-10"
                                        {...register("name", {
                                            required: "Name is required",
                                        })}
                                    />
                                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50" />
                                </div>
                            </div>
                            <div className="form-control">
                                <label className="label pb-1">
                                    <span className="label-text flex items-center gap-2">
                                        <FaEnvelope className="text-base-content/70" />
                                        Email
                                    </span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        placeholder="john@example.com"
                                        className="input input-bordered w-full pl-10"
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^(?=.{1,254}$)(?=.{1,64}@)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                                                message: "Invalid email format",
                                            },
                                        })}
                                    />
                                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50" />
                                </div>
                            </div>
                            <div className="form-control">
                                <label className="label pb-1">
                                    <span className="label-text flex items-center gap-2">
                                        <FaComment className="text-base-content/70" />
                                        Message
                                    </span>
                                </label>
                                <textarea
                                    className="textarea textarea-bordered h-32 w-full resize-none"
                                    placeholder="Your message here..."
                                    {...register("message", {
                                        required: "Message is required",
                                        minLength: {
                                            value: 20,
                                            message:
                                                "Message must be at least 20 characters",
                                        },
                                    })}
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-warning btn-block gap-2"
                            >
                                Send Message
                                <FaPaperPlane className="text-xl" />
                            </button>
                        </form>
                        <div className="text-center pt-6">
                            <p className="text-sm text-base-content/70">
                                Prefer direct contact? &nbsp;
                                <a
                                    href="mailto:subhranil.chak.sc@gmail.com"
                                    className="link link-accent font-semibold"
                                >
                                    Email us
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default Contact;
