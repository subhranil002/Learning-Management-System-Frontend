import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function RequireAuth({ allowedRoles }) {
    const { isLoggedIn, role } = useSelector((state) => state.auth);
    console.log(isLoggedIn, role);
    
    return isLoggedIn && allowedRoles.includes(role) ? (
        <Outlet />
    ) : isLoggedIn ? (
        <Navigate to="/denied" />
    ) : (
        <Navigate to="/login" />
    );
}

export default RequireAuth;
