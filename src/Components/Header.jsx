import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { logout } from "../Redux/Slices/AuthSlice";

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoggedIn, role, data } = useSelector((state) => state.auth);

    async function handleLogout() {
        await dispatch(logout());
        navigate("/");
    }

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost lg:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {" "}
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />{" "}
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                    >
                        <li>
                            <Link to="/courses">All Courses</Link>
                        </li>
                        {isLoggedIn &&
                            (role === "TEACHER" || role === "ADMIN") && (
                                <li>
                                    <details>
                                        <summary>Admin/Teacher</summary>
                                        <ul className="p-2">
                                            {isLoggedIn && role === "ADMIN" && (
                                                <li>
                                                    <Link to="/admin/dashboard">
                                                        Admin Dashboard
                                                    </Link>
                                                </li>
                                            )}

                                            <li>
                                                <Link to="/courses/create">
                                                    Add Lecture
                                                </Link>
                                            </li>
                                        </ul>
                                    </details>
                                </li>
                            )}
                        <li>
                            <Link to="/about">About Us</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact Us</Link>
                        </li>
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost text-xl">
                    Brain-2xl
                </Link>
            </div>
            <div className="navbar-center hidden text-3xl font-semibold lg:flex">
                <ul className="menu menu-horizontal px-1 gap-6">
                    <li>
                        <Link to="/courses">All Courses</Link>
                    </li>
                    {isLoggedIn && (role === "TEACHER" || role === "ADMIN") && (
                        <li>
                            <details>
                                <summary>Admin/Teacher</summary>
                                <ul className="p-2">
                                    {isLoggedIn && role === "ADMIN" && (
                                        <li>
                                            <Link to="/admin/dashboard">
                                                Admin Dashboard
                                            </Link>
                                        </li>
                                    )}

                                    <li>
                                        <Link to="/courses/create">
                                            Add Lecture
                                        </Link>
                                    </li>
                                </ul>
                            </details>
                        </li>
                    )}
                    <li>
                        <Link to="/about">About Us</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact Us</Link>
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
                                alt="Tailwind CSS Navbar component"
                                src={data?.avatar?.secure_url}
                            />
                        ) : (
                            <FaUserCircle size={36} />
                        )}
                    </div>
                </div>
                {isLoggedIn ? (
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                    >
                        <li>
                            <Link to="/users/profile">Profile</Link>
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
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                    >
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/signup">Signup</Link>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Header;
