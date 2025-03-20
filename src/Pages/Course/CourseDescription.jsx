import parser from "html-react-parser";
import { useEffect } from "react";
import {
    FaCheck,
    FaEdit,
    FaExclamationTriangle,
    FaFilm,
    FaInfoCircle,
    FaPlay,
    FaShoppingCart,
    FaTrash,
    FaUserTie,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { deleteCourse } from "../../Redux/Slices/CourseSlice";

function CourseDescription() {
    const { state } = useLocation();
    const { role, data } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!state) navigate("/courses");
    }, []);

    async function handleDeleteCourse() {
        await dispatch(deleteCourse(state._id));
        navigate("/courses");
    }

    return (
        <HomeLayout>
            <dialog id="course-delete-modal" className="modal">
                <div className="modal-box bg-base-100 border border-error/20 shadow-xl mx-2">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="text-error mb-2 sm:mb-4">
                            <FaExclamationTriangle className="text-4xl sm:text-5xl animate-pulse" />
                        </div>
                        <h3 className="font-bold text-xl sm:text-2xl flex items-center gap-2">
                            Delete Course Permanently?
                        </h3>
                        <p className="py-2 sm:py-4 text-base sm:text-lg text-base-content/80">
                            This will remove all course content, lectures, and
                            student access.
                            <br />
                            <span className="text-error font-semibold mt-1 sm:mt-2 block text-sm sm:text-base">
                                This action cannot be undone!
                            </span>
                        </p>
                        <div className="modal-action flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 w-full">
                            <button
                                className="btn btn-outline btn-sm sm:btn-md md:btn-lg gap-2"
                                onClick={() =>
                                    document
                                        .getElementById("course-delete-modal")
                                        .close()
                                }
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    document
                                        .getElementById("course-delete-modal")
                                        .close();
                                    handleDeleteCourse();
                                }}
                                className="btn btn-error btn-sm sm:btn-md md:btn-lg gap-2"
                            >
                                <FaCheck />
                                Confirm Delete
                            </button>
                        </div>
                    </div>
                </div>
            </dialog>
            <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 py-8 sm:py-12 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    {(role === "TEACHER" &&
                        state?.createdBy?._id === data?._id) ||
                        (role === "ADMIN" && (
                            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4 mb-4 sm:mb-6">
                                <button
                                    onClick={() =>
                                        navigate("/courses/edit", { state })
                                    }
                                    className="btn btn-info btn-sm sm:btn-md gap-2"
                                >
                                    <FaEdit className="text-sm sm:text-lg" />
                                    Edit Course
                                </button>
                                <button
                                    onClick={() =>
                                        document
                                            .getElementById(
                                                "course-delete-modal"
                                            )
                                            .showModal()
                                    }
                                    className="btn btn-error btn-sm sm:btn-md gap-2"
                                >
                                    <FaTrash className="text-sm sm:text-lg" />
                                    Delete Course
                                </button>
                            </div>
                        ))}
                    <div className="text-center mb-8 space-y-2">
                        <h1 className="text-4xl md:text-5xl font-bold text-warning mb-2">
                            {state?.title}
                        </h1>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                        <div className="w-full lg:w-2/3 xl:w-1/2">
                            <div className="aspect-video relative rounded-2xl overflow-hidden shadow-2xl hover:shadow-primary/20 transition-shadow">
                                <img
                                    src={state?.thumbnail?.secure_url}
                                    alt="Course thumbnail"
                                    className="w-full h-full object-cover hover:scale-102 transition-transform duration-300"
                                />
                            </div>
                            <div className="mt-6 card bg-base-100 border border-base-content/10 shadow-xl">
                                <div className="card-body p-6">
                                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="text-3xl text-warning">
                                                <FaFilm />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold">
                                                    {state?.numbersOfLectures}{" "}
                                                    Lectures
                                                </h3>
                                                <p className="text-sm opacity-75">
                                                    Complete course program
                                                </p>
                                            </div>
                                        </div>
                                        {role === "TEACHER" ||
                                        role === "ADMIN" ||
                                        data?.subscription?.status ===
                                            "active" ? (
                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        "/courses/lectures",
                                                        { state: { ...state } }
                                                    )
                                                }
                                                className="btn btn-info btn-lg gap-2 min-w-[200px] hover:scale-105 transition-transform"
                                            >
                                                <FaPlay className="text-xl" />{" "}
                                                Start Watching
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() =>
                                                    navigate("/checkout")
                                                }
                                                className="btn btn-secondary btn-lg gap-2 min-w-[200px] hover:scale-105 transition-transform"
                                            >
                                                <FaShoppingCart className="text-xl" />{" "}
                                                Enroll Now
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/3 xl:w-1/2">
                            <div className="sticky top-24 space-y-6">
                                <div className="card bg-base-100 border border-base-content/10">
                                    <div className="card-body">
                                        <div className="flex items-center gap-3 mb-4">
                                            <FaInfoCircle className="text-2xl text-primary" />
                                            <h2 className="card-title text-2xl">
                                                Course Details
                                            </h2>
                                        </div>
                                        <span className="leading-relaxed opacity-90 mb-6">
                                            {parser(state?.description)}
                                        </span>
                                        <div className="bg-base-200 rounded-lg p-4">
                                            <div className="flex items-center gap-3">
                                                <FaUserTie className="text-xl text-primary" />
                                                <div>
                                                    <h3 className="font-bold text-lg">
                                                        Course Instructor
                                                    </h3>
                                                    <p className="opacity-90 capitalize">
                                                        {state?.createdBy?.name}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default CourseDescription;
