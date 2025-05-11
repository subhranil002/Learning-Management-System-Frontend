import { Editor } from "@tinymce/tinymce-react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsTextParagraph } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa";
import { FiBook } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../../Layouts/HomeLayout";
import { createLecture } from "../../../Redux/Slices/LectureSlice";

function CreateLecture() {
    const { state } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        handleSubmit,
        register,
        watch,
        control,
        formState: { errors },
    } = useForm();

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

    useEffect(() => {
        if (!state) navigate("/courses");
    }, []);

    return (
        <HomeLayout>
            <div className="flex items-center justify-center p-4 bg-gradient-to-br from-base-200 to-base-300">
                <form
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}
                    className="card w-full max-w-4xl bg-base-100 shadow-2xl border border-base-300"
                >
                    <div className="card-body relative p-8">
                        <Link
                            onClick={() => navigate(-1)}
                            className="btn btn-neutral hidden sm:flex btn-md gap-2 absolute top-6 left-6"
                        >
                            <FaArrowLeft className="text-lg" />
                            Back
                        </Link>
                        <h1 className="card-title text-2xl sm:text-3xl justify-center mt-10 sm:mt-4 mb-8 font-bold text-warning">
                            Add New Lecture
                        </h1>
                        <div className="form-control w-full mb-8">
                            <label className="label mb-2">
                                <span className="label-text text-lg font-semibold flex items-center gap-2">
                                    <AiOutlineCloudUpload className="text-xl" />
                                    Lecture Video
                                </span>
                            </label>
                            <label
                                htmlFor="lecture"
                                className="group relative block w-full rounded-box overflow-hidden cursor-pointer bg-base-200"
                                style={{ paddingTop: "60%" }}
                            >
                                <div className="absolute inset-0 flex items-center justify-center">
                                    {selectedFile?.type?.startsWith(
                                        "video/"
                                    ) ? (
                                        <div className="relative w-full h-full">
                                            <video
                                                className="w-full h-full object-cover rounded-box"
                                                src={URL.createObjectURL(
                                                    selectedFile
                                                )}
                                                controls
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-2 p-4 text-center">
                                            <AiOutlineCloudUpload className="text-4xl text-base-content/50 group-hover:text-primary transition-colors" />
                                            <p className="font-medium">
                                                Click to upload video
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </label>
                            <input
                                type="file"
                                className="hidden"
                                id="lecture"
                                accept="video/*"
                                {...register("file", {
                                    required: "Lecture video is required",
                                    validate: (file) => {
                                        return file[0].type.startsWith("video/")
                                            ? true
                                            : "Only video files are allowed";
                                    },
                                })}
                            />
                            {errors.file && (
                                <label className="label">
                                    <span className="label-text-alt text-error whitespace-normal">
                                        {errors.file.message}
                                    </span>
                                </label>
                            )}
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="space-y-6">
                                <div className="form-control w-full">
                                    <label className="label mb-2">
                                        <span className="label-text text-lg font-semibold flex items-center gap-2">
                                            <FiBook className="text-xl" />
                                            Lecture Title
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter lecture title"
                                        className="input input-bordered input-lg w-full"
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
                                    {errors.title && (
                                        <label className="label">
                                            <span className="label-text-alt text-error whitespace-normal">
                                                {errors.title.message}
                                            </span>
                                        </label>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="form-control w-full mt-6">
                            <label className="label mb-2">
                                <span className="label-text text-lg font-semibold flex items-center gap-2">
                                    <BsTextParagraph className="text-xl" />
                                    Lecture Description
                                </span>
                            </label>
                            <Controller
                                name="description"
                                control={control}
                                rules={{
                                    required: "Lecture description is required",
                                    validate: (value) =>
                                        value.replace(/<[^>]+>/g, "").length >=
                                            50 ||
                                        "Description must be at least 50 characters",
                                }}
                                render={({ field }) => (
                                    <>
                                        <Editor
                                            apiKey={
                                                import.meta.env
                                                    .VITE_TINY_MCE_KEY
                                            }
                                            init={{
                                                height: 300,
                                                menubar: false,
                                                contextmenu: "paste copy cut",
                                                plugins: [
                                                    "advlist",
                                                    "autolink",
                                                    "lists",
                                                    "link",
                                                    "image",
                                                    "charmap",
                                                    "preview",
                                                    "anchor",
                                                    "searchreplace",
                                                    "visualblocks",
                                                    "code",
                                                    "fullscreen",
                                                    "insertdatetime",
                                                    "media",
                                                    "table",
                                                    "help",
                                                    "wordcount",
                                                ],
                                                toolbar:
                                                    "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | help",
                                                content_style:
                                                    "body { font-family: Inter, sans-serif; font-size: 18px }",
                                            }}
                                            onEditorChange={(content) =>
                                                field.onChange(content)
                                            }
                                        />
                                        {errors.description && (
                                            <label className="label">
                                                <span className="label-text-alt text-error whitespace-normal">
                                                    {errors.description.message}
                                                </span>
                                            </label>
                                        )}
                                    </>
                                )}
                            />
                        </div>
                        <div className="card-actions justify-center mt-8">
                            <button
                                type="submit"
                                className="btn btn-warning btn-lg w-full md:w-1/2 gap-2"
                            >
                                <AiOutlineCloudUpload className="text-xl" />
                                Upload Lecture
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </HomeLayout>
    );
}

export default CreateLecture;
