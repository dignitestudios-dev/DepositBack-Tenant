/* eslint-disable react/prop-types */
import { Navigate, Outlet, useLocation } from "react-router";

const OnBoardLayout = ({ token, userData }) => {
  const location = useLocation();
  const path = location.pathname;

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  if (
    !userData?.isSessionComplete &&
    !path.startsWith("/onboarding/personal-info")
  ) {
    return <Navigate to="/onboarding/personal-info" replace />;
  }

  if (userData?.isSessionComplete) {
    if (
      !userData?.isSubscriptionPaid &&
      !path.startsWith("/onboarding/subscription-plans") &&
      !path.startsWith("/onboard/payment-method")
    ) {
      return <Navigate to="/onboarding/subscription-plans" replace />;
    }
  }

  // if (userData?.isSubscriptionPaid) {
  //   return <Navigate to="/app/dashboard" replace />;
  // }
  return <Outlet />;
};

export default OnBoardLayout;
