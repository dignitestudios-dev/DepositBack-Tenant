import { Navigate, Outlet } from "react-router";

// eslint-disable-next-line react/prop-types
const AuthLayout = ({ token }) => {
  if (token) {
    return <Navigate to="/app/Dashboard" replace />;
  }
  return (
    <div className="w-full h-full">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
