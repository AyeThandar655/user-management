import React from "react";
import { NavLink } from "react-router-dom";
import "./header.css";

const Header = ({ handleLogout, role }) => {

  return (
    <div className="headerContainer">
      {
        role === 1 && (
          <>
            <NavLink to="/home" className="headerLink">
              Home
            </NavLink>
            <NavLink to="/role" className="headerLink">
              Role
            </NavLink>
            <NavLink to="/register" className="headerLink">
              Register
            </NavLink>
          </>)
      }
      <NavLink to="/change-password" className="headerLink">
        Change Password
      </NavLink>
      <NavLink to="/profile" className="headerLink">
        Profile
      </NavLink>
      <NavLink to="/aboutus" className="headerLink">
        About
      </NavLink>
      <NavLink to="/contactus" className="headerLink">
        Contact
      </NavLink>
      <NavLink to="/" onClick={handleLogout} className="headerLink">
        Logout
      </NavLink>
    </div>
  );
};

export default Header;
