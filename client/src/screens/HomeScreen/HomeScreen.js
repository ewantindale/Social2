import React from "react";
import PostFeed from "../../components/PostFeed/PostFeed";
import CreatePost from "../../components/CreatePost/CreatePost";

const HomeScreen = () => {
  return (
    <div className="home-screen">
      <div className="header">
        <h2>Home</h2>
        <CreatePost />
      </div>
      <PostFeed />
    </div>
  );
};

export default HomeScreen;
