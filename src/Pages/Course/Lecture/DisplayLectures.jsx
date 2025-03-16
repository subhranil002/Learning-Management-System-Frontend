import parser from "html-react-parser";
import { useEffect, useRef, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
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
    const { role } = useSelector((state) => state.auth);
    const [currentVideo, setCurrentVideo] = useState(0);
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
            <div className="drawer lg:drawer-open">
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
                        <h1 className="text-xl text-warning font-bold">{state?.title}</h1>
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
                            <p className="text-base-content/80 leading-relaxed">
                                {parser(lectures?.[currentVideo]?.description ||
                                    "No description available")}
                            </p>
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
                        <h1 className="text-2xl text-warning hidden lg:block font-bold mb-5">
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
                        {role === "TEACHER" || role === "ADMIN" && (
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
                                        {role === "TEACHER" || role === "ADMIN" && (
                                            <button
                                                onClick={() =>
                                                    onLectureDelete(
                                                        state?._id,
                                                        lecture?._id
                                                    )
                                                }
                                                className="btn btn-error btn-xs"
                                            >
                                                Delete
                                            </button>
                                        )}
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
