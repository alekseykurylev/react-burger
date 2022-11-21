import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import selectAuth from "../redux/selectors/auth";

const ProtectedRoute = () => {
  const { isLoggedIn, loadingAuth } = useAppSelector(selectAuth);

  if(loadingAuth) {
    return <div>Загрузка...</div>
  }

  if(!isLoggedIn) {
    return <Navigate to="/login" replace={true} />
  }

  return <Outlet />;
};

export default ProtectedRoute;
