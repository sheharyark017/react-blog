import { addDoc, collection, serverTimestamp } from "@firebase/firestore";
import { async } from "q";
import React, { useState } from "react";
import { useParams } from "react-router";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import useInput from "../../hooks/useInput";
import Spinner from "../layout/Spinner";
import classes from "./AddComments.module.css";

const AddComments = () => {
  const {
    enteredValue,
    isValid,
    valueChangeHandler,
    inputBlurHandler,
    clearInputHandler,
  } = useInput((value) => value.trim() !== "");

  const [loading, setLoading] = useState(false);

  const params = useParams();
  const { blogID } = params;

  const {
    user: { email, displayName, photoURL },
  } = UserAuth();

  const commentPostHandler = async (e) => {
    e.preventDefault();
    if (isValid) {
      setLoading(true);
      await addDoc(collection(db, "comments"), {
        enteredValue,
        timestamp: serverTimestamp(),
        email,
        photoURL,
        displayName,
        ref: blogID,
      });
      clearInputHandler();
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <>
      <form className={classes["comment-form"]} onSubmit={commentPostHandler}>
        <div className={classes.input}>
          <label htmlFor="comment">Write your comment</label>
          <input
            id="comment"
            type="text"
            value={enteredValue}
            onChange={valueChangeHandler}
            onBlur={inputBlurHandler}
          />
        </div>

        <div className={classes.button}>
          <button disabled={!isValid}>Post</button>
        </div>
      </form>
    </>
  );
};

export default AddComments;
