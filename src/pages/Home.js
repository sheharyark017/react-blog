import React from "react";
import BlogList from "../components/blog/BlogList";
import FeaturedBlog from "../components/blog/FeaturedBlog";
import Spinner from "../components/layout/Spinner";
import { UserAuth } from "../context/AuthContext";

const Home = () => {
  const { loading } = UserAuth();

  if (loading)
    return (
      <div
        style={{
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spinner />
      </div>
    );

  return (
    <div>
      <FeaturedBlog />
      <BlogList />
    </div>
  );
};

export default Home;
