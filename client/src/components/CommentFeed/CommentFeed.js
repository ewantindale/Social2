import React from "react";
import { connect } from "react-redux";
import { likeComment } from "../../actions/postActions";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import moment from "moment";

function CommentFeed({ comments, likeComment, postId, userId }) {
  return (
    <div className="comment-feed">
      {comments.map(({ _id, date, authorName, body, likedBy }) => (
        <div key={_id} className="comment">
          <div className="comment-date">{moment(date).fromNow()}</div>
          <div className="comment-author">{authorName}</div>
          <div className="comment-body">{body}</div>
          <div className="comment-actions">
            <button
              onClick={() => likeComment(postId, _id)}
              className="comment-like-button"
            >
              {likedBy.includes(userId) ? (
                <AiFillLike size={20} color="green" />
              ) : (
                <AiOutlineLike size={20} />
              )}
              <span>{likedBy ? likedBy.length : null}</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = (state) => ({
  userId: state.auth.user._id,
});

export default connect(mapStateToProps, { likeComment })(CommentFeed);
