import React from "react";
import { Link } from "react-router-dom";
import AuthService from "../../utils/auth";

const userId = AuthService.getUserId()

const Header = () => {
  const userId = AuthService.getUserId();

  return (
    <>
      <div className="header">
        <Link to="/dashboard">
          <img src="/imgs/P3-logo.png" alt="wingman logo" />
        </Link>
        <div className="headerRight">
        <Link to={`/account/likes/${userId}`}>
          <button className="ac-btn">Your Likes</button>
        </Link>
        <Link to={`/account/${userId}`}>
          <button className="ac-btn">Account</button>
        </Link>
        <Link to="/">
          <button>Log out</button>
        </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
