import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useAuth } from "../utils/hooks/useAuth";
import { getUser } from "../services/thunkActions/auth";

const ProtectedRoute = () => {
  const { isLoggedIn, loadingAuth } = useSelector((store) => store.auth);
  const { isTokens } = useAuth();
  const dispatch = useDispatch();
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
