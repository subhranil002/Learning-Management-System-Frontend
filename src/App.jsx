import { Route, Routes } from "react-router-dom";

import AboutUs from "./Pages/AboutUs";
import Contact from "./Pages/Contact";
import CourseList from "./Pages/Course/CourseList";
import Denied from "./Pages/Denied";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/login";
import NotFound from "./Pages/NotFound";
import Signup from "./Pages/SignUp";

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/courses" element={<CourseList />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/denied" element={<Denied />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
