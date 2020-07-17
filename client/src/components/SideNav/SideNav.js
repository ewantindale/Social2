import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { AiOutlineHome, AiOutlineNotification } from "react-icons/ai";
import { getNotifications } from "../../actions/notificationActions";

const SideNav = ({ logout, notifications, getNotifications }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  const unreadNotifications = notifications.filter((n) => n.read === false)
    .length;

  return (
    <div className="sidenav">
      <Link to="#" onClick={() => setOpen(!open)} className="toggleNav">
        <FiMenu />
      </Link>
      <ul className={open ? "navOpen" : "navClosed"}>
        <li>
          <Link to="/">
            <AiOutlineHome />
            Home
          </Link>
        </li>
        <li>
          <Link to="/notifications">
            <AiOutlineNotification />
            Notifications
            {unreadNotifications ? (
              <span className="unread-notifications">
                {unreadNotifications}
              </span>
            ) : null}
          </Link>
        </li>
        <li>
          <Link to="/" onClick={logout}>
            Log Out
          </Link>
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  notifications: state.notification.notifications,
});

export default connect(mapStateToProps, { logout, getNotifications })(SideNav);
