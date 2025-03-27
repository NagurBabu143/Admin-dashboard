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
  Snackbar,
  Alert,
  TablePagination,
} from "@mui/material";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState({ open: false, message: "" });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  useEffect(() => {
    setPage(0);
  }, [searchQuery]);

  const updateLocalStorage = (updatedUsers) => {
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
    image: "",
  });

  const handleOpen = (user = { id: "", name: "", email: "", role: "", image: "" }) => {
    setEditMode(!!user.id);
    setCurrentUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentUser({ id: "", name: "", email: "", role: "", image: "" });
  };

  const handleSave = () => {
    let updatedUsers;
    if (editMode) {
      updatedUsers = users.map((user) =>
        user.id === currentUser.id ? currentUser : user
      );
    } else {
      const newId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
      const newUser = { ...currentUser, id: newId };
      updatedUsers = [...users, newUser];

      setNotification({ open: true, message: `User ${newUser.name} added successfully!` });
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentUser({ ...currentUser, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="users">
      <h2>User Management</h2>
      <div className="btn-container">
        <Button
          variant="contained"
          className="add-btn"
          onClick={() => handleOpen()}
        >
          + Add User
        </Button>
        <Button
          variant="contained"
          color="error"
          className="clear-btn"
          onClick={handleClearAll}
        >
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
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
              <TableRow key={user.id} className="table-row">
                <TableCell>{user.id}</TableCell>
                <TableCell>
                  {user.image ? (
                    <img src={user.image} alt="User" className="user-image" />
                  ) : (
                    "No Image"
                  )}
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <div className="action-buttons">
                    <Button
                      variant="contained"
                      className="edit-btn"
                      size="small"
                      onClick={() => handleOpen(user)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      className="delete-btns"
                      size="small"
                      color="error"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? "Edit User" : "Add User"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="dense"
            value={currentUser.name}
            onChange={(e) =>
              setCurrentUser({ ...currentUser, name: e.target.value })
            }
          />
          <TextField
            label="Email"
            fullWidth
            margin="dense"
            value={currentUser.email}
            onChange={(e) =>
              setCurrentUser({ ...currentUser, email: e.target.value })
            }
          />
          <TextField
            label="Role"
            fullWidth
            margin="dense"
            value={currentUser.role}
            onChange={(e) =>
              setCurrentUser({ ...currentUser, role: e.target.value })
            }
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ marginTop: "10px" }}
          />
          {currentUser.image && (
            <img
              src={currentUser.image}
              alt="Preview"
              className="preview-image"
            />
          )}
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

      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={() => setNotification({ open: false, message: "" })}
      >
        <Alert
          onClose={() => setNotification({ open: false, message: "" })}
          severity="success"
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Users;