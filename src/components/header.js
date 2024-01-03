import React from "react";
import { NavLink } from "react-router-dom";
import "./header.css";

const Header = ({ accessPointsRole, accessPointsDept }) => {
  console.log("accessPointsDept.....", accessPointsDept);
  return (
    <div className="headerContainer">
      {accessPointsRole.length > 0 &&
        accessPointsRole.map((accessPointRole) => (
          <NavLink key={accessPointRole.id} to={`/${accessPointRole.route}`} className="headerLink">
            {accessPointRole.name}
          </NavLink>
        ))}
      {accessPointsDept.length > 0 &&
        accessPointsDept.map((accessPointDept) => (
          <NavLink key={accessPointDept.id} to={`/${accessPointDept.route}`} className="headerLink">
            {accessPointDept.name}
          </NavLink>
        ))}
      <NavLink to="/profile" className="headerLink">
        Profile
      </NavLink>
      <NavLink to="/change-password" className="headerLink">
        Change Password
      </NavLink>
      <NavLink to="/contact" className="headerLink">
        Contact
      </NavLink>
      <NavLink to="/logout" className="headerLink">
        Logout
      </NavLink>
    </div>
  );
};

export default Header;
