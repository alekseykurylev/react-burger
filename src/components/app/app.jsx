import "../../styles/global.module.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Constructor from "../page/constructor/constructor";
import Login from "../page/login/login";
import Register from "../page/register/register";
import ForgotPassword from "../page/forgot-password/forgot-password";
import ResetPassword from "../page/reset-password/reset-password";
import Profile from "../page/profile/profile";
import NotFound404 from "../page/not-found/not-found";
import PageWrapper from "../../layout/page-wrapper/page-wrapper";
import Orders from "../page/orders/orders";
import ProfileWrapper from "../../layout/profile-wrapper/profile-wrapper";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageWrapper />}>
          <Route index element={<Constructor />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="profile/" element={<ProfileWrapper />}>
            <Route index element={<Profile />} />
            <Route path="orders" element={<Orders />} />
          </Route>
          <Route path="*" element={<NotFound404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
