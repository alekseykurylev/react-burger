import "../../styles/global.module.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppHeader from "../app-header/app-header";
import Constructor from "../page/constructor/constructor";
import Login from "../page/login/login";
import Register from "../page/register/register";
import ForgotPassword from "../page/forgot-password/forgot-password";
import ResetPassword from "../page/reset-password/reset-password";
import Profile from "../page/profile/profile";
import NotFound404 from "../page/not-found/not-found";

const App = () => {
  return (
    <Router>
      <AppHeader />
      <Switch>
        <Route path="/" exact={true}>
          <main>
            <Constructor />
          </main>
        </Route>
        <Route path="/login" exact={true}>
          <Login />
        </Route>
        <Route path="/register" exact={true}>
          <Register />
        </Route>
        <Route path="/forgot-password" exact={true}>
          <ForgotPassword />
        </Route>
        <Route path="/reset-password" exact={true}>
          <ResetPassword />
        </Route>
        <Route path="/profile" exact={true}>
          <Profile />
        </Route>
        <Route>
          <NotFound404 />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
