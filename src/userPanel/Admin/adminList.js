import React, { useState, useEffect } from "react";
import { useAuth } from '../../AuthContext';
import axios from "axios";
import AdminListCustomer from "./adminListModal";

export default function AdminList() {
  const [customers, setCustomers] = useState([]);
  const [modalMode, setModalMode] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const {setEditCustomerIndex, editCustomerIndex, onEditCustomer, currentCustomer } = useAuth();

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

    useEffect(() => {
      if (currentCustomer !== null) {
        const customer = customers.find(c => c.customerId === currentCustomer);
        if (customer) {
          setFirstName(customer.firstName);
          setLastName(customer.lastName);
          setPhone(customer.phone);
        }
      }
    }, [currentCustomer, customers, setFirstName, setLastName, setPhone]);

    const handleOpenModal = (mode) => {
      setModalMode(mode);
      setIsOpen(true);
    };

    const handleCloseModal = () => {
      setIsOpen(false);
      setModalMode(null);
      setEditCustomerIndex(null);

    };

    const handleSubmit = async (e) => {
      e.preventDefault();
    };


    const handleDeleteCustomer = async (customerId) => {

      const getCookieValue = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
      };
      const authToken = getCookieValue("authToken");
      
      if (window.confirm("Czy na pewno chcesz usunąć tego użytkownika i wszystkie jego dane?")) {
        try {
          const response = await axios.post(`http://localhost:8080/deleteCustomer?id=${customerId}`, {} , {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
    
          if (response.status === 200) {
            setCustomers(prev => prev.filter(customer => customer.customerId !== customerId)); 
            alert("Użytkownik został usunięty.");
          } else {
            alert("Nie udało się usunąć użytkownika. Status: " + response.status);
          }
        } catch (error) {
          alert("Nie udało się usunąć użytkownika: " + error.message);
        }
      }
    };

    return (
      <div>
        <div className="user-da   ta-display ml-s mt-s">
        <h1 className="h1-regular mb-m">Lista użytkowników:</h1>
        {customers.map((customer, index) => (
          <div key={index} className="address-display--element" style={{ marginBottom: "1rem", borderColor: "#c7c7c7" }}>
            <p>Imię: {customer.firstName}</p>
            <p>Nazwisko: {customer.lastName}</p>
            <p>Telefon: {customer.phone}</p>
            <button className="button-27-e" onClick={(e) =>{setIsOpen(true); handleOpenModal('edit'); setEditCustomerIndex(index); onEditCustomer(customer.customerId)}}>Edytuj</button>
            <button className="button-27-d ml-s" onClick={() => handleDeleteCustomer(customer.customerId)}>Usuń</button>
        </div>
        ))}
      
        <AdminListCustomer open={isOpen && modalMode === 'edit'} onClose={() => handleCloseModal()}>
      {editCustomerIndex !== null && (
        <form onSubmit={handleSubmit} className="form1">
        <div className="form-group">
          <label>Podaj Imię:</label>
          <input type="text" value={firstName} name="firstName" id="firstName" onChange={(e) => setFirstName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Podaj nazwisko:</label>
          <input type="text" name="lastName" value={lastName} id="lastName" onChange={(e) => setLastName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Podaj nr telefonu:</label>
          <input type="tel" value={phone} name="phone" id="phone" onChange={(e) => setPhone(e.target.value)} required 
           pattern="\d{9}" maxLength="9" placeholder="000-000-000"
          />
        </div>
        </form>
      )}
      </AdminListCustomer>
      </div>
    </div>
  ); 
}
