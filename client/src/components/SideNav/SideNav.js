import React, { useState } from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
import { Link } from "react-router-dom";

const SideNav = ({ logout }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="sidenav">
      <Link onClick={() => setOpen(!open)}>
        <h1>Social</h1>
      </Link>
      <ul className={open ? "navOpen" : "navClosed"}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/">Notifications</Link>
        </li>
        <li>
          <Link to="/">Messages</Link>
        </li>
        <li>
          <Link to="/">Profile</Link>
        </li>
        <li>
          <Link onClick={logout}>Log Out</Link>
        </li>
      </ul>
    </div>
  );
};

export default connect(null, { logout })(SideNav);
