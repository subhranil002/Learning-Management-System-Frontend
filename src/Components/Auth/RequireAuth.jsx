import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function RequireAuth({ allowedRoles }) {
    const { isLoggedIn, role } = useSelector((state) => state.auth);

    return isLoggedIn && allowedRoles.includes(role) ? (
        <Outlet />
    ) : isLoggedIn ? (
        <Navigate
            to="/denied"
            state={{
                message: "You are not authorized to access this page",
            }}
        />
    ) : (
        <Navigate to="/signin" />
    );
}

export default RequireAuth;
