import "../../styles/global.module.scss";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Constructor from "../page/constructor/constructor";
import Login from "../page/login/login";
import Register from "../page/register/register";
import ForgotPassword from "../page/forgot-password/forgot-password";
import ResetPassword from "../page/reset-password/reset-password";
import Profile from "../page/profile/profile";
import NotFound404 from "../page/not-found/not-found";
import PageWrapper from "../layout/page-wrapper/page-wrapper";
import Orders from "../page/profile-orders/profile-orders";
import ProtectedRoute from "../protected-route";
import { useEffect } from "react";
import IngredientDetails from "../ui/ingredient-details/ingredient-details";
import Modal from "../ui/modal/modal";
import LoginRoute from "../login-route";
import { useAppDispatch } from "../../redux/hooks";
import { useAuth } from "../../utils/hooks/useAuth";
import { getUser } from "../../redux/syncs/auth/auth";
import Feed from "../page/feed/feed";
import AppHeader from "../layout/header/header";
import Preloader from "../ui/preloader/preloader";
import FeedDetails from "../ui/feed-details/feed-details";
import { useGetIngredientsQuery } from "../../redux/api/ingredientsApi";

const App = () => {
  const { isLoading, error } = useGetIngredientsQuery("");
  const { isTokens } = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isTokens) {
      dispatch(getUser());
    }
  }, [isTokens, dispatch]);

  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state && location.state.background;

  const handleModalClose = () => {
    navigate(-1);
  };

  if (isLoading) return <Preloader />;
  if (error) return <div>Ошибка сервера, зайдите позже.</div>;

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<PageWrapper />}>
          <Route index element={<Constructor />} />
          <Route path="ingredients/:id" element={<IngredientDetails />} />

          <Route path="feed" element={<Feed />} />
          <Route path="feed/:id" element={<FeedDetails />} />

          <Route element={<ProtectedRoute />}>
            <Route path="profile" element={<Profile />} />
            <Route path="profile/orders" element={<Orders />} />
            <Route path="profile/orders/:id" element={<FeedDetails />} />
          </Route>

          <Route element={<LoginRoute />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
          </Route>

          <Route path="*" element={<NotFound404 />} />
        </Route>
      </Routes>

      {background && (
        <Routes>
          <Route
            path="ingredients/:id"
            element={
              <Modal onClose={handleModalClose} className="ingredient">
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path="feed/:id"
            element={
              <Modal onClose={handleModalClose} className="feed">
                <FeedDetails />
              </Modal>
            }
          />
          <Route
            path="profile/orders/:id"
            element={
              <Modal onClose={handleModalClose} className="feed">
                <FeedDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};

export default App;
