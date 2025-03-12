import { useEffect } from "react";
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { deleteCourse, getAllCourses } from "../../Redux/Slices/CourseSlice";

function AdminDashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { courseData } = useSelector((state) => state?.course);

    async function onCourseDelete(id) {
        if (window.confirm("Are you sure you want to delete the course ? ")) {
            const res = await dispatch(deleteCourse(id));
            if (res?.payload?.success) {
                await dispatch(getAllCourses());
            }
        }
    }

    useEffect(() => {
        (async () => {
            await dispatch(getAllCourses());
        })();
    }, []);

    return (
        <HomeLayout>
            <div className="min-h-[90vh] pt-5 flex flex-col flex-wrap gap-10 text-white">
                <h1 className="text-center text-5xl font-semibold text-yellow-500">
                    Admin Dashboard
                </h1>
                <div className="mx-[10%] w-[80%] self-center flex flex-col items-center justify-center gap-10 mb-10">
                    <div className="flex w-full items-center justify-between">
                        <h1 className="text-center text-3xl font-semibold">
                            Courses overview
                        </h1>

                        <button
                            onClick={() => {
                                navigate("/courses/create");
                            }}
                            className="w-fit bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded py-2 px-4 font-semibold text-lg cursor-pointer"
                        >
                            Create new course
                        </button>
                    </div>

                    <table className="table overflow-x-scroll">
                        <thead>
                            <tr>
                                <th>S No</th>
                                <th>Course Title</th>
                                <th>Course Category</th>
                                <th>Instructor</th>
                                <th>Total Lectures</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courseData?.map((course, idx) => {
                                return (
                                    <tr key={course._id}>
                                        <td>{idx + 1}</td>
                                        <td className="w-40 h-auto bg-transparent resize-none">
                                            {course?.title}
                                        </td>
                                        <td>{course?.category}</td>
                                        <td>{course?.createdBy?.name}</td>
                                        <td>{course?.numbersOfLectures}</td>
                                        <td className="max-w-70 overflow-hidden text-ellipsis">
                                            {course?.description}
                                        </td>
                                        <td className="flex items-center gap-4">
                                            <button
                                                className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold"
                                                onClick={() =>
                                                    navigate(
                                                        "/courses/lectures",
                                                        { state: { ...course } }
                                                    )
                                                }
                                            >
                                                <BsCollectionPlayFill />
                                            </button>
                                            <button
                                                className="bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold"
                                                onClick={() =>
                                                    onCourseDelete(course?._id)
                                                }
                                            >
                                                <BsTrash />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </HomeLayout>
    );
}

export default AdminDashboard;
