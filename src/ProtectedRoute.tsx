/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "./helper";
import { DashboardPages } from "./interfaces";

// interface ProtectedRouteProps {
//   element: React.ReactElement;
//   path: string;
// }

const ProtectedRoute: React.FC = () => {
    const isAuthenticated = getToken() !== null;
    console.log(isAuthenticated)

  return isAuthenticated ? <Outlet /> : <Navigate to={DashboardPages.Home} replace />;
};

export default ProtectedRoute;
