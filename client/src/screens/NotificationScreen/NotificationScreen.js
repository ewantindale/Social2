import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getNotifications,
  markNotificationsAsRead,
} from "../../actions/notificationActions";
import { AiFillLike, AiOutlineComment } from "react-icons/ai";
import { Link } from "react-router-dom";
import moment from "moment";

const NotificationScreen = ({
  notifications,
  getNotifications,
  isLoading,
  markNotificationsAsRead,
}) => {
  useEffect(() => {
    getNotifications();
    markNotificationsAsRead();
  }, [getNotifications, markNotificationsAsRead]);
  if (isLoading) {
    return <div>Loading notifications...</div>;
  }
  return (
    <div className="notification-screen">
      <div className="header">
        <h2>Notifications</h2>
        {/* <button onClick={markNotificationsAsRead}>Mark All As Read</button> */}
      </div>
      <div className="notification-feed">
        {notifications.map(
          ({ date, _id, authorId, authorName, postId, action, read }) => (
            <div
              key={_id}
              className={
                read ? "notification" : "notification notification-unread"
              }
            >
              {action === "likePost" ? (
                <>
                  <div className="notification-icon">
                    <AiFillLike color="green" size={25} />
                  </div>
                  <div className="notification-body">
                    {authorName} liked your{" "}
                    <Link to={`/posts/${postId}`}>post</Link>
                  </div>
                </>
              ) : action === "likeComment" ? (
                <>
                  <div className="notification-icon">
                    <AiFillLike color="green" size={25} />
                  </div>
                  <div className="notification-body">
                    {authorName} liked your{" "}
                    <Link to={`/posts/${postId}`}>comment</Link>
                  </div>
                </>
              ) : action === "comment" ? (
                <>
                  <div className="notification-icon">
                    <AiOutlineComment color="blue" size={25} />
                  </div>
                  <div className="notification-body">
                    {authorName} commented on your{" "}
                    <Link to={`/posts/${postId}`}>post</Link>
                  </div>
                </>
              ) : (
                <span>ERROR: Invalid notification type.</span>
              )}

              <div className="notification-date">{moment(date).fromNow()}</div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  notifications: state.notification.notifications,
  isLoading: state.notification.isLoading,
});

export default connect(mapStateToProps, {
  getNotifications,
  markNotificationsAsRead,
})(NotificationScreen);
