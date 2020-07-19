import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPosts, likePost, deletePost } from "../../actions/postActions";
import Post from "./Post";

function PostFeed({ posts, getPosts, likePost, deletePost, userId }) {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <div className="post-feed">
      {posts.map((post) => (
        <Post
          post={post}
          likePost={likePost}
          deletePost={deletePost}
          userId={userId}
        />
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
