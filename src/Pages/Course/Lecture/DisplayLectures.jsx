import parser from "html-react-parser";
import { useEffect, useRef, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaCheck, FaEdit, FaExclamationTriangle } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../../Layouts/HomeLayout";
import {
    deleteLecture,
    getLecturesByCourse,
} from "../../../Redux/Slices/LectureSlice";

function Displaylectures() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { state } = useLocation();
    const { lectures } = useSelector((state) => state.lecture);
    const { role, data } = useSelector((state) => state.auth);
    const [currentVideo, setCurrentVideo] = useState(0);
    const [lectureToDelete, setLectureToDelete] = useState({
        courseId: null,
        lectureId: null,
    });
    const inputRef = useRef();

    async function onLectureDelete(courseId, lectureId) {
        await dispatch(deleteLecture({ courseId, lectureId }));
        await dispatch(getLecturesByCourse(courseId));
    }

    useEffect(() => {
        if (!state) navigate("/courses");
        (async () => {
            await dispatch(getLecturesByCourse(state._id));
        })();
    }, []);

    return (
        <HomeLayout>
            <dialog id="lecture-delete-modal" className="modal">
                <div className="modal-box bg-base-100 border border-error/20 shadow-xl mx-2">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="text-error mb-2 sm:mb-4">
                            <FaExclamationTriangle className="text-4xl sm:text-5xl animate-pulse" />
                        </div>
                        <h3 className="font-bold text-xl sm:text-2xl flex items-center gap-2">
                            Delete Lecture Permanently?
                        </h3>
                        <p className="py-2 sm:py-4 text-base sm:text-lg text-base-content/80">
                            This will remove the lecture from the course.
                            <br />
                            <span className="text-error font-semibold mt-1 sm:mt-2 block text-sm sm:text-base">
                                This action cannot be undone!
                            </span>
                        </p>
                        <div className="modal-action flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 w-full">
                            <button
                                className="btn btn-outline btn-sm sm:btn-md gap-2"
                                onClick={() =>
                                    document
                                        .getElementById("lecture-delete-modal")
                                        .close()
                                }
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    document
                                        .getElementById("lecture-delete-modal")
                                        .close();
                                    onLectureDelete(
                                        lectureToDelete.courseId,
                                        lectureToDelete.lectureId
                                    );
                                }}
                                className="btn btn-error btn-sm sm:btn-md gap-2"
                            >
                                <FaCheck />
                                Confirm Delete
                            </button>
                        </div>
                    </div>
                </div>
            </dialog>
            <div className="drawer lg:drawer-open md:px-4 ">
                <input
                    id="lecture-drawer"
                    type="checkbox"
                    className="drawer-toggle"
                    ref={inputRef}
                />
                <div className="drawer-content flex flex-col min-h-[90vh]">
                    <div className="lg:hidden flex justify-between items-center p-4 bg-base-200">
                        <label
                            htmlFor="lecture-drawer"
                            className="btn btn-ghost drawer-button"
                        >
                            <AiOutlineMenu className="text-2xl" />
                        </label>
                        <h1
                            onClick={() => navigate(-1)}
                            className="text-2xl text-warning font-bold cursor-pointer"
                        >
                            {state?.title}
                        </h1>
                    </div>
                    <div className="flex-1 p-4 lg:p-6">
                        <div className="relative aspect-video bg-neutral rounded-xl overflow-hidden shadow-2xl">
                            <video
                                src={
                                    lectures?.[currentVideo]?.lecture
                                        ?.secure_url
                                }
                                className="w-full h-full object-contain"
                                controls
                                disablePictureInPicture
                                controlsList="nodownload"
                            />
                        </div>
                        <div className="mt-6 bg-base-200 rounded-box p-6 shadow">
                            <h2 className="text-2xl font-bold mb-4">
                                {lectures?.[currentVideo]?.title}
                            </h2>
                            <span className="text-base-content/80 leading-relaxed">
                                {parser(
                                    lectures?.[currentVideo]?.description ||
                                        "No description available"
                                )}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="drawer-side z-50">
                    <label
                        htmlFor="lecture-drawer"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                    ></label>
                    <div className="menu bg-base-200 text-base-content w-80 min-h-full p-4">
                        <h1
                            onClick={() => navigate(-1)}
                            className="text-2xl text-warning hidden lg:block font-bold mb-5 cursor-pointer"
                        >
                            {state?.title}
                        </h1>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Lectures</h2>
                            <label
                                htmlFor="lecture-drawer"
                                className="lg:hidden btn btn-ghost btn-sm"
                            >
                                <AiOutlineClose className="text-xl" />
                            </label>
                        </div>
                        {(role === "TEACHER" &&
                            state?.createdBy?._id === data?._id) ||
                            (role === "ADMIN" && (
                                <button
                                    onClick={() =>
                                        navigate("/courses/lectures/add", {
                                            state,
                                        })
                                    }
                                    className="btn btn-neutral btn-block mb-6"
                                >
                                    <IoIosAddCircle className="text-xl" />
                                    Add New Lecture
                                </button>
                            ))}
                        <ul className="space-y-2">
                            {lectures?.map((lecture, idx) => (
                                <li key={lecture._id}>
                                    <a
                                        className={`flex items-center justify-between p-3 rounded-lg ${
                                            currentVideo === idx
                                                ? "bg-info text-info-content"
                                                : ""
                                        }`}
                                        onClick={() => {
                                            setCurrentVideo(idx);
                                            if (inputRef.current) {
                                                inputRef.current.checked = false;
                                            }
                                        }}
                                    >
                                        <div className="flex items-center gap-3 text-base font-semibold">
                                            <span className="badge badge-neutral">
                                                {idx + 1}
                                            </span>
                                            <span className="line-clamp-1">
                                                {lecture.title}
                                            </span>
                                        </div>
                                        {(role === "TEACHER" &&
                                            state?.createdBy?._id ===
                                                data?._id) ||
                                            (role === "ADMIN" && (
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => {
                                                            navigate(
                                                                "/courses/lectures/edit",
                                                                {
                                                                    state: {
                                                                        course: state,
                                                                        lecture:
                                                                            lecture,
                                                                    },
                                                                }
                                                            );
                                                        }}
                                                        className="btn btn-warning btn-xs gap-1"
                                                    >
                                                        <FaEdit className="text-xs" />
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setLectureToDelete({
                                                                courseId:
                                                                    state?._id,
                                                                lectureId:
                                                                    lecture?._id,
                                                            });
                                                            document
                                                                .getElementById(
                                                                    "lecture-delete-modal"
                                                                )
                                                                .showModal();
                                                        }}
                                                        className="btn btn-error btn-xs gap-1"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            ))}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default Displaylectures;
