import React from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";

const HomeScreen = ({ logout }) => {
  return (
    <div>
      Home Screen - Protected <button onClick={logout}>Log Out</button>
    </div>
  );
};

export default connect(null, { logout })(HomeScreen);
