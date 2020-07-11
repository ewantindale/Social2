import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getNotifications } from "../../actions/notificationActions";
import { AiFillLike } from "react-icons/ai";
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
              <div className="notification-icon">
                {action === "like" ? (
                  <AiFillLike color="green" size={25} />
                ) : null}
              </div>

              <div className="notification-body">
                {action === "like"
                  ? authorName + " liked your post" // TODO: Link to relevant user and post once those screens are done
                  : "error: invalid action: " + action}
              </div>
              <div className="notification-date">{moment(date).fromNow()}</div>
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
