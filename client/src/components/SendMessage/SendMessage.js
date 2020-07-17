import React, { useState, useRef } from "react";
import { addMessage } from "../../actions/messageActions";
import { connect } from "react-redux";

function SendMessage({ toId, addMessage }) {
  const messageTextInput = useRef(null);
  const submit = (e) => {
    e.preventDefault();
    const newMessage = {
      toId,
      body: messageTextInput.current.value,
    };

    addMessage(newMessage);

    messageTextInput.current.value = null;
  };

  return (
    <form className="create-message">
      <input
        type="text"
        name="message"
        id="message"
        placeholder="Your message here"
        ref={messageTextInput}
      />
      <button onClick={submit}>Send</button>
    </form>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { addMessage })(SendMessage);
