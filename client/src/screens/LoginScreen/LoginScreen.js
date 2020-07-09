import React, { useEffect, useState, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { connect } from "react-redux";
import { login } from "../../actions/authActions";

import "./LoginScreen.css";

const LoginScreen = ({ isAuthenticated, login, error }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const prevErrorRef = useRef();

  useEffect(() => {
    if (error !== prevErrorRef.current) {
      if (error.id === "LOGIN_FAIL") {
        setErrorMessage(error.msg.msg);
      } else {
        setErrorMessage(null);
      }
    }
    prevErrorRef.current = error;
  }, [error]);

  useEffect(() => {
    if (isAuthenticated) {
      history.replace(from);
    }
  });

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name: username,
      password: password,
    };

    login(user);

    setUsername("");
    setPassword("");
  };

  return (
    <div className="container">
      <form>
        <h1>Welcome to Social</h1>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          onChange={handleChangeUsername}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={handleChangePassword}
        />

        {/* <input type="submit" value="Log In" /> */}
        <button onClick={handleSubmit}>Log In</button>
        <span className="error">{errorMessage ? errorMessage : ""}</span>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { login })(LoginScreen);
