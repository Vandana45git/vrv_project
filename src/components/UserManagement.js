
import React, { useState, useEffect } from "react";



const UserManagement = ({ rolePermissions, selectedRoles }) => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "",
    status: "Active",
  });
  const [editingUser, setEditingUser] = useState(null); // Tracks the user being edited
  const [roleError, setRoleError] = useState(""); // For handling role validation

  useEffect(() => {
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) setUsers(JSON.parse(savedUsers));
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // Function to add a new user
  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.role) {
      alert("All fields are required.");
      return;
    }
    if (!newUser.email.includes("@gmail.com")) {
      alert("Email should be in @gmail.com format.");
      return;
    }
    if (!selectedRoles.includes(newUser.role)) {
      alert("Selected role is not authorized.");
      return;
    }
    setUsers([...users, { ...newUser, id: Date.now() }]);
    setNewUser({ name: "", email: "", role: "", status: "Active" });
    setRoleError(""); // Reset role error after adding a user
  };

  // Function to delete a user
  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  // Function to start editing a user
  const handleEditUser = (user) => {
    setEditingUser(user); // Set the user being edited
    setNewUser({ ...user }); // Pre-populate the form with the user data
  };

  // Function to save the edited user details
  const handleSaveEdit = () => {
    setUsers(
      users.map((user) =>
        user.id === editingUser.id ? { ...editingUser, ...newUser } : user
      )
    );
    setEditingUser(null); // Reset editing mode
    setNewUser({ name: "", email: "", role: "", status: "Active" }); // Clear form
  };

  // Function to handle status change
  const handleStatusChange = (e) => {
    setNewUser({ ...newUser, status: e.target.value });
  };

  // Function to handle role selection change
  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    if (!selectedRoles.includes(selectedRole)) {
      setRoleError("Please select a valid role for the user.");
    } else {
      setRoleError("");
    }
    setNewUser({ ...newUser, role: selectedRole });
  };

  return (
    <div className="container">
      <h2>User Management</h2>

      {/* Form for adding a new user */}
      {!editingUser && (
        <div className="form">
          <h3>Add New User</h3>
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <select
            value={newUser.role}
            onChange={handleRoleChange}
          >
            <option value="">Select Role</option>
            {selectedRoles &&
              selectedRoles.length > 0 &&
              selectedRoles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
          </select>

          {/* Display error message for role selection */}
          {roleError && <p style={{ color: "red" }}>{roleError}</p>}

          {/* Status dropdown */}
          <select
            value={newUser.status}
            onChange={handleStatusChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <button onClick={handleAddUser}>Add User</button>
        </div>
      )}

      {/* Form for editing an existing user */}
      {editingUser && (
        <div className="form">
          <h3>Edit User</h3>
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <select
            value={newUser.role}
            onChange={handleRoleChange}
          >
            <option value="">Select Role</option>
            {selectedRoles &&
              selectedRoles.length > 0 &&
              selectedRoles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
          </select>

          {/* Display error message for role selection */}
          {roleError && <p style={{ color: "red" }}>{roleError}</p>}

          {/* Status dropdown */}
          <select
            value={newUser.status}
            onChange={handleStatusChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <button onClick={handleSaveEdit}>Save Changes</button>
          <button onClick={() => setEditingUser(null)}>Cancel</button>
        </div>
      )}

      {/* Table to display users */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>
                {rolePermissions[user.role]?.canEdit && editingUser?.id !== user.id && (
                  <button onClick={() => handleEditUser(user)}>Edit</button>
                )}
                {rolePermissions[user.role]?.canDelete && (
                  <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
