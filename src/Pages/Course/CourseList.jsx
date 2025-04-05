import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CourseCard from "../../Components/CourseCard";
import Search from "../../Components/Search";
import HomeLayout from "../../Layouts/HomeLayout";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";

function CourseList() {
    const dispatch = useDispatch();
    const { courseData } = useSelector((state) => state.course);
    const [searchQuery, setSearchQuery] = useState("");

    async function search(data) {
        console.log(data);
        // TODO: search for courses
    }

    useEffect(() => {
        searchQuery === "" &&
            (async () =>
                await dispatch(
                    getAllCourses({
                        start: 0,
                        limit: 10,
                        searchQuery,
                    })
                ))();
    }, [searchQuery]);

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
                    <Search cb={search} setSearchQuery={setSearchQuery} />
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        {courseData.map((course) => (
                            <CourseCard key={course._id} data={course} />
                        ))}
                    </div>
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
                </div>
            </div>
        </HomeLayout>
    );
}

export default CourseList;
