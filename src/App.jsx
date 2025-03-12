import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import RequireAuth from "./Components/Auth/RequireAuth";
import RequireSubscription from "./Components/Auth/RequireSubscription";
import AboutUs from "./Pages/AboutUs";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import Contact from "./Pages/Contact";
import CourseDescription from "./Pages/Course/CourseDescription";
import CourseList from "./Pages/Course/CourseList";
import CreateCourse from "./Pages/Course/CreateCourse";
import CreateLecture from "./Pages/Course/Lecture/CreateLecture";
import Displaylectures from "./Pages/Course/Lecture/DisplayLectures";
import Denied from "./Pages/Denied";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/login";
import NotFound from "./Pages/NotFound";
import Checkout from "./Pages/Payment/Checkout";
import CheckoutFailure from "./Pages/Payment/CheckoutFailure";
import CheckoutSuccess from "./Pages/Payment/CheckoutSuccess";
import Signup from "./Pages/SignUp";
import EditProfile from "./Pages/User/EditProfile";
import Profile from "./Pages/User/Profile";
import { getProfile } from "./Redux/Slices/AuthSlice";

function App() {
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!isLoggedIn) {
            dispatch(getProfile());
        }
    }, []);

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route element={<RequireAuth allowedRoles={["USER", "ADMIN"]} />}>
                <Route path="users/profile" element={<Profile />} />
                <Route path="users/editprofile" element={<EditProfile />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/checkout/success" element={<CheckoutSuccess />} />
                <Route path="/checkout/failure" element={<CheckoutFailure />} />
            </Route>
            <Route path="/courses" element={<CourseList />} />
            <Route
                path="/courses/description"
                element={<CourseDescription />}
            />
            <Route element={<RequireSubscription />}>
                <Route path="/courses/lectures" element={<Displaylectures />} />
            </Route>
            <Route path="/contact" element={<Contact />} />
            <Route path="/denied" element={<Denied />} />
            <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
                <Route path="/courses/create" element={<CreateCourse />} />
                <Route
                    path="/courses/lectures/add"
                    element={<CreateLecture />}
                />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
