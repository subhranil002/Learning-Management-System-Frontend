import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { createNewCourse } from "../../Redux/Slices/CourseSlice";

function CreateCourse() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, watch } = useForm();
    const selectedFile = watch("file")?.[0];

    async function onSubmit(data) {
        const res = await dispatch(createNewCourse(data));
        if (res.payload.success) {
            navigate("/courses");
        }
    }

    function onError(errors) {
        Object.values(errors).forEach((error) => {
            if (error.message) toast.error(error.message);
        });
    }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh]">
                <form
                    noValidate
                    onSubmit={handleSubmit(onSubmit, onError)}
                    className="flex flex-col justify-center gap-10 rounded-lg p-4 text-white w-[50vw] shadow-[0_0_10px_black] relative"
                >
                    <Link
                        to={-1}
                        className="absolute top-8 text-2xl link text-accent cursor-pointer"
                    >
                        <AiOutlineArrowLeft />
                    </Link>
                    <h1 className="text-center text-2xl font-bold">
                        Create New Course
                    </h1>
                    <main className="grid grid-cols-2 w-full">
                        <div className="flex flex-col justify-center items-center w-[20vw]">
                            <label
                                htmlFor="image_uploads"
                                className="cursor-pointer w-full h-full flex flex-col justify-center items-center"
                            >
                                {selectedFile?.type?.startsWith("image/") ? (
                                    <img
                                        className="w-full h-44 border"
                                        src={URL.createObjectURL(selectedFile)}
                                    />
                                ) : (
                                    <div className="w-full h-44 flex items-center justify-center border">
                                        <h1 className="font-bold text-lg">
                                            Upload your course thumbnail
                                        </h1>
                                    </div>
                                )}
                            </label>
                            <input
                                className="hidden"
                                type="file"
                                id="image_uploads"
                                accept=".jpg, .jpeg, .png"
                                name="image_uploads"
                                {...register("file", {
                                    required: "Thumbnail is required",
                                })}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex flex-col gap-1">
                                <label
                                    className="text-lg font-semibold"
                                    htmlFor="title"
                                >
                                    Course title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    placeholder="Enter course title"
                                    className="bg-transparent px-2 py-1 border"
                                    {...register("title", {
                                        required: "Title is required",
                                        minLength: {
                                            value: 5,
                                            message:
                                                "Title must be at least 5 characters",
                                        },
                                        maxLength: {
                                            value: 50,
                                            message:
                                                "Title must be at most 50 characters",
                                        },
                                    })}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    className="text-lg font-semibold"
                                    htmlFor="category"
                                >
                                    Course category
                                </label>
                                <input
                                    type="text"
                                    name="category"
                                    id="category"
                                    placeholder="Enter course category"
                                    className="bg-transparent px-2 py-1 border"
                                    {...register("category", {
                                        required: "Category is required",
                                    })}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    className="text-lg font-semibold"
                                    htmlFor="description"
                                >
                                    Course description
                                </label>
                                <textarea
                                    type="text"
                                    name="description"
                                    id="description"
                                    placeholder="Enter course description"
                                    className="bg-transparent px-2 py-1 h-24 overflow-y-scroll resize-none border"
                                    {...register("description", {
                                        required: "Description is required",
                                        minLength: {
                                            value: 50,
                                            message:
                                                "Description must be at least 50 characters",
                                        },
                                        maxLength: {
                                            value: 200,
                                            message:
                                                "Description must be at most 200 characters",
                                        },
                                    })}
                                />
                            </div>
                        </div>
                    </main>
                    <button
                        type="submit"
                        className="w-full py-2 rounded-sm font-semibold text-lg cursor-pointer bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300"
                    >
                        Create Course
                    </button>
                </form>
            </div>
        </HomeLayout>
    );
}

export default CreateCourse;
