import React, { useState, useRef } from "react";
import { addComment } from "../../actions/postActions";
import { connect } from "react-redux";

function CreateComment({ user, addComment, postId }) {
  const [commentText, setCommentText] = useState(null);

  const commentTextInput = useRef(null);

  const handleCommentInputChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      body: commentText,
    };

    addComment(postId, newComment);

    commentTextInput.current.value = null;
  };

  return (
    <form className="create-comment">
      <input
        type="text"
        name="post"
        id="post"
        placeholder="Add a comment..."
        ref={commentTextInput}
        onChange={handleCommentInputChange}
      />
      <button onClick={handleCommentSubmit} disabled={!commentText}>
        Post
      </button>
    </form>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { addComment })(CreateComment);
