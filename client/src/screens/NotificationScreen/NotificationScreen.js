import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getNotifications } from "../../actions/notificationActions";
import moment from "moment";

const NotificationScreen = ({ notifications, getNotifications, isLoading }) => {
  useEffect(() => {
    getNotifications();
  }, [getNotifications]);
  if (isLoading) {
    return <div>Loading notifications...</div>;
  }
  return (
    <div className="notification-screen">
      <div className="header">
        <h2>Notifications</h2>
        <div className="notification-feed">
          {notifications.map(({ date, _id, authorId, authorName, action }) => (
            <div key={_id} className="notification">
              <div className="notification-date">{moment(date).fromNow()}</div>
              <div className="notification-body">
                {action === "like"
                  ? authorName + " liked your post"
                  : "error: invalid action: " + action}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  notifications: state.notification.notifications,
  isLoading: state.notification.isLoading,
});

export default connect(mapStateToProps, { getNotifications })(
  NotificationScreen
);
