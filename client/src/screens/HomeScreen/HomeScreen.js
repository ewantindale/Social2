import React from "react";
import PostFeed from "../../components/PostFeed/PostFeed";
import CreatePost from "../../components/CreatePost/CreatePost";
const HomeScreen = () => {
  return (
    <div className="home-screen">
      <CreatePost />
      <PostFeed />
    </div>
  );
};

export default HomeScreen;
