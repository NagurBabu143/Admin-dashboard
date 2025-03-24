import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
     
      <ul>
        <li><a href="/">🏠 Dashboard</a></li>
        <li><a href="/users">👥 Users</a></li>
        <li><a href="/sales">💰 Sales</a></li> 
        <li><a href="/reports">📊 Reports</a></li>
        <li><a href="/account">⚙️ Settings</a></li>
        <li><a href="/orders">🛒 Orders</a></li>
        <li><a href="/products">📦 Products</a></li>
        <li><a href="/inventory">📋 Inventory</a></li>
        <li><a href="/analytics">📈 Analytics</a></li>
        <li><a href="/messages">✉️ Messages</a></li>
        <li><a href="/support">🆘 Support</a></li>
        <li><a href="/logout">🚪 Logout</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;
