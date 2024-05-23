import React, { useState, useEffect } from "react";
import { useAuth } from '../../AuthContext';
import axios from "axios";
import AdminModal from "./adminModal";


export default function AdminList() {
  const [customers, setCustomers] = useState([]);
  const [editCustomerIndex, setEditCustomerIndex] = useState(null);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const {isOpen, setIsOpen, handleSubmit } = useAuth();


  const {
      firstName, setFirstName,
      lastName, setLastName,
      phone, setPhone} = useAuth();

  useEffect(() => {
      const fetchCustomers = async () => {
        try {
          const getCookieValue = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
            return null;
          };
          const authToken = getCookieValue("authToken");
    
          const response = await axios.get(
            `http://localhost:8080/showCustomers`,
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );
          setCustomers(response.data);
        } catch (error) {
          console.error("Error fetching cutomers:", error);
        }
      };
      fetchCustomers();
    }, []);

    const handleEditCustomer = (index) => {
      setIsOpen(true);
      setEditCustomerIndex(index);
    };


    const handleDeleteCustomer = async (customerId) => {
      if (window.confirm("Czy na pewno chcesz usunąć tego użytkownika i wszystkie jego dane?")) {
        try {
          const authToken = document.cookie.split('; ').find(row => row.startsWith('authToken=')).split('=')[1];
          await axios.delete(`http://localhost:8080/deleteCustomer/${customerId}`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
          setCustomers(customers.filter(customer => customer.id !== customerId)); 
          alert("Użytkownik został usunięty.");
        } catch (error) {
          console.error("Error deleting customer:", error);
          alert("Nie udało się usunąć użytkownika.");
        }
      }
    };
    return (
      <div>
        <div className="user-da   ta-display ml-s mt-s">
        <h1 className="h1-regular mb-m">Lista użytkowników:</h1>
        {customers.map(customer => (
          <div key={customer.id} className="address-display--element" style={{ marginBottom: "1rem", borderColor: "#c7c7c7" }}>
            <p>Imię: {customer.firstName}</p>
            <p>Nazwisko: {customer.lastName}</p>
            <p>Telefon: {customer.phone}</p>
            {/* <button className="button-27-e " onClick={() => {setIsOpen(true); handleEditCustomer(customer)}}>Edytuj</button> */}
            <button className="button-27-d ml-s" onClick={() => handleDeleteCustomer(customer.id)}>Usuń</button>
          </div>
        ))}
        {/* {isOpen && <AdminModal customer={currentCustomer} onClose={() => setIsOpen(false)} />} */}
      </div>
      </div>
    );
  }
          
