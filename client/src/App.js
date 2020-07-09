import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import store from "./store";
import { loadUser } from "./actions/authActions";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import PrivateRoute from "./PrivateRoute";

export default function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  });

  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/">
          <HomeScreen />
        </PrivateRoute>
        <Route path="/login">
          <LoginScreen />
        </Route>
      </Switch>
    </Router>
  );
}
