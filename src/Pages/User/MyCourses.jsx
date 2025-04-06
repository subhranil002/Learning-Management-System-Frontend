import Fuse from "fuse.js";
import { useEffect, useState } from "react";
import { FaBookOpen, FaSearch, FaShoppingBasket } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import CourseCard from "../../Components/CourseCard";
import Search from "../../Components/Search";
import HomeLayout from "../../Layouts/HomeLayout";
import { getMyCourses } from "../../Redux/Slices/AuthSlice";

function MyCourses() {
    const dispatch = useDispatch();
    const { myCourses } = useSelector((state) => state.auth);
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    async function search(data) {
        if (myCourses && myCourses.length === 0) return;
        setIsSearching(true);
        const fuse = new Fuse(myCourses || [], {
            keys: [
                "title",
                "description",
                "category",
                "createdBy.name",
                "lectures.lecture.title",
                "lectures.lecture.description",
            ],
        });
        setCourses(fuse?.search(data)?.map((res) => res?.item));
    }

    useEffect(() => {
        if (searchQuery === "") {
            (async () => {
                await dispatch(getMyCourses());
            })();
        }
    }, [searchQuery]);

    useEffect(() => {
        setIsSearching(false);
        setCourses(myCourses);
    }, [myCourses]);

    return (
        <HomeLayout>
            <div className="min-h-[90vh] py-12 bg-base-100">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="text-center mb-12">
                        <h1 className="bg-gradient-to-r from-warning via-error to-warning bg-clip-text text-transparent text-3xl md:text-4xl font-bold mb-2">
                            My Courses
                        </h1>
                        <p className="text-lg text-base-content/70">
                            Your collection of expert-led learning resources
                        </p>
                        <div className="divider divider-primary w-24 mx-auto my-4" />
                    </div>
                    {((courses && courses?.length > 0) ||
                        searchQuery !== "") && (
                        <Search cb={search} setSearchQuery={setSearchQuery} />
                    )}
                    {courses && courses?.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {courses?.map((course) => (
                                <CourseCard key={course?._id} data={course} />
                            ))}
                        </div>
                    ) : !isSearching ? (
                        <div className="max-w-xl mx-auto text-center py-20">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
                                <FaShoppingBasket className="text-4xl text-warning" />
                            </div>
                            <h2 className="text-xl font-semibold mb-4">
                                No Courses Found
                            </h2>
                            <p className="text-base-content/70 mb-6">
                                It looks like you haven&apos;t purchased any
                                courses yet.
                            </p>
                            <button
                                className="btn btn-secondary btn-lg gap-2"
                                onClick={() => navigate("/courses")}
                            >
                                <FaBookOpen /> Explore Courses
                            </button>
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
                                We couldn&apos;t find any courses matching your
                                search
                            </p>
                            <button
                                className="btn btn-secondary btn-lg gap-2"
                                onClick={() => navigate("/courses")}
                            >
                                <FaBookOpen />
                                Browse All Courses
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </HomeLayout>
    );
}

export default MyCourses;
