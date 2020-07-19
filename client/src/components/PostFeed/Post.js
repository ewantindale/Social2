import React from "react";
import { AiOutlineLike, AiFillLike, AiOutlineDelete } from "react-icons/ai";
import CreateComment from "../CreateComment/CreateComment";
import CommentFeed from "../CommentFeed/CommentFeed";
import moment from "moment";

export default function Post({ post, likePost, deletePost, userId }) {
  return (
    <div key={post._id} className="post">
      <div className="post-date">{moment(post.date).fromNow()}</div>
      <div className="post-author">{post.authorName}</div>
      <div className="post-body">{post.body}</div>
      <div className="post-actions">
        <button onClick={() => likePost(post._id)} className="post-like-button">
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
  );
}
