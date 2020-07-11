import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPosts, likePost } from "../../actions/postActions";
import CreateComment from "../CreateComment/CreateComment";
import CommentFeed from "../CommentFeed/CommentFeed";
import moment from "moment";

// TODO: Refactor this into separate components

function PostFeed({ posts, getPosts, likePost }) {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <div className="post-feed">
      {posts.map((post) => (
        <div key={post._id} className="post">
          <div className="post-date">{moment(post.date).fromNow()}</div>
          <div className="post-author">{post.authorName}</div>
          <div className="post-body">{post.body}</div>
          <div className="post-actions">
            <span>{post.likedBy ? post.likedBy.length : null}</span>
            <button
              onClick={() => likePost(post._id)}
              className="post-like-button"
            >
              Like
            </button>
          </div>
          <div className="comments">
            <CreateComment postId={post._id} />
            <CommentFeed postId={post._id} comments={post.comments} />
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
