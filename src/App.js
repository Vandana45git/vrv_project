
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import RoleManagement from "./components/RoleManagement";
import UserManagement from "./components/UserManagement";
import "./App.css"; 

const App = () => {
  // State to manage active page
  const [activePage, setActivePage] = useState("RoleManagement");

  // State to manage role permissions
  const [rolePermissions, setRolePermissions] = useState({
    Admin: { canEdit: false, canDelete: false },
    Editor: { canEdit: false, canDelete: false },
    Viewer: { canEdit: false, canDelete: false },
  });

  // State to manage selected roles
  const [selectedRoles, setSelectedRoles] = useState([]);

  return (
    <div>
      <Navbar setActivePage={setActivePage} activePage={activePage} />

      {/* Conditional rendering based on active page */}
      {activePage === "RoleManagement" ? (
        <RoleManagement
          rolePermissions={rolePermissions}
          setRolePermissions={setRolePermissions}
          setSelectedRoles={setSelectedRoles} // Pass setSelectedRoles to RoleManagement
        />
      ) : (
        <UserManagement
          selectedRoles={selectedRoles} // Pass selected roles to UserManagement
          rolePermissions={rolePermissions}
        />
      )}
    </div>
  );
};

export default App;

