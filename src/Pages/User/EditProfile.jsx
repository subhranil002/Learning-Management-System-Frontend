import { useForm } from "react-hook-form";
import { FiArrowLeft, FiImage, FiUser } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { getProfile, updateProfile } from "../../Redux/Slices/AuthSlice";

function EditProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data } = useSelector((state) => state.auth);
    const { register, handleSubmit, watch } = useForm({
        defaultValues: {
            fullName: data?.fullName,
        },
    });
    const selectedFile = watch("file")?.[0];

    async function onSubmit(data) {
        await dispatch(updateProfile(data));
        await dispatch(getProfile());
        navigate("/users/profile");
    }

    function modifyCloudinaryURL(url) {
        if (import.meta.env.VITE_IMAGE_TRANSFORMATION === "true") {
            return url.replace(
                "/upload/",
                "/upload/ar_1:1,c_auto,g_auto,w_500/r_max/"
            );
        }
        return url;
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
                        noValidate
                        onSubmit={handleSubmit(onSubmit)}
                        className="card-body p-8 space-y-4"
                    >
                        <h1 className="text-2xl font-bold text-center my-4">
                            Edit Profile
                        </h1>
                        <div className="form-control mx-auto my-auto">
                            <label className="label justify-center cursor-pointer w-full">
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
                                            <img
                                                src={modifyCloudinaryURL(
                                                    data?.avatar?.secure_url
                                                )}
                                                className="rounded-full object-cover w-full h-full"
                                                alt="Profile preview"
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                            <FiImage className="text-2xl text-white" />
                                        </div>
                                    </div>
                                </div>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept=".jpg, .jpeg, .png"
                                    {...register("file")}
                                />
                            </label>
                            <p className="text-center text-sm text-base-content/70 mt-2">
                                Click to change profile photo
                            </p>
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
                                    placeholder="Enter your name"
                                    className="input input-bordered pl-10 w-full capitalize"
                                    {...register("fullName")}
                                />
                                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-info btn-block gap-2"
                        >
                            <FiUser className="text-lg" />
                            Update Profile
                        </button>
                    </form>
                </div>
            </div>
        </HomeLayout>
    );
}

export default EditProfile;
