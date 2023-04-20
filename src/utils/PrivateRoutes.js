import { useSelector } from "react-redux";
import { Navigate, Outlet, Route } from "react-router-dom";
import { isLoggedIn } from "../features/Login.reducer";

const PrivateRoutes = ({ component: Component, ...rest }) => {
  const authenticated = useSelector(isLoggedIn);
  return authenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoutes;
