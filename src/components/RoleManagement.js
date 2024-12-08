

import React, { useState } from "react";

const RoleManagement = ({ rolePermissions, setRolePermissions, setSelectedRoles }) => {
  const [tempPermissions, setTempPermissions] = useState(rolePermissions);
  const [successMessage, setSuccessMessage] = useState("");

  // Handle permission change (canEdit or canDelete)
  const handlePermissionChange = (role, permissionType) => {
    setTempPermissions((prev) => ({
      ...prev,
      [role]: {
        ...prev[role],
        [permissionType]: !prev[role][permissionType],
      },
    }));
  };

  // Save selected permissions and roles
  const handleSave = () => {
    setRolePermissions(tempPermissions);
    const selectedRoles = Object.keys(tempPermissions).filter((role) => {
      return tempPermissions[role].canEdit || tempPermissions[role].canDelete;
    });
    setSelectedRoles(selectedRoles); // Save selected roles
    setSuccessMessage("Roles saved successfully!"); // Display success message
  };

  // Reset all checkboxes to default (unchecked)
  const handleCancel = () => {
    setTempPermissions(
      Object.keys(rolePermissions).reduce((acc, role) => {
        acc[role] = {
          canEdit: false, // Reset 'canEdit' to false
          canDelete: false, // Reset 'canDelete' to false
        };
        return acc;
      }, {})
    ); // Reset permissions to unchecked
    setSuccessMessage(""); // Clear success message
  };

  return (
    <div className="container">
      <h2>Role Management</h2>
      <table>
        <thead>
          <tr>
            <th>Role</th>
            <th>Can Edit</th>
            <th>Can Delete</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(tempPermissions).map((role) => (
            <tr key={role}>
              <td>{role}</td>
              <td>
                <input
                  type="checkbox"
                  checked={tempPermissions[role].canEdit}
                  onChange={() => handlePermissionChange(role, "canEdit")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={tempPermissions[role].canDelete}
                  onChange={() => handlePermissionChange(role, "canDelete")}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <div>
        <button onClick={handleSave}>Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default RoleManagement;

