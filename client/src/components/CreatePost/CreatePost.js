import React, { useState, useRef } from "react";
import { addPost } from "../../actions/postActions";
import { connect } from "react-redux";

function CreatePost({ user, addPost }) {
  const [postText, setPostText] = useState(null);

  const postTextInput = useRef(null);

  const handlePostInputChange = (e) => {
    setPostText(e.target.value);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      body: postText,
    };

    addPost(newPost);

    postTextInput.current.value = null;
  };

  return (
    <form className="create-post">
      <input
        type="text"
        name="post"
        id="post"
        placeholder="What's on your mind?"
        ref={postTextInput}
        onChange={handlePostInputChange}
      />
      <button onClick={handlePostSubmit}>Post</button>
    </form>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { addPost })(CreatePost);
