import React from "react";
import PostFeed from "../../components/PostFeed/PostFeed";
import CreatePost from "../../components/CreatePost/CreatePost";
const HomeScreen = () => {
  return (
    <div className="home-screen">
      <h2>Home</h2>
      <CreatePost />
      <PostFeed />
    </div>
  );
};

export default HomeScreen;
