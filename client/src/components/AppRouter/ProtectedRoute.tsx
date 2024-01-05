import { ReactNode } from "react";
import { useAppSelector } from "../../hooks/redux";
import { Navigate } from "react-router-dom";
import { INDEX_ROUTE } from "./consts";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isAuth = useAppSelector((state) => state.userReduser.isAuth);
  if (!isAuth) {
    return <Navigate to={INDEX_ROUTE} replace />;
  }

  return children;
};

export default ProtectedRoute;
