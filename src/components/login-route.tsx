import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../utils/hooks/useAuth";

const LoginRoute = () => {
  const { isTokens } = useAuth();

  if (isTokens) {
    return <Navigate to="/" replace={true} />;
  }

  return <Outlet />;
};

export default LoginRoute;
