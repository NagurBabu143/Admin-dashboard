import React from "react";
import "./Orders.css";

const Orders = ({ cart = [], removeFromCart, updateQuantity }) => {
    // Ensure cart is always an array
    const safeCart = Array.isArray(cart) ? cart : [];

    // Calculate Total Price
    const totalPrice = safeCart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="orders">
            <h2>Your Orders</h2>
            {safeCart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="order-list">
                    {safeCart.map((item) => (
                        <div key={item.id} className="order-item">
                            <img src={item.image} alt={item.name} className="order-image" />
                            <div>
                                <h3>{item.name}</h3>
                                <p>Price: Rs.{item.price}</p>
                                <div className="quantity-controls">
                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity === 1}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                </div>
                                <p>Total: Rs.{item.price * item.quantity}</p>
                                <button onClick={() => removeFromCart(item.id)}>Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <h3 className="total-price">Total Price: Rs.{totalPrice}</h3>
        </div>
    );
};

export default Orders;
