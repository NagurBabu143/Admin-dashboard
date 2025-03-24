import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TextField,
} from "@mui/material";
import "./SalesTable.css";

const SalesTable = () => {
  const [sales, setSales] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedSale, setEditedSale] = useState(null);
  const [newSale, setNewSale] = useState({ item: "", amount: "", date: "" });

 
  useEffect(() => {
    const storedSales = JSON.parse(localStorage.getItem("sales")) || [];
    setSales(storedSales);
  }, []);


  useEffect(() => {
    if (sales.length > 0) {
      localStorage.setItem("sales", JSON.stringify(sales));
    }
  }, [sales]);


  const handleAddSale = () => {
    if (!newSale.item || !newSale.amount || !newSale.date) return;

    const updatedSales = [...sales, { id: Date.now(), ...newSale }];
    setSales(updatedSales);
    setNewSale({ item: "", amount: "", date: "" });
  };


  const handleEdit = (id) => {
    setEditingId(id);
    const saleToEdit = sales.find((sale) => sale.id === id);
    setEditedSale({ ...saleToEdit });
  };


  const handleSaveEdit = () => {
    const updatedSales = sales.map((sale) =>
      sale.id === editingId ? { ...editedSale } : sale
    );
    setSales(updatedSales);
    setEditingId(null);
    setEditedSale(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedSale(null);
  };

 
  const handleDeleteSale = (id) => {
    const updatedSales = sales.filter((sale) => sale.id !== id);
    setSales(updatedSales);
    localStorage.setItem("sales", JSON.stringify(updatedSales));
  };

  return (
    <div className="sales-table-container" style={{ padding: "20px" }}>
      <h2>Sales Records</h2>

      
      <div className="sales-form" style={{ marginBottom: "20px" }}>
        <TextField
          label="Item"
          value={newSale.item}
          onChange={(e) => setNewSale({ ...newSale, item: e.target.value })}
          style={{ marginRight: "10px" }}
        />
        <TextField
          label="Amount"
          type="number"
          value={newSale.amount}
          onChange={(e) => setNewSale({ ...newSale, amount: e.target.value })}
          style={{ marginRight: "10px" }}
        />
        <TextField
          type="date"
          value={newSale.date}
          onChange={(e) => setNewSale({ ...newSale, date: e.target.value })}
          style={{ marginRight: "10px" }}
        />
        <Button variant="contained" color="primary" onClick={handleAddSale}>
          Add Sale
        </Button>
      </div>

    
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Item</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sales.map((sale) => (
            <TableRow key={sale.id}>
              <TableCell>{sale.id}</TableCell>
              <TableCell>
                {editingId === sale.id ? (
                  <TextField
                    value={editedSale.item}
                    onChange={(e) =>
                      setEditedSale({ ...editedSale, item: e.target.value })
                    }
                  />
                ) : (
                  sale.item
                )}
              </TableCell>
              <TableCell>
                {editingId === sale.id ? (
                  <TextField
                    type="number"
                    value={editedSale.amount}
                    onChange={(e) =>
                      setEditedSale({ ...editedSale, amount: e.target.value })
                    }
                  />
                ) : (
                  sale.amount
                )}
              </TableCell>
              <TableCell>
                {editingId === sale.id ? (
                  <TextField
                    type="date"
                    value={editedSale.date}
                    onChange={(e) =>
                      setEditedSale({ ...editedSale, date: e.target.value })
                    }
                  />
                ) : (
                  sale.date
                )}
              </TableCell>
              <TableCell>
                {editingId === sale.id ? (
                  <>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={handleSaveEdit}
                      style={{ marginRight: "5px" }}
                    >
                      Save
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEdit(sale.id)}
                      style={{ marginRight: "5px" }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteSale(sale.id)}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SalesTable;
