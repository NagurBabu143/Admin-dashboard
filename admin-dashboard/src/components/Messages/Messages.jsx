import React, { useState } from "react";
import "./Messages.css";

const Messages = () => {
  const [messages] = useState([
    { id: 1, sender: "Admin", text: "Welcome to the Admin Panel!" },
    { id: 2, sender: "User123", text: "Can you help me with my account?" },
    { id: 3, sender: "Support", text: "Your request has been resolved." },
  ]);

  return (
    <div className="messages-container">
      <h2>Messages</h2>
      <ul className="messages-list">
        {messages.map((msg) => (
          <li key={msg.id} className="message-item">
            <strong>{msg.sender}: </strong> {msg.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Messages;
