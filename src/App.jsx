import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import RequireAuth from "./Components/Auth/RequireAuth";
import AboutUs from "./Pages/AboutUs";
import Contact from "./Pages/Contact";
import CourseDescription from "./Pages/Course/CourseDescription";
import CourseList from "./Pages/Course/CourseList";
import CreateCourse from "./Pages/Course/CreateCourse";
import Denied from "./Pages/Denied";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/login";
import NotFound from "./Pages/NotFound";
import Signup from "./Pages/SignUp";
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
            <Route path="/courses" element={<CourseList />} />
            <Route
                path="/courses/description"
                element={<CourseDescription />}
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/denied" element={<Denied />} />
            <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
                <Route path="/courses/create" element={<CreateCourse />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
