import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../services/thunkActions/auth";

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, loadingAuth } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const token = !!window.localStorage.getItem("accessToken");
    if (!isLoggedIn && !token) {
      navigate("/login");
    } else {
      dispatch(getUser());
    }
  }, [isLoggedIn, navigate, dispatch]);

  return loadingAuth ? "Загрузка..." : isLoggedIn && <Outlet />;
};

export default ProtectedRoute;
