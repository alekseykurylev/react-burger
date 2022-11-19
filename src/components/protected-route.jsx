import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../utils/hooks/useAuth";
import { getUser } from "../redux/thunkActions/auth";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import selectAuth from "../redux/selectors/auth";

const ProtectedRoute = () => {
  const { isLoggedIn, loadingAuth } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const { isTokens } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isTokens) {
      return navigate("/login");
    } else {
      dispatch(getUser());
    }
  }, [isTokens, navigate, dispatch]);

  return loadingAuth ? "Загрузка..." : isLoggedIn && <Outlet />;
};

export default ProtectedRoute;
