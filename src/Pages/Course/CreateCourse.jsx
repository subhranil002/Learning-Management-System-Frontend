import { Editor } from "@tinymce/tinymce-react";
import { Controller, useForm } from "react-hook-form";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsCurrencyDollar, BsTag, BsTextParagraph } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa";
import { FiBook } from "react-icons/fi";
import { GrMoney } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { createNewCourse } from "../../Redux/Slices/CourseSlice";

function CreateCourse() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
    } = useForm();
    const selectedFile = watch("file")?.[0];

    async function onSubmit(data) {
        const categoriesArray = data.category
            .split(",")
            .map((item) => item.trim().toUpperCase())
            .filter((item) => item.length > 0);

        const res = await dispatch(
            createNewCourse({
                ...data,
                category: categoriesArray,
                price: {
                    amount: data.amount,
                    currency: data.currency,
                },
            })
        );
        if (res.payload.success) {
            navigate("/courses");
        }
    }

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
                            Create New Course
                        </h1>
                        <div className="form-control w-full mb-8">
                            <label className="label mb-2">
                                <span className="label-text text-lg font-semibold flex items-center gap-2">
                                    <AiOutlineCloudUpload className="text-xl" />
                                    Course Thumbnail
                                </span>
                            </label>
                            <label
                                htmlFor="image_uploads"
                                className="group relative block w-full rounded-box overflow-hidden cursor-pointer bg-base-200"
                                style={{ paddingTop: "60%" }}
                            >
                                <div className="absolute inset-0 flex items-center justify-center">
                                    {selectedFile?.type?.startsWith(
                                        "image/"
                                    ) ? (
                                        <div className="relative w-full h-full">
                                            <img
                                                className="w-full h-full object-cover rounded-box"
                                                src={URL.createObjectURL(
                                                    selectedFile
                                                )}
                                                alt="Course thumbnail"
                                            />
                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-box opacity-0 group-hover:opacity-100 transition-opacity">
                                                <AiOutlineCloudUpload className="text-3xl text-white" />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-2 p-4 text-center">
                                            <AiOutlineCloudUpload className="text-4xl text-base-content/50 group-hover:text-primary transition-colors" />
                                            <p className="font-medium">
                                                Click to upload thumbnail
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </label>
                            <input
                                className="hidden"
                                type="file"
                                id="image_uploads"
                                accept=".jpg, .jpeg, .png"
                                {...register("file", {
                                    required: "Thumbnail is required",
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
                            <div className="space-y-6">
                                <div className="form-control w-full">
                                    <label className="label mb-2">
                                        <span className="label-text text-lg font-semibold flex items-center gap-2">
                                            <FiBook className="text-xl" />
                                            Course Title
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter course title"
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
                                <div className="form-control w-full">
                                    <label className="label mb-2">
                                        <span className="label-text text-lg font-semibold flex items-center gap-2">
                                            <BsTag className="text-xl" />
                                            Course Category
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter comma separated categories"
                                        className="input input-bordered input-lg w-full"
                                        {...register("category", {
                                            required: "Category is required",
                                            minLength: {
                                                value: 3,
                                                message:
                                                    "Category must be at least 3 characters",
                                            },
                                            maxLength: {
                                                value: 50,
                                                message:
                                                    "Category must be at most 50 characters",
                                            },
                                        })}
                                    />
                                    {errors.category && (
                                        <label className="label">
                                            <span className="label-text-alt text-error whitespace-normal">
                                                {errors.category.message}
                                            </span>
                                        </label>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="form-control w-full">
                                    <label className="label mb-2">
                                        <span className="label-text text-lg font-semibold flex items-center gap-2">
                                            <GrMoney className="text-xl" />
                                            Course Price
                                        </span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Enter course price"
                                        className="input input-bordered input-lg w-full"
                                        {...register("amount", {
                                            required: "Amount is required",
                                            min: {
                                                value: 0,
                                                message:
                                                    "Price must be at least 0",
                                            },
                                            max: {
                                                value: 10000,
                                                message:
                                                    "Price must be at most 10000",
                                            },
                                        })}
                                    />
                                    {errors.amount && (
                                        <label className="label">
                                            <span className="label-text-alt text-error whitespace-normal">
                                                {errors.amount.message}
                                            </span>
                                        </label>
                                    )}
                                </div>
                                <div className="form-control w-full">
                                    <label className="label mb-2">
                                        <span className="label-text text-lg font-semibold flex items-center gap-2">
                                            <BsCurrencyDollar className="text-xl" />
                                            Select Currency
                                        </span>
                                    </label>
                                    <select
                                        className="select select-bordered select-lg w-full"
                                        {...register("currency", {
                                            required: "Currency is required",
                                        })}
                                    >
                                        <option selected value="INR">
                                            INR (₹)
                                        </option>
                                        <option value="USD">USD ($)</option>
                                        <option value="EUR">EUR (€)</option>
                                    </select>
                                    {errors.currency && (
                                        <label className="label">
                                            <span className="label-text-alt text-error whitespace-normal">
                                                {errors.currency.message}
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
                                    Course Description
                                </span>
                            </label>
                            <Controller
                                name="description"
                                control={control}
                                rules={{
                                    required: "Course description is required",
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
                                Publish Course
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </HomeLayout>
    );
}

export default CreateCourse;
