import React, { useState, useEffect } from "react";
import { useAuth } from '../../AuthContext';
import axios from "axios";
import PanelModal from "../panelModal";

export default function AdminList() {
  const [customers, setCustomers] = useState([]);
  const [editCustomerIndex, setEditCustomerIndex] = useState(null);
  const [currentCustomer, setCurrentCustomer] = useState();
  const { isOpen, setIsOpen, modalMode, setModalMode } = useAuth();
  
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
      setCurrentCustomer(customers[index]);
      setEditCustomerIndex(index);
    };

    const handleOpenModal = (mode) => {
      setModalMode(mode);
      setIsOpen(true);
    };

    const handleCloseModal = () => {
      setIsOpen(false);
      setModalMode(null);
    };

    const handleSubmit1 = async (e) => {
      await handleCustomerEdit(e);
      e.preventDefault();  
    };

    const handleCustomerEdit = async (e) => {
      e.preventDefault();
    
      if (currentCustomer === null) {
        alert('Nie wybrano klienta do edycji!');
        return;
      }
    
      const getCookieValue = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
      };
      const authToken = getCookieValue("authToken");
      console.log(currentCustomer); 

    
      const data = {
        firstName: firstName,
        lastName: lastName,
        phone: phone,
      };
    
      try {
        const response = await axios.post(`http://localhost:8080/editCustomer?id=${currentCustomer}`, data, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
    
        if (response.status === 200) {
          console.log('Edycja zakończona sukcesem', response.data);
          alert("Dane użytkownika zostały zaktualizowane.");
          
          const updatedCustomers = [...customers];
          updatedCustomers[editCustomerIndex] = response.data;
          setCustomers(updatedCustomers);
    
          setIsOpen(false);
          setCurrentCustomer(null);
          setModalMode(null);
        } else {
          console.error('Nieoczekiwana odpowiedź serwera przy edycji klienta:', response);
          alert("Nie udało się zaktualizować danych użytkownika. Status: " + response.status);
        }
      } catch (error) {
        console.error("Error updating customer:", error);
        alert("Nie udało się zaktualizować danych użytkownika: " + error.message);
      }
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
          const authToken = document.cookie.split('; ').find(row => row.startsWith('authToken=')).split('=')[1];
          const response = await axios.delete(`http://localhost:8080/deleteCustomer?id=${currentCustomer}`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
    
          if (response.status === 200) {
            console.log('Usuwanie zakończone sukcesem', response.data);
            setCustomers(customers.filter(customer => customer.id !== customerId)); 
            alert("Użytkownik został usunięty.");
          } else {
            console.error('Nieoczekiwana odpowiedź serwera przy usuwaniu klienta:', response);
            alert("Nie udało się usunąć użytkownika. Status: " + response.status);
          }
        } catch (error) {
          console.error("Error deleting customer:", error);
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
            <button className="button-27-e" onClick={() => { setIsOpen(true); handleOpenModal('edit'); handleEditCustomer(customer.customerId); }}>Edytuj</button>
            <button className="button-27-d ml-s" onClick={() => handleDeleteCustomer(customer.customerId)}>Usuń</button>
        </div>
        ))}
      
        <PanelModal open={isOpen && modalMode === 'edit'} onClose={() => handleCloseModal()}>
      {editCustomerIndex !== null && (
        <form onSubmit={handleSubmit1} className="form1">
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
      </PanelModal>
      </div>
    </div>
  ); 
}
