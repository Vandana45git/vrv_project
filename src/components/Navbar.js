
import React from "react";
import "./Heading.css";

const Navbar = ({ setActivePage, activePage }) => {
  return (
    <nav className="navbar">
      <div className="logo">
        RBAC
      </div>
      <div className="buttons">
        <button
          className={activePage === "RoleManagement" ? "active" : ""}
          onClick={() => setActivePage("RoleManagement")}
        >
          Role Management
        </button>
        <button
          className={activePage === "UserManagement" ? "active" : ""}
          onClick={() => setActivePage("UserManagement")}
        >
          User Management
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
