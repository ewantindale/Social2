import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPosts, likePost } from "../../actions/postActions";
import moment from "moment";

function PostFeed({ posts, getPosts, likePost }) {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <div className="post-feed">
      {posts.map(({ _id, date, authorName, body, likedBy }) => (
        <div key={_id} className="post">
          <div className="post-date">{moment(date).fromNow()}</div>
          <div className="post-author">{authorName}</div>
          <div className="post-body">{body}</div>
          <div className="post-actions">
            <span>{likedBy ? likedBy.length : null}</span>
            <button onClick={() => likePost(_id)} className="post-like-button">
              Like
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = (state) => ({
  posts: state.post.posts,
});

export default connect(mapStateToProps, { getPosts, likePost })(PostFeed);
