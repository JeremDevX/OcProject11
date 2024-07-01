import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { selectIsAuthenticated } from "./features/auth/authSlice";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectIfAuthenticated: boolean;
  redirectTo: string;
}

export default function ProtectedRoute(props: ProtectedRouteProps) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();

  if (isAuthenticated && props.redirectIfAuthenticated) {
    return <Navigate to={props.redirectTo} state={{ from: location }} />;
  } else if (!isAuthenticated && !props.redirectIfAuthenticated) {
    return <Navigate to={props.redirectTo} state={{ from: location }} />;
  }

  return props.children;
}
