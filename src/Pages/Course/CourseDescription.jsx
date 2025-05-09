import parser from "html-react-parser";
import { useEffect } from "react";
import {
    FaArrowLeft,
    FaCheck,
    FaCoins,
    FaEdit,
    FaExclamationTriangle,
    FaFilm,
    FaInfoCircle,
    FaList,
    FaPlay,
    FaShoppingCart,
    FaSync,
    FaTag,
    FaTrash,
    FaUserTie,
} from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { deleteCourse } from "../../Redux/Slices/CourseSlice";

const EnrollmentModal = ({ state, closeModal, navigate }) => (
    <div className="modal-box bg-base-100 border border-primary/20 shadow-xl mx-2 max-w-md">
        <div className="flex flex-col items-center text-center space-y-4">
            <div className="text-warning mb-4">
                <FaShoppingCart className="text-4xl animate-pulse" />
            </div>
            <h3 className="font-bold text-xl sm:text-2xl flex items-center gap-2">
                Choose Enrollment Type
            </h3>
            <div className="w-full space-y-4 py-4">
                <button
                    onClick={() => {
                        closeModal();
                        navigate("/checkout", {
                            state: {
                                course: state,
                                type: "lifetime",
                            },
                        });
                    }}
                    className="btn md:btn-outline btn-primary btn-md md:btn-lg gap-2 w-full"
                >
                    <FaCoins className="text-xl" />
                    Lifetime Access
                    <span className="badge badge-primary badge-sm ml-2">
                        {state?.price?.amount}&nbsp;
                        {state?.price?.currency} Only
                    </span>
                </button>
                <button
                    onClick={() => {
                        closeModal();
                        navigate("/checkout", {
                            state: {
                                type: "subscription",
                            },
                        });
                    }}
                    className="btn md:btn-outline btn-secondary btn-md md:btn-lg gap-2 w-full"
                >
                    <FaSync className="text-xl" />
                    {import.meta.env.VITE_SUBSCRIPTION_PERIOD}ly Subscription
                    <span className="badge badge-secondary badge-sm ml-2">
                        ₹{import.meta.env.VITE_SUBSCRIPTION_OFFER_PRICE}
                        /month
                    </span>
                </button>
            </div>
            <div className="modal-action mt-4 w-full">
                <button
                    className="btn btn-outline btn-sm sm:btn-md md:btn-lg w-full"
                    onClick={closeModal}
                >
                    Close
                </button>
            </div>
        </div>
    </div>
);

