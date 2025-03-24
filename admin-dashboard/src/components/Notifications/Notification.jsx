import React, { useState } from "react";
import "./Notifications.css";
import { Snackbar, Alert } from "@mui/material";

const Notifications = () => {
  const [open, setOpen] = useState(true); 

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
        You have a new notification!
      </Alert>
    </Snackbar>
  );
};

export default Notifications;
