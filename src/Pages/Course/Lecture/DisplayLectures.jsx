import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../../Layouts/HomeLayout";
import {
    deleteLecture,
    getLecturesByCourse,
} from "../../../Redux/Slices/lectureSlice";

function Displaylectures() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { state } = useLocation();
    const { lectures } = useSelector((state) => state.lecture);
    const { role } = useSelector((state) => state.auth);

    async function getLectures() {
        await dispatch(getLecturesByCourse(state._id));
    }

    const [currentVideo, setCurrentVideo] = useState(0);

    async function onLectureDelete(courseId, lectureId) {
        await dispatch(
            deleteLecture({ courseId: courseId, lectureId: lectureId })
        );
        await dispatch(getLecturesByCourse(courseId));
    }

    useEffect(() => {
        if (!state) navigate("/courses");
        getLectures();
    }, []);

    return (
        <HomeLayout>
            <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-wihte mx-[5%]">
                <div className="text-center text-2xl font-semibold text-yellow-500">
                    Course Name: {state?.title}
                </div>

                <div className="flex justify-center gap-10 w-full">
                    <div className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
                        <video
                            src={
                                lectures &&
                                lectures[currentVideo]?.lecture?.secure_url
                            }
                            className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                            controls
                            disablePictureInPicture
                            controlsList="nodownload"
                        ></video>
                        <div>
                            <h1>
                                <span className="text-yellow-500">
                                    {" "}
                                    Title:{" "}
                                </span>
                                {lectures && lectures[currentVideo]?.title}
                            </h1>
                            <p>
                                <span className="text-yellow-500 line-clamp-4">
                                    Description:{" "}
                                </span>
                                {lectures &&
                                    lectures[currentVideo]?.description}
                            </p>
                        </div>
                    </div>

                    <ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4">
                        <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
                            <p>Lectures list</p>
                            {role === "ADMIN" && (
                                <button
                                    onClick={() =>
                                        navigate("/courses/lectures/add", {
                                            state: { ...state },
                                        })
                                    }
                                    className="btn btn-primary px-2 py-1 rounded-md font-semibold text-sm"
                                >
                                    Add new lecture
                                </button>
                            )}
                        </li>
                        {lectures &&
                            lectures.map((lecture, idx) => {
                                return (
                                    <li className="space-y-2" key={lecture._id}>
                                        <p
                                            className="cursor-pointer"
                                            onClick={() => setCurrentVideo(idx)}
                                        >
                                            <span> Lecture {idx + 1} : </span>
                                            {lecture?.title}
                                        </p>
                                        {role === "ADMIN" && (
                                            <button
                                                onClick={() =>
                                                    onLectureDelete(
                                                        state?._id,
                                                        lecture?._id
                                                    )
                                                }
                                                className="btn btn-accent px-2 py-1 rounded-md font-semibold text-sm"
                                            >
                                                Delete lecture
                                            </button>
                                        )}
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            </div>
        </HomeLayout>
    );
}

export default Displaylectures;
