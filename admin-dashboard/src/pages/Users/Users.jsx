import React, { useState, useEffect } from "react";
import "./Users.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  const updateLocalStorage = (updatedUsers) => {
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState({ id: "", name: "", email: "", role: "" });

  const handleOpen = (user = { id: "", name: "", email: "", role: "" }) => {
    setEditMode(!!user.id);
    setCurrentUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentUser({ id: "", name: "", email: "", role: "" });
  };

  const handleSave = () => {
    let updatedUsers;
    if (editMode) {
      updatedUsers = users.map((user) => (user.id === currentUser.id ? currentUser : user));
    } else {
      const newUser = { ...currentUser, id: Date.now() };
      updatedUsers = [...users, newUser];
    }
    updateLocalStorage(updatedUsers);
    handleClose();
  };

  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    updateLocalStorage(updatedUsers);
  };

  const handleClearAll = () => {
    localStorage.removeItem("users");
    setUsers([]);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="users">
      <h2>User Management</h2>
      <div className="btn-container">
        <Button variant="contained" className="add-btn" onClick={() => handleOpen()}>
          + Add User
        </Button>
        <Button variant="contained" color="error" className="clear-btn" onClick={handleClearAll}>
          Clear All Users
        </Button>
      </div>

      
      <TextField
        label="Search Users"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow className="table-header">
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id} className="table-row">
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button variant="contained" className="edit-btn" size="small" onClick={() => handleOpen(user)}>
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    className="delete-btn"
                    size="small"
                    color="error"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? "Edit User" : "Add User"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="dense"
            value={currentUser.name}
            onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
          />
          <TextField
            label="Email"
            fullWidth
            margin="dense"
            value={currentUser.email}
            onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
          />
          <TextField
            label="Role"
            fullWidth
            margin="dense"
            value={currentUser.role}
            onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className="cancel-btn">
            Cancel
          </Button>
          <Button onClick={handleSave} className="save-btn">
            {editMode ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Users;
