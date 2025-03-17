import { FaUserCircle } from "react-icons/fa";
import { RiMenu2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation,useNavigate } from "react-router-dom";

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
        return url.replace(
            "/upload/",
            "/upload/ar_1:1,c_auto,g_auto,w_500/r_max/"
        );
    }

    const isActive = (path) => location.pathname === path;

    return (
        <div className="navbar bg-base-100 border-b border-base-300 shadow-sm">
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
                                className={`rounded-md ${
                                    isActive("/courses")
                                        ? "bg-neutral text-neutral-content"
                                        : ""
                                }`}
                            >
                                All Courses
                            </Link>
                        </li>
                        {isLoggedIn &&
                            (role === "TEACHER" || role === "ADMIN") && (
                                <li>
                                    <details>
                                        <summary>Admin/Teacher</summary>
                                        <ul className="p-2">
                                            {isLoggedIn && role === "ADMIN" && (
                                                <li>
                                                    <Link
                                                        to="/admin/dashboard"
                                                        className={`rounded-md ${
                                                            isActive(
                                                                "/admin/dashboard"
                                                            )
                                                                ? "bg-neutral text-neutral-content"
                                                                : ""
                                                        }`}
                                                    >
                                                        Admin Dashboard
                                                    </Link>
                                                </li>
                                            )}
                                            <li>
                                                <Link
                                                    to="/courses/create"
                                                    className={`rounded-md ${
                                                        isActive(
                                                            "/courses/create"
                                                        )
                                                            ? "bg-neutral text-neutral-content"
                                                            : ""
                                                    }`}
                                                >
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
                                className={`rounded-md ${
                                    isActive("/about")
                                        ? "bg-neutral text-neutral-content"
                                        : ""
                                }`}
                            >
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/contact"
                                className={`rounded-md ${
                                    isActive("/contact")
                                        ? "bg-neutral text-neutral-content"
                                        : ""
                                }`}
                            >
                                Contact Us
                            </Link>
                        </li>
                    </ul>
                </div>
                <Link to="/" className="flex items-center gap-2">
                    <img src={Logo} alt="Logo" className="w-10 h-10" />
                    <span className="hidden sm:block text-xl font-bold">
                        Brain-2xl
                    </span>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-6 text-base font-semibold">
                    <li>
                        <Link
                            to="/courses"
                            className={`rounded-md ${
                                isActive("/courses")
                                    ? "bg-neutral text-neutral-content"
                                    : ""
                            }`}
                        >
                            All Courses
                        </Link>
                    </li>
                    {isLoggedIn && (role === "TEACHER" || role === "ADMIN") && (
                        <li>
                            <details>
                                <summary>Admin/Teacher</summary>
                                <ul className="p-2 z-1">
                                    {isLoggedIn && role === "ADMIN" && (
                                        <li>
                                            <Link
                                                to="/admin/dashboard"
                                                className={`rounded-md ${
                                                    isActive("/admin/dashboard")
                                                        ? "bg-neutral text-neutral-content"
                                                        : ""
                                                }`}
                                            >
                                                Admin Dashboard
                                            </Link>
                                        </li>
                                    )}
                                    <li>
                                        <Link
                                            to="/courses/create"
                                            className={`rounded-md ${
                                                isActive("/courses/create")
                                                    ? "bg-neutral text-neutral-content"
                                                    : ""
                                            }`}
                                        >
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
                            className={`rounded-md ${
                                isActive("/about")
                                    ? "bg-neutral text-neutral-content"
                                    : ""
                            }`}
                        >
                            About Us
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/contact"
                            className={`rounded-md ${
                                isActive("/contact")
                                    ? "bg-neutral text-neutral-content"
                                    : ""
                            }`}
                        >
                            Contact Us
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="navbar-end dropdown dropdown-bottom">
                <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                >
                    <div className="w-10 rounded-full">
                        {isLoggedIn ? (
                            <img
                                alt="Profile Avatar"
                                src={modifyCloudinaryURL(
                                    data?.avatar?.secure_url
                                )}
                            />
                        ) : (
                            <FaUserCircle size={38} />
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
                                className={`rounded-md ${
                                    isActive("/users/profile")
                                        ? "bg-neutral text-neutral-content"
                                        : ""
                                }`}
                            >
                                Profile
                            </Link>
                        </li>
                        <li>
                            <button onClick={() => handleLogout()}>
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
                                className={`rounded-md ${
                                    isActive("/login")
                                        ? "bg-neutral text-neutral-content"
                                        : ""
                                }`}
                            >
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/signup"
                                className={`rounded-md ${
                                    isActive("/signup")
                                        ? "bg-neutral text-neutral-content"
                                        : ""
                                }`}
                            >
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
