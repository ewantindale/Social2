import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getMessages } from "../../actions/messageActions";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { AiOutlineMail } from "react-icons/ai";
import SendMessage from "../../components/SendMessage/SendMessage";

const SingleConversationScreen = ({ messages, getMessages, userId }) => {
  const [name, setName] = useState(null);

  useEffect(() => {
    getMessages();
  }, [getMessages]);

  const { id } = useParams();

  if (!name) {
    messages
      .filter((m) => m.authorId === id || m.toId === id)
      .forEach((message) => {
        if (message.authorId !== userId) {
          setName(message.authorName);
        } else {
          setName(message.toName);
        }
      });
  }

  return (
    <div className="single-conversation-screen">
      <div className="header">
        <h2>
          Conversation with
          {" " + name}
        </h2>
      </div>
      <div className="message-feed-wrapper">
        <div className="message-feed">
          {messages
            .filter((m) => m.authorId === id || m.toId === id)
            .map((message) => (
              <div
                key={message._id}
                className={
                  message.authorId === userId ? "message sent" : "message"
                }
              >
                <div className="message-body">{message.body}</div>
                <div className="message-date">
                  {moment(message.date).fromNow()}
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="send-message">
        <SendMessage toId={id} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  messages: state.message.messages,
  userId: state.auth.user._id,
});

export default connect(mapStateToProps, { getMessages })(
  SingleConversationScreen
);
