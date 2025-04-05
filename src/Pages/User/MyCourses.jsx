import { useEffect, useState } from "react";
import { FaBookOpen, FaShoppingBasket } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import CourseCard from "../../Components/CourseCard";
import Search from "../../Components/Search";
import HomeLayout from "../../Layouts/HomeLayout";
import { getMyCourses } from "../../Redux/Slices/AuthSlice";

function MyCourses() {
    const dispatch = useDispatch();
    const { myCourses } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    async function search(data) {
        console.log(data);
        // TODO: search for courses
    }

    useEffect(() => {
        searchQuery === "" && (async () => await dispatch(getMyCourses()))();
    }, [searchQuery]);

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
                    <Search cb={search} setSearchQuery={setSearchQuery} />
                    {myCourses?.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {myCourses.map((course) => (
                                <CourseCard key={course._id} data={course} />
                            ))}
                        </div>
                    ) : (
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
                    )}
                </div>
            </div>
        </HomeLayout>
    );
}

export default MyCourses;
