import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function RequireSubscription() {
    const { isLoggedIn, data, role } = useSelector((state) => state.auth);

    return role === "TEACHER" || role === "ADMIN" ||
        (data?.subscription && data?.subscription?.status === "active") ? (
        <Outlet />
    ) : isLoggedIn ? (
        <Navigate
            to="/denied"
            state={{ message: "Please subscribe to access this page" }}
        />
    ) : (
        <Navigate to="/signin" />
    );
}

export default RequireSubscription;
