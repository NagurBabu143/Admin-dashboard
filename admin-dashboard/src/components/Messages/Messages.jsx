import React, { useState, useRef, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import "./Messages.css";

const Messages = () => {

  const [editingMessage, setEditingMessage] = useState(null);

  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: "Support Team", 
      text: "Welcome to our service! How can we help you today?", 
      time: "10:00 AM",
      status: "read",
      isImportant: false,
      type: "client" 
    },
    { 
      id: 2, 
      sender: "John Doe", 
      text: "I'm having trouble with my account settings", 
      time: "10:05 AM",
      status: "read",
      isImportant: true,
      type: "user"
    },
    { 
      id: 3, 
      sender: "Support Team", 
      text: "We've reset your settings. Please try again.", 
      time: "10:10 AM",
      status: "unread",
      isImportant: true,
      type: "client"
    },
    { 
      id: 4, 
      sender: "Sarah Smith", 
      text: "When will my order ship?", 
      time: "10:15 AM",
      status: "unread",
      isImportant: false,
      type: "user"
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [typing, setTyping] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [replyTo, setReplyTo] = useState(null);
  const [activeTab, setActiveTab] = useState("user"); 
  const [currentSender, setCurrentSender] = useState("Support Agent");
  const messagesEndRef = useRef(null);

  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeTab]);


  const filteredMessages = messages.filter(msg => {
    const matchesTab = activeTab === "all" || msg.type === activeTab;
    const matchesSearch = msg.text.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         msg.sender.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    
    let messageText = newMessage;
    if (replyTo) {
      messageText = `Re: ${replyTo.sender} - ${newMessage}`;
    }

    const newMsg = {
      id: Date.now(),
      sender: activeTab === "client" ? currentSender : "You",
      text: messageText,
      time: currentTime,
      status: "unread",
      isImportant: false,
      type: activeTab
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
    setTyping(false);
    setReplyTo(null);
  };

  const handleDeleteMessage = (id) => {
    setMessages(messages.filter((msg) => msg.id !== id));
    setSelectedMessages(selectedMessages.filter(msgId => msgId !== id));
  };

  const handleDeleteSelected = () => {
    setMessages(messages.filter(msg => !selectedMessages.includes(msg.id)));
    setSelectedMessages([]);
  };

  const handleEditMessage = (msg) => {
    setEditingMessage(msg);
    setNewMessage(msg.text);
  };

  const handleUpdateMessage = () => {
    if (newMessage.trim() === "") return;
    setMessages(
      messages.map((msg) => 
        msg.id === editingMessage.id ? { ...msg, text: newMessage } : msg
      )
    );
    setNewMessage("");
    setEditingMessage(null);
  };

  const handleEmojiClick = (emojiData) => {
    setNewMessage((prevMessage) => prevMessage + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const toggleMessageSelection = (id) => {
    setSelectedMessages(prev => 
      prev.includes(id) 
        ? prev.filter(msgId => msgId !== id) 
        : [...prev, id]
    );
  };

  const toggleMessageImportance = (id) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, isImportant: !msg.isImportant } : msg
    ));
  };

  const markAsRead = (id) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, status: "read" } : msg
    ));
  };

  const handleReply = (msg) => {
    setReplyTo(msg);
    setNewMessage("");
  };

  return (
    <div className="messages-container">
      <h2>Message Center</h2>
      
      <div className="messages-tabs">
        <button 
          className={`tab-button ${activeTab === 'user' ? 'active' : ''}`}
          onClick={() => setActiveTab('user')}
        >
          User Messages
        </button>
        <button 
          className={`tab-button ${activeTab === 'client' ? 'active' : ''}`}
          onClick={() => setActiveTab('client')}
        >
          Client Messages
        </button>
        <button 
          className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Messages
        </button>
      </div>

      <div className="messages-controls">
        <input
          type="text"
          placeholder={`Search ${activeTab} messages...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        
        {activeTab === "client" && (
          <input
            type="text"
            placeholder="Your name/role"
            value={currentSender}
            onChange={(e) => setCurrentSender(e.target.value)}
            className="sender-input"
          />
        )}
        
        {selectedMessages.length > 0 && (
          <button 
            className="delete-selected-btn"
            onClick={handleDeleteSelected}
          >
            Delete Selected ({selectedMessages.length})
          </button>
        )}
      </div>

      
      {filteredMessages.length === 0 ? (
        <p className="no-messages">No {activeTab} messages found</p>
      ) : (
        <ul className="messages-list">
          {filteredMessages.map((msg) => (
            <li 
              key={msg.id} 
              className={`message-item 
                ${msg.type === 'client' ? 'client-message' : 'user-message'}
                ${msg.status === 'unread' ? 'unread' : ''}
                ${msg.isImportant ? 'important' : ''}
                ${selectedMessages.includes(msg.id) ? 'selected' : ''}
              `}
              onClick={() => markAsRead(msg.id)}
            >
              <div className="message-checkbox">
                <input
                  type="checkbox"
                  checked={selectedMessages.includes(msg.id)}
                  onChange={(e) => {
                    e.stopPropagation();
                    toggleMessageSelection(msg.id);
                  }}
                />
              </div>
              
              <div className="message-content">
                <div className="message-header">
                  <strong>{msg.sender}</strong>
                  <span className="message-time">{msg.time}</span>
                  {msg.isImportant && <span className="important-marker">⭐</span>}
                  {msg.status === 'unread' && <span className="unread-marker">•</span>}
                </div>
                
                <div className="message-text">{msg.text}</div>
                
                <div className="message-actions">
                  <button 
                    className="action-btn reply-btn" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReply(msg);
                    }}
                  >
                    Reply
                  </button>
                  
                  {activeTab === "client" && (
                    <>
                      <button 
                        className="action-btn edit-btn" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditMessage(msg);
                        }}
                      >
                        Edit
                      </button>
                      <button 
                        className="action-btn delete-btn" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteMessage(msg.id);
                        }}
                      >
                        Delete
                      </button>
                    </>
                  )}
                  
                  <button 
                    className="action-btn important-btn" 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMessageImportance(msg.id);
                    }}
                  >
                    {msg.isImportant ? 'Unmark' : 'Mark Important'}
                  </button>
                </div>
              </div>
            </li>
          ))}
          <div ref={messagesEndRef} />
        </ul>
      )}

      
      {typing && (
        <p className="typing-indicator">
          {activeTab === "client" ? currentSender : "You"} is typing...
        </p>
      )}


      {replyTo && (
        <div className="reply-indicator">
          Replying to: {replyTo.sender} - {replyTo.text.substring(0, 30)}...
          <button onClick={() => setReplyTo(null)}>Cancel</button>
        </div>
      )}


      <div className="message-input">
        <div className="message-textarea">
          <input
            type="text"
            placeholder={`Type your ${activeTab === 'client' ? 'response' : 'message'}...`}
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
              setTyping(e.target.value.length > 0);
            }}
            className="message-text-input"
          />
          
          <button 
            className="emoji-btn"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            😊
          </button>
        </div>
        
        {editingMessage ? (
          <div className="edit-controls">
            <button onClick={handleUpdateMessage} className="update-btn">
              Update
            </button>
            <button 
              onClick={() => {
                setEditingMessage(null);
                setNewMessage("");
              }} 
              className="cancel-btn"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button 
            onClick={handleSendMessage} 
            className="send-btn"
            disabled={!newMessage.trim() || (activeTab === "client" && !currentSender.trim())}
          >
            {activeTab === "client" ? "Send as Client" : "Send as User"}
          </button>
        )}
      </div>

   
      {showEmojiPicker && (
        <div className="emoji-picker">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
      
    
      <div className="messages-stats">
        <p>Total: {messages.length} | Users: {messages.filter(m => m.type === 'user').length} | Clients: {messages.filter(m => m.type === 'client').length}</p>
        <p>Unread: {messages.filter(msg => msg.status === 'unread').length} | Important: {messages.filter(msg => msg.isImportant).length}</p>
      </div>
    </div>
  );
};

export default Messages;