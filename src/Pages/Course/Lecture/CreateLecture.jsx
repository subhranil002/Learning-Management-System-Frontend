import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../../Layouts/HomeLayout";
import { createLecture } from "../../../Redux/Slices/LectureSlice";

function CreateLecture() {
    const { state } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { handleSubmit, register, watch } = useForm();
    const selectedFile = watch("file")?.[0];

    async function onSubmit(data) {
        const res = await dispatch(
            createLecture({
                ...data,
                courseId: state._id,
            })
        );
        if (res?.payload?.success) {
            navigate(-1);
        }
    }

    async function onError(errors) {
        if (errors.file) {
            toast.error(errors.file.message);
        }

        if (errors.title) {
            toast.error(errors.title.message);
        }

        if (errors.description) {
            toast.error(errors.description.message);
        }
    }

    useEffect(() => {
        if (!state) navigate("/courses");
    }, []);

    return (
        <HomeLayout>
            <div className="min-h-[90vh] text-white flex flex-col items-center justify-center gap-10 mx-16">
                <div className="flex flex-col gap-5 p-2 shadow-[0_0_10px_black] w-96 rounded-lg">
                    <header className="flex items-center justify-center relative">
                        <button
                            className="absolute left-2 text-xl text-green-500"
                            onClick={() => navigate(-1)}
                        >
                            <AiOutlineArrowLeft />
                        </button>
                        <h1 className="text-xl text-yellow-500 font-semibold">
                            Add new lecture
                        </h1>
                    </header>
                    <form
                        noValidate
                        onSubmit={handleSubmit(onSubmit, onError)}
                        className="flex flex-col gap-3"
                    >
                        <input
                            type="text"
                            name="title"
                            placeholder="enter the title of the lecture"
                            className="bg-transparent px-3 py-1 border"
                            {...register("title", {
                                required: "Title is required",
                            })}
                        />
                        <textarea
                            type="text"
                            name="description"
                            placeholder="enter the description of the lecture"
                            className="bg-transparent px-3 py-1 border resize-none overflow-y-scroll h-36"
                            {...register("description", {
                                required: "Description is required",
                            })}
                        />
                        {selectedFile?.type?.startsWith("video/") ? (
                            <video
                                src={URL.createObjectURL(selectedFile)}
                                controls
                                disablePictureInPicture
                                className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                            ></video>
                        ) : (
                            <div className="h-48 border flex items-center justify-center cursor-pointer">
                                <label
                                    className="font-semibold text-cl cursor-pointer"
                                    htmlFor="lecture"
                                >
                                    Choose your video
                                </label>
                                <input
                                    type="file"
                                    className="hidden"
                                    id="lecture"
                                    name="lecture"
                                    accept="video/mp4 video/x-mp4 video/*"
                                    {...register("file", {
                                        required: "Lecture video is required",
                                        validate: (file) => {
                                            return file[0].type.startsWith(
                                                "video/"
                                            )
                                                ? true
                                                : "Only video files are allowed";
                                        },
                                    })}
                                />
                            </div>
                        )}
                        <button
                            type="submit"
                            className="btn btn-primary py-1 font-semibold text-lg"
                        >
                            Add new Lecture
                        </button>
                    </form>
                </div>
            </div>
        </HomeLayout>
    );
}

export default CreateLecture;
