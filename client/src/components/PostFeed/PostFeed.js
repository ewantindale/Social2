import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPosts, likePost, deletePost } from "../../actions/postActions";
import CreateComment from "../CreateComment/CreateComment";
import CommentFeed from "../CommentFeed/CommentFeed";
import { AiOutlineLike, AiFillLike, AiOutlineDelete } from "react-icons/ai";
import moment from "moment";

function PostFeed({ posts, getPosts, likePost, deletePost, userId }) {
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
            <button
              onClick={() => likePost(post._id)}
              className="post-like-button"
            >
              {post.likedBy.includes(userId) ? (
                <AiFillLike size={20} color="green" />
              ) : (
                <AiOutlineLike size={20} />
              )}
              <span>{post.likedBy ? post.likedBy.length : null}</span>
            </button>
            {post.authorId === userId ? (
              <button
                onClick={() => deletePost(post._id)}
                className="post-delete-button"
              >
                <AiOutlineDelete size={20} color="red" />
              </button>
            ) : null}
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
  userId: state.auth.user._id,
});

export default connect(mapStateToProps, {
  getPosts,
  likePost,
  deletePost,
})(PostFeed);
