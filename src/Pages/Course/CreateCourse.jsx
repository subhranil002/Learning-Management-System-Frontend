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

    function onSubmit(data) {
        const formData = new FormData();
        formData.append("thumbnail", data.file[0]);
        formData.append("title", data.title);
        formData.append("category", data.category);
        formData.append("createdBy", data.createdBy);
        formData.append("description", data.description);

        const res = dispatch(createNewCourse(formData));

        if (res?.success) {
            navigate("/courses");
        }
    }

    function onError(errors) {
        if (errors.file) {
            toast.error(errors.file.message);
        }

        if (errors.title) {
            toast.error(errors.title.message);
        }

        if (errors.category) {
            toast.error(errors.category.message);
        }

        if (errors.createdBy) {
            toast.error(errors.createdBy.message);
        }

        if (errors.description) {
            toast.error(errors.description.message);
        }
    }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh]">
                <form
                    noValidate
                    onSubmit={handleSubmit(onSubmit, onError)}
                    className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-[700px] my-10 shadow-[0_0_10px_black] relative"
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
                    <main className="grid grid-cols-2 gap-x-10">
                        <div className="gap-y-6">
                            <div>
                                <label
                                    htmlFor="image_uploads"
                                    className="cursor-pointer"
                                >
                                    {selectedFile?.type?.startsWith(
                                        "image/"
                                    ) ? (
                                        <img
                                            className="w-full h-44 m-auto border"
                                            src={URL.createObjectURL(
                                                selectedFile
                                            )}
                                        />
                                    ) : (
                                        <div className="w-full h-44 m-auto flex items-center justify-center border">
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
                                    })}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex flex-col gap-1">
                                <label
                                    className="text-lg font-semibold"
                                    htmlFor="createdBy"
                                >
                                    Course Instructor
                                </label>
                                <input
                                    type="text"
                                    name="createdBy"
                                    id="createdBy"
                                    placeholder="Enter course instructor"
                                    className="bg-transparent px-2 py-1 border"
                                    {...register("createdBy", {
                                        required: "CreatedBy is required",
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
