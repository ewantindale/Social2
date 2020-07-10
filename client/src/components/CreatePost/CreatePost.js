import React, { useState } from "react";
import { addPost } from "../../actions/postActions";
import { connect } from "react-redux";

function CreatePost({ user }) {
  const [postText, setPostText] = useState(null);

  const handlePostInputChange = (e) => {
    setPostText(e.target.value);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      authorId: user.id,
      body: postText,
    };

    addPost(newPost);

    setPostText(null);
  };

  return (
    <div>
      <form>
        <input
          type="text"
          name="post"
          id="post"
          placeholder="post"
          onChange={handlePostInputChange}
        />
        <button onClick={handlePostSubmit}>Post</button>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(CreatePost);
