import {
    FaBook,
    FaBookOpen,
    FaChalkboardTeacher,
    FaEnvelope,
    FaInfoCircle,
    FaPlusCircle,
    FaReceipt,
    FaSignOutAlt,
    FaUser,
    FaUserCircle,
} from "react-icons/fa";
import { RiMenu2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Logo from "../Assets/Images/Logo.png";
import { logout } from "../Redux/Slices/AuthSlice";

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { isLoggedIn, role, data } = useSelector((state) => state.auth);

    async function handleLogout() {
        await dispatch(logout());
        navigate("/login");
    }

    function modifyCloudinaryURL(url) {
        if (import.meta.env.VITE_IMAGE_TRANSFORMATION === "true") {
            return url.replace(
                "/upload/",
                "/upload/ar_1:1,c_auto,g_auto,w_500/r_max/"
            );
        }
        return url;
    }

    const isActive = (path) => location.pathname === path;

    return (
        <div className="navbar bg-base-100 border-b border-base-300 shadow-sm md:px-8">
            <div className="navbar-start">
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost lg:hidden"
                    >
                        <RiMenu2Fill size={20} />
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-base font-semibold dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                    >
                        <li>
                            <Link
                                to="/courses"
                                className={`flex items-center gap-2 rounded-md ${
                                    isActive("/courses")
                                        ? "bg-neutral text-neutral-content"
                                        : ""
                                }`}
                            >
                                <FaBookOpen className="text-lg" />
                                All Courses
                            </Link>
                        </li>
                        {isLoggedIn &&
                            (role === "TEACHER" || role === "ADMIN") && (
                                <li>
                                    <details>
                                        <summary className="flex items-center gap-2">
                                            <FaChalkboardTeacher className="text-lg" />
                                            Admin/Teacher
                                        </summary>
                                        <ul className="p-2">
                                            {isLoggedIn && role === "ADMIN" && (
                                                <li>
                                                    <Link
                                                        to="/admin/dashboard"
                                                        className={`flex items-center gap-2 rounded-md ${
                                                            isActive(
                                                                "/admin/dashboard"
                                                            )
                                                                ? "bg-neutral text-neutral-content"
                                                                : ""
                                                        }`}
                                                    >
                                                        <FaChalkboardTeacher className="text-lg" />
                                                        Admin Dashboard
                                                    </Link>
                                                </li>
                                            )}
                                            {isLoggedIn &&
                                                role === "TEACHER" && (
                                                    <li>
                                                        <Link
                                                            to="/teacher/dashboard"
                                                            className={`flex items-center gap-2 rounded-md ${
                                                                isActive(
                                                                    "/teacher/dashboard"
                                                                )
                                                                    ? "bg-neutral text-neutral-content"
                                                                    : ""
                                                            }`}
                                                        >
                                                            <FaChalkboardTeacher className="text-xl" />
                                                            Teacher Dashboard
                                                        </Link>
                                                    </li>
                                                )}
                                            <li>
                                                <Link
                                                    to="/courses/create"
                                                    className={`flex items-center gap-2 rounded-md ${
                                                        isActive(
                                                            "/courses/create"
                                                        )
                                                            ? "bg-neutral text-neutral-content"
                                                            : ""
                                                    }`}
                                                >
                                                    <FaPlusCircle className="text-lg" />
                                                    Add Course
                                                </Link>
                                            </li>
                                        </ul>
                                    </details>
                                </li>
                            )}
                        <li>
                            <Link
                                to="/about"
                                className={`flex items-center gap-2 rounded-md ${
                                    isActive("/about")
                                        ? "bg-neutral text-neutral-content"
                                        : ""
                                }`}
                            >
                                <FaInfoCircle className="text-lg" />
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/contact"
                                className={`flex items-center gap-2 rounded-md ${
                                    isActive("/contact")
                                        ? "bg-neutral text-neutral-content"
                                        : ""
                                }`}
                            >
                                <FaEnvelope className="text-lg" />
                                Contact Us
                            </Link>
                        </li>
                    </ul>
                </div>
                <Link to="/" className="flex items-center gap-2">
                    <img
                        src={Logo}
                        alt="Logo"
                        className="w-8 h-8 md:w-10 md:h-10"
                    />
                    <span className="text-lg md:text-xl font-bold">
                        BrainXcel
                    </span>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-6 text-base font-semibold">
                    <li>
                        <Link
                            to="/courses"
                            className={`flex items-center gap-2 rounded-md ${
                                isActive("/courses")
                                    ? "bg-neutral text-neutral-content"
                                    : ""
                            }`}
                        >
                            <FaBookOpen className="text-lg" />
                            All Courses
                        </Link>
                    </li>
                    {isLoggedIn && (role === "TEACHER" || role === "ADMIN") && (
                        <li>
                            <details>
                                <summary className="flex items-center gap-2">
                                    <FaChalkboardTeacher className="text-lg" />
                                    Admin/Teacher
                                </summary>
                                <ul className="p-2 z-1">
                                    {isLoggedIn && role === "ADMIN" && (
                                        <li>
                                            <Link
                                                to="/admin/dashboard"
                                                className={`flex items-center gap-2 rounded-md ${
                                                    isActive("/admin/dashboard")
                                                        ? "bg-neutral text-neutral-content"
                                                        : ""
                                                }`}
                                            >
                                                <FaChalkboardTeacher className="text-2xl" />
                                                Admin Dashboard
                                            </Link>
                                        </li>
                                    )}
                                    {isLoggedIn && role === "TEACHER" && (
                                        <li>
                                            <Link
                                                to="/teacher/dashboard"
                                                className={`flex items-center gap-2 rounded-md ${
                                                    isActive(
                                                        "/teacher/dashboard"
                                                    )
                                                        ? "bg-neutral text-neutral-content"
                                                        : ""
                                                }`}
                                            >
                                                <FaChalkboardTeacher className="text-2xl" />
                                                Teacher Dashboard
                                            </Link>
                                        </li>
                                    )}
                                    <li>
                                        <Link
                                            to="/courses/create"
                                            className={`flex items-center gap-2 rounded-md ${
                                                isActive("/courses/create")
                                                    ? "bg-neutral text-neutral-content"
                                                    : ""
                                            }`}
                                        >
                                            <FaPlusCircle className="text-lg" />
                                            Add Course
                                        </Link>
                                    </li>
                                </ul>
                            </details>
                        </li>
                    )}
                    <li>
                        <Link
                            to="/about"
                            className={`flex items-center gap-2 rounded-md ${
                                isActive("/about")
                                    ? "bg-neutral text-neutral-content"
                                    : ""
                            }`}
                        >
                            <FaInfoCircle className="text-lg" />
                            About Us
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/contact"
                            className={`flex items-center gap-2 rounded-md ${
                                isActive("/contact")
                                    ? "bg-neutral text-neutral-content"
                                    : ""
                            }`}
                        >
                            <FaEnvelope className="text-lg" />
                            Contact Us
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="navbar-end dropdown dropdown-bottom text-md flex items-center gap-2">
                <span className="hidden md:block">
                    {isLoggedIn && location.pathname === "/" ? (
                        <span className="capitalize font-semibold">
                            Welcome, {data?.fullName.split(" ")[0]}
                        </span>
                    ) : (
                        ""
                    )}
                </span>
                <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                >
                    <div className="w-8 md:w-10 rounded-full">
                        {isLoggedIn ? (
                            <img
                                alt="Profile Avatar"
                                src={modifyCloudinaryURL(
                                    data?.avatar?.secure_url
                                )}
                            />
                        ) : (
                            <FaUserCircle
                                size={32}
                                className="md:size-10 object-cover"
                            />
                        )}
                    </div>
                </div>
                {isLoggedIn ? (
                    <ul
                        tabIndex={0}
                        className="menu menu-base font-semibold dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                    >
                        <li>
                            <Link
                                to="/users/profile"
                                className={`flex items-center gap-2 rounded-md ${
                                    isActive("/users/profile")
                                        ? "bg-neutral text-neutral-content"
                                        : ""
                                }`}
                            >
                                <FaUser className="text-lg" />
                                My Profile
                            </Link>
                        </li>
                        {isLoggedIn &&
                            (role === "USER" || role === "GUEST") && (
                                <>
                                    <li>
                                        <Link
                                            to="/users/mycourses"
                                            className={`flex items-center gap-2 rounded-md ${
                                                isActive("/users/mycourses")
                                                    ? "bg-neutral text-neutral-content"
                                                    : ""
                                            }`}
                                        >
                                            <FaBook className="text-lg" />
                                            My Courses
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/users/purchasehistory"
                                            className={`flex items-center gap-2 rounded-md ${
                                                isActive(
                                                    "/users/purchasehistory"
                                                )
                                                    ? "bg-neutral text-neutral-content"
                                                    : ""
                                            }`}
                                        >
                                            <FaReceipt className="text-lg" />
                                            My Purchases
                                        </Link>
                                    </li>
                                </>
                            )}
                        <li>
                            <button
                                onClick={() => handleLogout()}
                                className="flex items-center gap-2"
                            >
                                <FaSignOutAlt className="text-lg" />
                                Logout
                            </button>
                        </li>
                    </ul>
                ) : (
                    <ul
                        tabIndex={0}
                        className="menu menu-base font-semibold dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                    >
                        <li>
                            <Link
                                to="/login"
                                className={`flex items-center gap-2 rounded-md ${
                                    isActive("/login")
                                        ? "bg-neutral text-neutral-content"
                                        : ""
                                }`}
                            >
                                <FaSignOutAlt className="text-lg" />
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/signup"
                                className={`flex items-center gap-2 rounded-md ${
                                    isActive("/signup")
                                        ? "bg-neutral text-neutral-content"
                                        : ""
                                }`}
                            >
                                <FaUser className="text-lg" />
                                Signup
                            </Link>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Header;
