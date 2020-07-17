import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPosts, likePost } from "../../actions/postActions";
import CreateComment from "../../components/CreateComment/CreateComment";
import CommentFeed from "../../components/CommentFeed/CommentFeed";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import moment from "moment";
import { useParams } from "react-router-dom";

function SinglePostScreen({ posts, getPosts, likePost, userId }) {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const { id } = useParams();
  const post = posts.find((p) => p._id === id);

  if (!post) {
    return <div className="single-post-screen">Loading post...</div>;
  }

  return (
    <div className="single-post-screen">
      {
        <div className="post">
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
          </div>
          <div className="comments">
            <CreateComment postId={post._id} />
            <CommentFeed postId={post._id} comments={post.comments} />
          </div>
        </div>
      }
    </div>
  );
}

const mapStateToProps = (state) => ({
  posts: state.post.posts,
  userId: state.auth.user._id,
});

export default connect(mapStateToProps, { getPosts, likePost })(
  SinglePostScreen
);
