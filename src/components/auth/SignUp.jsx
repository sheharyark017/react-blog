import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import classes from "./Form.module.css";

import { UserAuth } from "../../context/AuthContext";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [retypePassword, setRetypePassword] = useState("");
  const [error, setError] = useState("");

  const { createUser } = UserAuth();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUser(email, password);
      navigate(-2 || "/");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <div className={classes.form}>
      <div className={classes.head}>
        <p>Sign Up</p>
      </div>
      <form onSubmit={submitHandler}>
        <div className={classes["form-control"]}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={classes["form-control"]}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* <div className={classes["form-control"]}>
          <label htmlFor="retype-password">Retype Password</label>
          <input
            id="retype-password"
            type="password"
            onChange={(e) => setRetypePassword(e.target.value)}
          />
        </div> */}
        <div className={classes["form-button"]}>
          <button type="submit">Sign up</button>
        </div>
      </form>
      <div className={classes["form-link"]}>
        <Link className={classes.link} to="/signin">
          Already have an account
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
