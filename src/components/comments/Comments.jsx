import React from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import Spinner from "../layout/Spinner";

import AddComments from "./AddComments";
import Comment from "./Comment";
import classes from "./Comments.module.css";

const Comments = ({ blogID }) => {
  const { user, loading } = UserAuth();

  const { comments } = UserAuth();

  const sortedComments = comments.sort((a, b) => {
    return b.timestamp - a.timestamp;
  });

  const blogComments = sortedComments.filter(
    (comment) => comment.ref == blogID
  );

  return (
    <div className={classes.Comments}>
      <p className={classes["comment-count"]}>
        {blogComments.length} .{" "}
        {blogComments.length === 1 ? "Comment" : "Comments"}
      </p>
      {user ? (
        <AddComments />
      ) : (
        <p className={classes.signin}>
          Sign in to post comment - <Link to="/signin">Sign In</Link>
        </p>
      )}
      {loading && <Spinner />}
      {blogComments.length === 0 && <p>No Comments</p>}
      {blogComments.length > 0 &&
        blogComments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
    </div>
  );
};

export default Comments;
