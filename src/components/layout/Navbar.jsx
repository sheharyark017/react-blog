import React from "react";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { UserAuth } from "../../context/AuthContext";

import classes from "./Navbar.module.css";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const [isLogedIn, setIsLogedIn] = useState(true);

  // const navigate = useNavigate();

  const activeStatusHandler = (e) => {
    setIsActive((current) => !current);
  };

  const { user, logout, googleSignIn } = UserAuth();

  const logoutHandler = async () => {
    try {
      await logout();
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    user ? setIsLogedIn(true) : setIsLogedIn(false);
  }, [user]);

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>Version</div>
      </Link>
      <nav className={`${classes.nav} ${isActive ? classes.active : ""}`}>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${classes.active}` : ""
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add-blog"
              className={({ isActive }) =>
                isActive ? `${classes.active}` : ""
              }
            >
              Add Blog
            </NavLink>
          </li>
          {/* {!isLogedIn && (
            <li>
              <NavLink
                to="/signin"
                className={({ isActive }) =>
                  isActive ? `${classes.active}` : ""
                }
              >
                Sign In
              </NavLink>
            </li>
          )}
          {!isLogedIn && (
            <li>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  isActive ? `${classes.active}` : ""
                }
              >
                Sign Up
              </NavLink>
            </li>
          )} */}
          {!isLogedIn && (
            <li>
              <button
                className={classes["nav-btn"]}
                onClick={handleGoogleSignIn}
              >
                Sign in
              </button>
            </li>
          )}
          {isLogedIn && (
            <li>
              <button className={classes["nav-btn"]} onClick={logoutHandler}>
                Sign Out
              </button>
            </li>
          )}
        </ul>
      </nav>
      <div
        className={`${classes.hamburger} ${isActive ? classes.active : ""}`}
        onClick={activeStatusHandler}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
};

export default Navbar;
