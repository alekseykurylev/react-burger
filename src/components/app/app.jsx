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
import Orders from "../page/orders/orders";
import ProfileWrapper from "../layout/profile-wrapper/profile-wrapper";
import ProtectedRoute from "../protected-route";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import IngredientDetails from "../ui/ingredient-details/ingredient-details";
import Modal from "../ui/modal/modal";
import { getIngredients } from "../../services/thunkActions/ingredients";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state && location.state.background;

  const handleModalClose = () => {
    navigate(-1);
  };

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<PageWrapper />}>
          <Route index element={<Constructor />} />
          <Route path="ingredients/:id" element={<IngredientDetails />} />

          <Route element={<ProtectedRoute />}>
            <Route path="profile/" element={<ProfileWrapper />}>
              <Route index element={<Profile />} />
              <Route path="orders" element={<Orders />} />
            </Route>
          </Route>

          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />

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
        </Routes>
      )}
    </>
  );
};

export default App;
