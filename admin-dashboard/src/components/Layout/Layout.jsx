import React, { useState } from "react";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import "./Layout.css";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="layout">
      <TopBar toggleSidebar={toggleSidebar} />
      <div className="content-wrapper">
        <div className={`sidebar ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
          <Sidebar />
        </div>
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;