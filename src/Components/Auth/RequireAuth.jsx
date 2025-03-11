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
                message: `${
                    allowedRoles.length > 1
                        ? allowedRoles.join(", ")
                        : allowedRoles[0]
                } only access!`,
            }}
        />
    ) : (
        <Navigate to="/login" />
    );
}

export default RequireAuth;
