import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { loadUser } from "./actions/authActions";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import LoadingScreen from "./screens/LoadingScreen/LoadingScreen";
import NotificationScreen from "./screens/NotificationScreen/NotificationScreen";
import SinglePostScreen from "./screens/SinglePostScreen/SinglePostScreen";
import SideNav from "./components/SideNav/SideNav";
import PrivateRoute from "./PrivateRoute";
import { connect } from "react-redux";
import "./css/styles.css";

function App({ isLoading, loadUser }) {
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/login">
            <LoginScreen />
          </Route>
          <PrivateRoute path="/">
            <Router>
              <Switch>
                <Route exact path="/">
                  <SideNav />
                  <HomeScreen />
                </Route>
                <Route path="/posts/:id">
                  <SideNav />
                  <SinglePostScreen />
                </Route>
                <Route path="/notifications">
                  <SideNav />
                  <NotificationScreen />
                </Route>
              </Switch>
            </Router>
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
});

export default connect(mapStateToProps, { loadUser })(App);
