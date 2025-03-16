import parser from "html-react-parser";
import { useEffect } from "react";
import {
    FaFilm,
    FaInfoCircle,
    FaPlay,
    FaShoppingCart,
    FaUserTie,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";

function CourseDescription() {
    const { state } = useLocation();
    const { role, data } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!state) navigate("/courses");
    }, []);

    return (
        <HomeLayout>
            <div className="min-h-[90vh] bg-gradient-to-br from-base-200 to-base-300 py-12 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
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
                                        <p className="leading-relaxed opacity-90 mb-6">
                                            {parser(state?.description)}
                                        </p>
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
