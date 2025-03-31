import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";

import RequireAuth from "./Components/Auth/RequireAuth";
import AboutUs from "./Pages/AboutUs";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import Contact from "./Pages/Contact";
import CourseDescription from "./Pages/Course/CourseDescription";
import CourseList from "./Pages/Course/CourseList";
import CreateCourse from "./Pages/Course/CreateCourse";
import EditCourse from "./Pages/Course/EditCourse";
import CreateLecture from "./Pages/Course/Lecture/CreateLecture";
import Displaylectures from "./Pages/Course/Lecture/DisplayLectures";
import EditLecture from "./Pages/Course/Lecture/EditLecture";
import Denied from "./Pages/Denied";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/login";
import NotFound from "./Pages/NotFound";
import Checkout from "./Pages/Payment/Checkout";
import CheckoutFailure from "./Pages/Payment/CheckoutFailure";
import CheckoutSuccess from "./Pages/Payment/CheckoutSuccess";
import Signup from "./Pages/SignUp";
import TeacherDashboard from "./Pages/Teacher/TeacherDashboard";
import ChangePassword from "./Pages/User/ChangePassword";
import EditProfile from "./Pages/User/EditProfile";
import ForgotPassword from "./Pages/User/ForgotPassword";
import Profile from "./Pages/User/Profile";
import ResetPassword from "./Pages/User/ResetPassword";
import { getProfile, refreshToken } from "./Redux/Slices/AuthSlice";

function App() {
    const dispatch = useDispatch();
    const location = useLocation();
    const { isLoggedIn } = useSelector((state) => state.auth);

    const paths = [
        "/",
        "/about",
        "/signup",
        "/login",
        "/users/profile",
        "/courses",
        "/courses/description",
        "/contact",
        "/denied",
        "*",
    ];

    useEffect(() => {
        if (!isLoggedIn || !paths.includes(location.pathname)) {
            (async () => {
                const res = await dispatch(getProfile());
                if (res?.payload === 403) {
                    await dispatch(refreshToken());
                }
            })();
        }
    }, [location.pathname]);

    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/denied" element={<Denied />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/resetpassword/:token" element={<ResetPassword />} />
            <Route path="/courses" element={<CourseList />} />
            <Route path="*" element={<NotFound />} />

            {/* Protected Routes for Authenticated Users */}
            <Route
                element={
                    <RequireAuth
                        allowedRoles={["GUEST", "USER", "TEACHER", "ADMIN"]}
                    />
                }
            >
                <Route path="/users/profile" element={<Profile />} />
                <Route path="/users/editprofile" element={<EditProfile />} />
                <Route
                    path="/users/changepassword"
                    element={<ChangePassword />}
                />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/checkout/success" element={<CheckoutSuccess />} />
                <Route path="/checkout/failure" element={<CheckoutFailure />} />
                <Route
                    path="/courses/description"
                    element={<CourseDescription />}
                />
                <Route path="/courses/lectures" element={<Displaylectures />} />
            </Route>

            {/* Protected Routes for TEACHER & ADMIN */}
            <Route
                element={<RequireAuth allowedRoles={["TEACHER", "ADMIN"]} />}
            >
                <Route path="/courses/create" element={<CreateCourse />} />
                <Route path="/courses/edit" element={<EditCourse />} />
                <Route
                    path="/courses/lectures/add"
                    element={<CreateLecture />}
                />
                <Route
                    path="/courses/lectures/edit"
                    element={<EditLecture />}
                />
            </Route>

            {/* Protected Routes for TEACHER Only */}
            <Route element={<RequireAuth allowedRoles={["TEACHER"]} />}>
                <Route
                    path="/teacher/dashboard"
                    element={<TeacherDashboard />}
                />
            </Route>

            {/* Protected Routes for ADMIN Only */}
            <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Route>
        </Routes>
    );
}

export default App;
