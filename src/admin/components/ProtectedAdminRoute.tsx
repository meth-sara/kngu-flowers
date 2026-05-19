import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedAdminRoute() {
  const isAuth = localStorage.getItem("admin_auth") === "true";

  if (!isAuth) {
    return <Navigate to="/management-portal/login" replace />;
  }

  return <Outlet />;
}
