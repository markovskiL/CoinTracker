import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedProps {
  redirectPath: string;
  isAllowed: boolean;
}
const ProtectedRoute: React.FC<ProtectedProps> = ({
  redirectPath,
  isAllowed,
}) => {
  if (isAllowed) {
    return <Outlet />;
  } else {
    return <Navigate to={redirectPath} replace />;
  }
};

export default ProtectedRoute;
