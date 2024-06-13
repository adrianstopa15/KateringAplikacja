import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const handleShowOrders = async () => {
        try {
            const getCookieValue = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
            return null;
            };
            const authToken = getCookieValue("authToken");
            const decodedToken = jwtDecode(authToken);
            const login = decodedToken.sub;
    
            const response = await axios.get(
            `http://localhost:8080/showOrders`,
            {
                headers: {
                Authorization: `Bearer ${authToken}`,
                },
            }
            );
            setOrders(response.data);
        } catch (error) {
            console.error("Error showing orders:", error);
        }
        };
        handleShowOrders();
    }, []);

    return (
      <div>
        <div className="ml-s mt-s">
          <h1 className="h1-regular mb-m">Zamówienia klientów:</h1>
          {orders.map((order, index) => (
            <div key={`${order.orderId} ${index}`} className="address-display--element" style={{ marginBottom: "1rem", borderColor: "#c7c7c7" }}>
          <p>{order.customer.firstName} {order.customer.lastName}</p>
          <p>Nazwa diety: {order.diet.dietName}</p>
          <p>Od: {order.startDate}</p>
          <p>Do: {order.endDate}</p>
          <p>Cena: {order.price} zł</p>
          {/* <button className="button-27-d" onClick={() => handleDelete (order.orderId)}>Usuń</button> */}
        </div>
      ))}
        </div>
      </div>
    );
  }
  