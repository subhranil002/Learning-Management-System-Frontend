import { AiFillCloseCircle } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { logout } from "../Redux/Slices/AuthSlice";

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoggedIn, role } = useSelector((state) => state.auth);

    function changeWidth() {
        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = "20vw";
    }

    function hideDrawer() {
        const element = document.getElementsByClassName("drawer-toggle");
        element[0].checked = false;
        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = "0";
    }

    async function handleLogout() {
        await dispatch(logout());
        hideDrawer();
        navigate("/");
    }

    return (
        <div className="drawer fixed left-0 top-0 z-50 w-fit">
            <input className="drawer-toggle" id="my-drawer" type="checkbox" />
            <div className="drawer-content">
                <label htmlFor="my-drawer" className="cursor-pointer relative">
                    <FiMenu
                        onClick={changeWidth}
                        size="32px"
                        className="font-bold text-white m-4"
                    />
                </label>
            </div>
            <div className="drawer-side w-48 sm:w-80 bg-base-200 text-base-content transition-all duration-300">
                <label htmlFor="my-drawer" className="drawer-overlay"></label>
                <ul className="menu p-4 w-full relative overflow-hidden">
                    <li className="absolute right-2 top-2 z-50">
                        <button onClick={() => hideDrawer()}>
                            <AiFillCloseCircle size={24} />
                        </button>
                    </li>

                    <li className="pt-5">
                        <Link to="/" onClick={() => hideDrawer()}>
                            Home
                        </Link>
                    </li>
                    {isLoggedIn && role === "ADMIN" && (
                        <li>
                            <Link
                                to="/admin/dashboard"
                                onClick={() => hideDrawer()}
                            >
                                Admin Dashboard
                            </Link>
                        </li>
                    )}
                    <li>
                        <Link to="/courses" onClick={() => hideDrawer()}>
                            All Courses
                        </Link>
                    </li>
                    {isLoggedIn && role === "ADMIN" && (
                        <li>
                            <Link
                                to="/courses/create"
                                onClick={() => hideDrawer()}
                            >
                                Create Course
                            </Link>
                        </li>
                    )}
                    <li>
                        <Link to="/contact" onClick={() => hideDrawer()}>
                            Contact Us
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" onClick={() => hideDrawer()}>
                            About Us
                        </Link>
                    </li>

                    <div className="w-full flex flex-col items-center justify-center space-y-2 mt-4">
                        {isLoggedIn ? (
                            <>
                                <Link
                                    to="/user/profile"
                                    onClick={() => hideDrawer()}
                                    className="btn btn-primary w-full text-center"
                                >
                                    Profile
                                </Link>
                                <button
                                    onClick={() => handleLogout()}
                                    className="btn btn-secondary w-full"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    onClick={() => hideDrawer()}
                                    className="btn btn-primary w-full text-center"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    onClick={() => hideDrawer()}
                                    className="btn btn-secondary w-full text-center"
                                >
                                    Signup
                                </Link>
                            </>
                        )}
                    </div>
                </ul>
            </div>
        </div>
    );
}

export default Header;
