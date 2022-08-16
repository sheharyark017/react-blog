import { useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

import classes from "./Form.module.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, seterror] = useState("");

  const navigate = useNavigate();

  const { signIn } = UserAuth();

  const submitHandler = async (e) => {
    e.preventDefault();
    // seterror("");
    try {
      await signIn(email, password);
      navigate(-1);
      // console.log(user.email);
    } catch (e) {
      console.log(e.message);
      // seterror(e.message);
    }
  };

  return (
    <div className={classes.form}>
      <div className={classes.head}>
        <p>Sign In</p>
      </div>
      <form onSubmit={submitHandler}>
        <div className={classes["form-control"]}>
          <label htmlFor="">Email</label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className={classes["form-control"]}>
          <label htmlFor="">Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={classes["form-button"]}>
          <button type="submit">Sign in</button>
        </div>
      </form>
      <div className={classes["form-link"]}>
        <Link className={classes.link} to="/signup">
          Don't have an account
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
