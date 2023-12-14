import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

const Header = ({ handleLogout }) => {

  return (
    <div className="headerContainer">
      <Link to="/home" className="headerLink">
        Home
      </Link>
      <Link to="/change-password" className="headerLink">
        Change Password
      </Link>
      <Link to="/" onClick={handleLogout} className="headerLink">
        Logout
      </Link>
    </div>
  );
};

export default Header;
