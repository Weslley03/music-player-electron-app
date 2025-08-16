import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/redux-hooks";

function PrivateRoute() {
  const { token } = useAppSelector((state) => state.user);
  const isAuthenticated = token && token !== '';
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;
