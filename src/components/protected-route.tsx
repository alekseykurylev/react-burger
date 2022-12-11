import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { selectUser } from "../redux/slices/user";

const ProtectedRoute = () => {
  const { isLoggedIn, isLoading } = useAppSelector(selectUser);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace={true} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
