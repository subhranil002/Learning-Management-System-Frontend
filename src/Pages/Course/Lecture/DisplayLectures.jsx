import parser from "html-react-parser";
import { useEffect, useRef, useState } from "react";
import {
    AiOutlineArrowLeft,
    AiOutlineArrowRight,
    AiOutlineClose,
} from "react-icons/ai";
import {
    FaCheck,
    FaEdit,
    FaExclamationTriangle,
    FaRegFolderOpen,
} from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { RiMenuFold2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import VideoPlayer from "../../../Components/VideoPlayer";
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
        setCurrentVideo(0);
    }

    const handleNavigation = (direction) => {
        if (direction === "prev" && currentVideo > 0) {
            setCurrentVideo((prev) => prev - 1);
        } else if (
            direction === "next" &&
            currentVideo < lectures?.length - 1
        ) {
            setCurrentVideo((prev) => prev + 1);
        }
    };

    useEffect(() => {
        if (!state) navigate("/courses");
        (async () => {
            await dispatch(getLecturesByCourse(state._id));
        })();
    }, []);

    return (
        <>
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
            <div className="drawer lg:drawer-open md:px-4">
                <input
                    id="lecture-drawer"
                    type="checkbox"
                    className="drawer-toggle"
                    ref={inputRef}
                />
                <div className="drawer-content flex flex-col min-h-[90vh]">
                    <header className="navbar bg-base-100 shadow-md px-4 lg:hidden">
                        <div className="flex-none">
                            <button
                                onClick={() => navigate(-1)}
                                className="btn btn-ghost gap-2 text-xl"
                            >
                                <AiOutlineArrowLeft />
                            </button>
                        </div>
                        <div className="flex-1">
                            <h1 className="text-xl font-bold line-clamp-1">
                                {state?.title}
                            </h1>
                        </div>
                        <div className="flex-none">
                            <label
                                htmlFor="lecture-drawer"
                                className="btn btn-ghost drawer-button"
                            >
                                <RiMenuFold2Fill className="text-xl" />
                            </label>
                        </div>
                    </header>
                    <div className="flex-1 p-4 lg:p-6">
                        {lectures && lectures.length > 0 ? (
                            <>
                                <div className="relative aspect-video bg-neutral rounded-xl overflow-hidden shadow-2xl">
                                    <VideoPlayer
                                        hlsUrl={
                                            lectures?.[currentVideo]?.lecture
                                                ?.playback_url
                                        }
                                        mp4Url={
                                            lectures?.[currentVideo]?.lecture
                                                ?.secure_url
                                        }
                                        handleEnded={() =>
                                            handleNavigation("next")
                                        }
                                        config={{
                                            file: {
                                                attributes: {
                                                    disablePictureInPicture: true,
                                                    controlsList: "nodownload",
                                                },
                                            },
                                        }}
                                        playing
                                        controls
                                        playsinline
                                        width="100%"
                                        height="100%"
                                    />
                                </div>
                                <div className="flex justify-between gap-4 mt-4">
                                    <button
                                        onClick={() => handleNavigation("prev")}
                                        disabled={currentVideo === 0}
                                        className="btn btn-success btn-sm sm:btn-md flex-1 gap-2"
                                    >
                                        <AiOutlineArrowLeft className="text-lg" />
                                        Previous
                                    </button>
                                    <button
                                        onClick={() => handleNavigation("next")}
                                        disabled={
                                            currentVideo === lectures.length - 1
                                        }
                                        className="btn btn-warning btn-sm sm:btn-md flex-1 gap-2"
                                    >
                                        Next
                                        <AiOutlineArrowRight className="text-lg" />
                                    </button>
                                </div>
                                <div className="mt-6 bg-base-200 rounded-box p-6 shadow">
                                    <h2 className="text-2xl font-bold mb-4 whitespace-normal flex items-center gap-3">
                                        <span className="badge badge-info lg:hidden">
                                            {currentVideo + 1}
                                        </span>
                                        {lectures?.[currentVideo]?.title}
                                    </h2>
                                    <span className="text-base-content/80 leading-relaxed whitespace-normal">
                                        {parser(
                                            lectures?.[currentVideo]
                                                ?.description ||
                                                "No description available"
                                        )}
                                    </span>
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full min-h-[60vh]">
                                <div className="text-center max-w-md p-6">
                                    <FaRegFolderOpen className="text-6xl text-neutral-content mx-auto mb-4" />
                                    <h2 className="text-2xl font-bold mb-2">
                                        No Lectures Available
                                    </h2>
                                    <p className="text-base-content/70 mb-6">
                                        This course doesn&apos;t have any
                                        lectures yet
                                    </p>
                                    {((role === "TEACHER" &&
                                        state?.createdBy?._id === data?._id) ||
                                        role === "ADMIN") && (
                                        <button
                                            onClick={() =>
                                                navigate(
                                                    "/courses/lectures/add",
                                                    { state }
                                                )
                                            }
                                            className="btn btn-error gap-2"
                                        >
                                            <IoIosAddCircle className="text-xl" />
                                            Add First Lecture
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="drawer-side z-50">
                    <label
                        htmlFor="lecture-drawer"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                    ></label>
                    <div className="menu bg-base-200 text-base-content w-80 h-screen p-4">
                        <div className="gap-3 items-center mb-6 hidden lg:flex">
                            <button
                                onClick={() => navigate(-1)}
                                className="btn btn-ghost btn-xs text-2xl btn-square ml-[-5px]"
                            >
                                <AiOutlineArrowLeft />
                            </button>
                            <h1 className="text-2xl font-bold line-clamp-1">
                                {state?.title}
                            </h1>
                        </div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Lectures</h2>
                            <label
                                htmlFor="lecture-drawer"
                                className="lg:hidden btn btn-ghost btn-sm"
                            >
                                <AiOutlineClose className="text-xl" />
                            </label>
                        </div>
                        {((lectures &&
                            lectures.length > 0 &&
                            role === "TEACHER" &&
                            state?.createdBy?._id === data?._id) ||
                            role === "ADMIN") && (
                            <button
                                onClick={() =>
                                    navigate("/courses/lectures/add", { state })
                                }
                                className="btn btn-neutral btn-block mb-6"
                            >
                                <IoIosAddCircle className="text-xl" />
                                Add New Lecture
                            </button>
                        )}
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
                                        {((role === "TEACHER" &&
                                            state?.createdBy?._id ===
                                                data?._id) ||
                                            role === "ADMIN") && (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
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
                                                    onClick={(e) => {
                                                        e.stopPropagation();
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
                                        )}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Displaylectures;
