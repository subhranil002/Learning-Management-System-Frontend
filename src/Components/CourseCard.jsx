import parser from "html-react-parser";
import { FaBook, FaChalkboardTeacher, FaListUl } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function CourseCard({ data }) {
    const navigate = useNavigate();

    return (
        <div
            onClick={() =>
                navigate("/courses/description/", { state: { ...data } })
            }
            className="mx-auto card card-compact bg-base-100 text-base-content shadow-xl hover:shadow-2xl transition-all duration-300 ease-out cursor-pointer group border border-base-300 hover:border-warning/50 max-w-[350px]"
        >
            <figure className="relative">
                <img
                    src={data?.thumbnail?.secure_url}
                    alt="Course thumbnail"
                    className="w-full h-48 object-cover rounded-t-xl group-hover:scale-102 transition-transform duration-300"
                />
                <div className="text-black text-md font-semibold badge badge-warning absolute top-2 right-2 gap-1">
                    <FaListUl />
                    {data?.numbersOfLectures} Lectures
                </div>
            </figure>
            <div className="card-body px-4 py-3">
                <h2 className="card-title text-xl font-bold line-clamp-1 mb-1">
                    {data?.title}
                </h2>
                <p className="text-sm line-clamp-3 mb-2">
                    {parser(data?.description)}
                </p>
                <div className="flex flex-col text-base">
                    <div className="flex items-center gap-2 py-1 rounded-lg">
                        <FaBook className="text-warning" />
                        <span className="font-medium">Category:</span>
                        <span className="text-warning">{data?.category}</span>
                    </div>
                    <div className="flex items-center gap-2 py-1 rounded-lg">
                        <FaChalkboardTeacher className="text-warning" />
                        <span className="font-medium">Instructor:</span>
                        <span className="text-warning line-clamp-1 capitalize">
                            {data?.createdBy?.name}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseCard;
