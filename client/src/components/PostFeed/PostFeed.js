import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPosts } from "../../actions/postActions";

function PostFeed({ posts, getPosts }) {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <div>
      {posts.map((post) => (
        <div key={post._id}>
          <div>{post.authorId}</div>
          <div>{post.body}</div>
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = (state) => ({
  posts: state.post.posts,
});

export default connect(mapStateToProps, { getPosts })(PostFeed);
