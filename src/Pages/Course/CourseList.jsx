import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import CourseCard from "../../Components/CourseCard";
import Search from "../../Components/Search";
import HomeLayout from "../../Layouts/HomeLayout";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";

function CourseList() {
    const dispatch = useDispatch();
    const { courseData } = useSelector((state) => state.course);
    const [searchQuery, setSearchQuery] = useState("");
    const [start, setStart] = useState(0);
    const [limit] = useState(8);
    const [isSearching, setIsSearching] = useState(false);

    async function search(data) {
        setIsSearching(true);
        setStart(0);
        await dispatch(
            getAllCourses({
                searchQuery: data,
            })
        );
    }

    useEffect(() => {
        if (searchQuery === "") {
            setIsSearching(false);
            (async () =>
                await dispatch(
                    getAllCourses({
                        start: start,
                        limit: limit,
                    })
                ))();
        }
    }, [start, searchQuery]);

    const handlePagination = (direction) => {
        const newStart = direction === "next" ? start + limit : start - limit;
        setStart(newStart);
    };

    return (
        <HomeLayout>
            <div className="min-h-[90vh] py-12  bg-base-100">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="text-center mb-12">
                        <h1 className="bg-gradient-to-r from-warning via-error to-warning bg-clip-text text-transparent text-3xl md:text-4xl font-bold mb-2">
                            Expert-Led Courses
                        </h1>
                        <p className="text-lg text-base-content/70">
                            Learn from industry professionals and level up your
                            skills
                        </p>
                        <div className="divider divider-primary w-24 mx-auto my-4" />
                    </div>
                    {((courseData && courseData?.length > 0) ||
                        searchQuery !== "") && (
                        <Search cb={search} setSearchQuery={setSearchQuery} />
                    )}
                    {courseData && courseData?.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                                {courseData.map((course) => (
                                    <CourseCard
                                        key={course?._id}
                                        data={course}
                                    />
                                ))}
                            </div>
                            <div className="flex justify-center items-center gap-4 mt-8">
                                <button
                                    onClick={() => handlePagination("prev")}
                                    disabled={start === 0}
                                    className="btn btn-success btn-sm sm:btn-md gap-2"
                                >
                                    <FaArrowLeft className="text-sm" />
                                    Previous
                                </button>
                                <span className="text-base-content/70">
                                    Page {Math.floor(start / limit) + 1}
                                </span>
                                <button
                                    onClick={() => handlePagination("next")}
                                    disabled={courseData?.length < limit}
                                    className="btn btn-warning btn-sm sm:btn-md gap-2"
                                >
                                    Next
                                    <FaArrowRight className="text-sm" />
                                </button>
                            </div>
                        </>
                    ) : !isSearching ? (
                        <div className="max-w-xl mx-auto text-center py-20">
                            <div className="text-4xl mb-4">📚</div>
                            <h2 className="text-xl font-semibold mb-4">
                                New Courses Coming Soon
                            </h2>
                            <p className="text-base-content/70 mb-6">
                                Our team is working hard to bring you the latest
                                content
                            </p>
                        </div>
                    ) : (
                        <div className="max-w-xl mx-auto text-center py-20">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
                                <FaSearch className="text-4xl text-warning" />
                            </div>
                            <h2 className="text-xl font-semibold mb-4">
                                No Matching Courses Found
                            </h2>
                            <p className="text-base-content/70 mb-6">
                                Our team is working hard to bring you the latest
                                content
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </HomeLayout>
    );
}

export default CourseList;
