import React from "react";
import "./SalesReports.css";

const salesData = [
  { id: 1, date: "2025-03-20", product: "Milk", quantity: 50, total: "Rs.200", customer: "John Doe", payment: "Cash" },
  { id: 2, date: "2025-03-21", product: "Cheese", quantity: 30, total: "Rs.150", customer: "Alice Smith", payment: "Credit Card" },
  { id: 3, date: "2025-03-22", product: "Butter", quantity: 20, total: "Rs.120", customer: "Bob Johnson", payment: "UPI" },
  { id: 4, date: "2025-03-23", product: "Yogurt", quantity: 40, total: "Rs.180", customer: "Emma Brown", payment: "Debit Card" },
];

const SalesReports = () => {
  return (
    <div className="sales-reports">
      <h2 className="fade-in">Sales Reports</h2>

      
      <div className="table-container slide-in">
        <table className="sales-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Customer</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((sale) => (
              <tr key={sale.id}>
                <td>{sale.date}</td>
                <td>{sale.product}</td>
                <td>{sale.quantity}</td>
                <td>{sale.total}</td>
                <td>{sale.customer}</td>
                <td>{sale.payment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
      <div className="sales-grid slide-up">
        {salesData.map((sale) => (
          <div key={sale.id} className="sales-card">
            <h3>{sale.product}</h3>
            <p><strong>Date:</strong> {sale.date}</p>
            <p><strong>Quantity:</strong> {sale.quantity}</p>
            <p><strong>Total:</strong> {sale.total}</p>
            <p><strong>Customer:</strong> {sale.customer}</p>
            <p><strong>Payment:</strong> {sale.payment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesReports;
