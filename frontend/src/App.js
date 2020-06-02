import React from "react";
import AppToolbar from "./components/UI/Toolbar/AppToolbar";
import { ToastContainer } from "react-toastify";
import Layout from "./containers/Layout/Layout";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";
import { useSelector } from "react-redux";

const App = () => {

	const user = useSelector(state => state.users.user)

  const ProtectedRoute = ({ isAllowed, ...props }) =>
    isAllowed ? <Route {...props} /> : <Redirect to="/login" />;

  return (
    <>
      <ToastContainer autoClose={3000} />
      <AppToolbar />
      <Switch>
				<Route path="/register/" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <ProtectedRoute isAllowed={user} path="/adm" component={Layout} />
				<ProtectedRoute isAllowed={user} path="/" component={Layout} />
        <Route render={() => <h1>Not found</h1>} />
      </Switch>
    </>
  );
};

export default App;
