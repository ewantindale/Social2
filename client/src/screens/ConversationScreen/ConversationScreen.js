import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getMessages } from "../../actions/messageActions";
import { Link } from "react-router-dom";
import moment from "moment";
import { AiOutlineMail } from "react-icons/ai";

const ConversationScreen = ({
  messages,
  messagesLoading,
  getMessages,
  userId,
}) => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    getMessages();
  }, [getMessages]);

  messages.forEach((message) => {
    if (
      conversations.filter(
        (conversation) =>
          conversation.id === message.authorId ||
          conversation.id === message.toId
      ).length > 0
    ) {
      return;
    }
    if (message.authorId !== userId) {
      const latestMessage = messages
        .filter(
          (m) => m.authorId === message.authorId || m.toId === message.authorId
        )
        .reverse()[0];
      setConversations([
        ...conversations,
        {
          id: message.authorId,
          name: message.authorName,
          latestMessage: {
            body: latestMessage.body,
            date: latestMessage.date,
          },
        },
      ]);
    } else {
      const latestMessage = messages
        .filter((m) => m.authorId === message.toId || m.toId === message.toId)
        .reverse()[0];
      setConversations([
        ...conversations,
        {
          id: message.toId,
          name: message.toName,
          latestMessage: {
            body: latestMessage.body,
            date: latestMessage.date,
          },
        },
      ]);
    }
  });
  console.log("conversations: ", conversations);

  return (
    <div className="conversation-screen">
      <div className="header">
        <h2>All Conversations</h2>
      </div>
      {conversations.map((conversation, index) => (
        <Link key={index} to={`/messages/${conversation.id}`}>
          <div className="conversation">
            <div className="date">
              {moment(conversation.latestMessage.date).fromNow()}
            </div>
            <div className="name">{conversation.name}</div>
            <div className="message">{conversation.latestMessage.body}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  messages: state.message.messages,
  messagesLoading: state.message.isLoading,
  userId: state.auth.user._id,
});

export default connect(mapStateToProps, { getMessages })(ConversationScreen);