const DeleteCourseModal = ({ closeModal, handleDeleteCourse }) => (
    <div className="modal-box bg-base-100 border border-error/20 shadow-xl mx-2">
        <div className="flex flex-col items-center text-center space-y-4">
            <div className="text-error mb-2 sm:mb-4">
                <FaExclamationTriangle className="text-4xl sm:text-5xl animate-pulse" />
            </div>
            <h3 className="font-bold text-xl sm:text-2xl flex items-center gap-2">
                Delete Course Permanently?
            </h3>
            <p className="py-2 sm:py-4 text-base sm:text-lg text-base-content/80">
                This will remove all course content, lectures, and student
                access.
                <br />
                <span className="text-error font-semibold mt-1 sm:mt-2 block text-sm sm:text-base">
                    This action cannot be undone!
                </span>
            </p>
            <div className="modal-action flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 w-full">
                <button
                    className="btn btn-outline btn-sm sm:btn-md md:btn-lg gap-2"
                    onClick={closeModal}
                >
                    Cancel
                </button>
                <button
                    onClick={() => {
                        closeModal();
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
);

function CourseDescription() {
    const { state } = useLocation();
    const { role, data } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!state) navigate("/courses");
    }, []);

    const isCreatorOrAdmin =
        (role === "TEACHER" && state?.createdBy?._id === data?._id) ||
        role === "ADMIN";

    const canAccessContent =
        role === "TEACHER" ||
        role === "ADMIN" ||
        data?.subscription?.status === "active" ||
        data?.coursesPurchased?.includes(state?._id);

    async function handleDeleteCourse() {
        await dispatch(deleteCourse(state._id));
        navigate("/courses");
    }

    const closeEnrollmentModal = () =>
        document.getElementById("enrollment-options-modal").close();
    const closeDeleteModal = () =>
        document.getElementById("course-delete-modal").close();

    return (
        <HomeLayout>
            <dialog id="enrollment-options-modal" className="modal">
                <EnrollmentModal
                    state={state}
                    closeModal={closeEnrollmentModal}
                    navigate={navigate}
                />
            </dialog>

            <dialog id="course-delete-modal" className="modal">
                <DeleteCourseModal
                    closeModal={closeDeleteModal}
                    handleDeleteCourse={handleDeleteCourse}
                />
            </dialog>

            <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 py-8 sm:py-12 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between mb-4 sm:mb-6">
                        <button
                            onClick={() => navigate(-1)}
                            className="btn btn-neutral hidden sm:flex btn-md gap-2"
                        >
                            <FaArrowLeft className="text-sm sm:text-lg" />
                            Back
                        </button>
                        {isCreatorOrAdmin && (
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-max">
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
                        )}
                    </div>

                    <div className="text-center mb-8 space-y-2">
                        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-warning mb-2">
                            {state?.title || "Untitled Course"}
                        </h1>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                        <div className="w-full lg:w-2/3 xl:w-1/2">
                            <div className="aspect-video relative rounded-2xl overflow-hidden shadow-2xl hover:shadow-primary/20 transition-shadow">
                                {state?.thumbnail?.secure_url ? (
                                    <img
                                        src={state.thumbnail.secure_url}
                                        alt={`${state.title} thumbnail`}
                                        className="w-full h-full object-cover hover:scale-102 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-base-300 flex items-center justify-center">
                                        <p className="text-lg opacity-50">
                                            No thumbnail available
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="mt-6 card bg-base-100 border border-base-content/10 shadow-xl">
                                <div className="card-body p-6">
                                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="text-3xl text-primary">
                                                <FaFilm />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold">
                                                    {state?.numbersOfLectures ||
                                                        0}{" "}
                                                    Lectures
                                                </h3>
                                                <p className="text-sm opacity-75">
                                                    Complete course program
                                                </p>
                                            </div>
                                        </div>

                                        {canAccessContent ? (
                                            state?.lectures?.length > 0 ? (
                                                <button
                                                    onClick={() =>
                                                        navigate(
                                                            "/courses/lectures",
                                                            {
                                                                state: {
                                                                    ...state,
                                                                },
                                                            }
                                                        )
                                                    }
                                                    className="btn btn-info btn-lg gap-2 min-w-[200px] hover:scale-105 transition-transform"
                                                >
                                                    <FaPlay className="text-xl" />{" "}
                                                    Start Watching
                                                </button>
                                            ) : (
                                                state?.lectures?.length === 0 &&
                                                isCreatorOrAdmin && (
                                                    <button
                                                        onClick={() =>
                                                            navigate(
                                                                "/courses/lectures/add",
                                                                {
                                                                    state,
                                                                }
                                                            )
                                                        }
                                                        className="btn btn-neutral btn-lg gap-2 min-w-[200px] hover:scale-105 transition-transform"
                                                    >
                                                        <IoIosAddCircle className="text-xl" />{" "}
                                                        Add Lectures
                                                    </button>
                                                )
                                            )
                                        ) : (
                                            <button
                                                onClick={() =>
                                                    document
                                                        .getElementById(
                                                            "enrollment-options-modal"
                                                        )
                                                        .showModal()
                                                }
                                                className="btn btn-secondary btn-lg gap-2 min-w-[200px] hover:scale-105 transition-transform"
                                            >
                                                <FaShoppingCart className="text-xl" />
                                                Enroll Now
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {state?.lectures?.length > 0 && (
                                <div className="card bg-base-100 border border-base-content/10 shadow-xl mt-6">
                                    <div className="card-body p-6">
                                        <div className="flex items-center gap-3 mb-4">
                                            <FaList className="text-2xl text-primary" />
                                            <h2 className="card-title text-2xl">
                                                Lecture Planning
                                            </h2>
                                        </div>
                                        <div className="space-y-4">
                                            {state.lectures.map(
                                                (lecture, index) => {
                                                    return (
                                                        <div
                                                            key={
                                                                lecture._id ||
                                                                index
                                                            }
                                                            className="collapse sm:collapse-arrow bg-base-200 hover:bg-base-300 transition-colors"
                                                        >
                                                            <input type="checkbox" />
                                                            <div className="collapse-title text-lg font-medium text-info">
                                                                Lecture{" "}
                                                                {index + 1}:{" "}
                                                                {lecture.title ||
                                                                    "Untitled Lecture"}
                                                            </div>
                                                            <div className="collapse-content">
                                                                <span className="prose max-w-none">
                                                                    {parser(
                                                                        lecture.description
                                                                    )}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
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
                                                        Instructor
                                                    </h3>
                                                    <p className="opacity-90 capitalize text-secondary font-bold">
                                                        {state?.createdBy
                                                            ?.name || "Unknown"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-base-200 rounded-lg p-4">
                                            <div className="flex items-center gap-3">
                                                <FaTag className="text-xl text-primary" />
                                                <div>
                                                    <h3 className="font-bold text-lg">
                                                        Categories
                                                    </h3>
                                                    <p className="opacity-90 capitalize text-secondary font-bold">
                                                        {state?.category
                                                            ?.length > 0
                                                            ? state.category.join(
                                                                  ", "
                                                              )
                                                            : "Uncategorized"}
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
