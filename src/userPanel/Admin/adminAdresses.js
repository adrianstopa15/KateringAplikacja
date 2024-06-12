import React, { useState, useEffect } from "react";
import { useAuth } from '../../AuthContext';
import axios from "axios";
import PanelModal from "../panelModal";
import AdminAdressesEdit from "./adminAdressesEdit";


export default function AdminAdresses() {
  const { userData, fetchUserData} = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState("UserData");
  const [modalMode, setModalMode] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [customers, setCustomers] = useState([]);

  const {
    housingType, setHousingType,
    firstName, lastName, 
      setPhone,
      street, setStreet,
      apartmentNumber, setApartmentNumber,
      floor, setFloor,
      postalCode, setPostalCode,
      city, setCity, addressId,
      currentEdit, setCurrentEdit, handleEdit, onEdit,
      editAddressIndex, setEditAddressIndex, handleDelete, houseNumber, setHouseNumber} = useAuth();


      useEffect(() => {
        const fetchAddresses = async () => {
          const getCookieValue = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
            return null;
          };
          const authToken = getCookieValue("authToken");
    
          try {
            const response = await axios.get(
              `http://localhost:8080/showCustomers`,
              {
                headers: {
                  Authorization: `Bearer ${authToken}`,
                },
              }
            );
            setCustomers(response.data);
            
            const addressesResponse = await axios.get('http://localhost:8080/showCustomAddresses', {
              headers: { Authorization: `Bearer ${authToken}` },
            });
            setAddresses(addressesResponse.data); 
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchAddresses();
      }, []);

    useEffect(() => {
      if (addresses.length > 0 && editAddressIndex != null) {
        const address = addresses[editAddressIndex];
        setStreet(address.street);
        setApartmentNumber(address.apartmentNumber);
        setPostalCode(address.postalCode);
        setCity(address.city);
        setHouseNumber(address.houseNumber);
      }
    }, [addresses, editAddressIndex]);
   

  const handleOpenModal = (mode) => {
    setModalMode(mode);
    setIsOpen(true);
  };
 
  const handleCloseModal = () => {
    setIsOpen(false);
    setModalMode(null);
    setEditAddressIndex(null);
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  
  return (
    <div>
      <div className="user-data-display ml-s mt-s">
        <h1 className="h1-regular mb-m">Adresy użytkowników:</h1>
        <div className="address-info">
          {customers.map((customer, index) => (
            <div key={customer.customerId}>
              <h3>{customer.firstName} {customer.lastName}</h3>
              {customer.addresses.map((address) => (
                <div key={index} className="address-display--element" style={{ marginBottom: "1rem", borderColor: "#c7c7c7" }}>
                  <p>Ulica: {address.street} {address.houseNumber}</p>
                  <p>Kod pocztowy: {address.postalCode}</p>
                  <p>Miasto: {address.city}</p>
                  <button className="button-27-e " onClick={() => {setIsOpen(true); handleOpenModal('edit'); setEditAddressIndex(index); onEdit(address.addressId)}}>
                  Zaktualizuj adres
                  </button>
                  <button className={`button-27-d ml-s`}
                  onClick={() => handleDelete(address.addressId)}
                  >Usuń adres
                  </button>
                </div>
              ))}
            </div>
        ))}
  <AdminAdressesEdit open={isOpen && modalMode === 'edit'} onClose={() => {handleCloseModal(); setEditAddressIndex(null); }}>
      {editAddressIndex !== null && (
        <form onSubmit={handleSubmit} className="form1">
          <div className="form-group">
            <label>Mieszkam w:</label>
            <select
            value={housingType}
            onChange={(e) => setHousingType(e.target.value)}
            name="housingType"
            id="housingType"
            >
          <option value="dom">Domu</option>
          <option value="mieszkanie">Mieszkaniu</option>
        </select>
      </div>
      <div className="form-group">
        <label>Nazwa ulicy:</label>
        <input
          type="text"
          name="street"
          defaultValue={addresses[editAddressIndex].street}
          onChange={(e) => setStreet(e.target.value)} required 
        />
      </div>
      <div className="form-group">
        <label>Numer ulicy/domu:</label>
        <input
          type="text"
          name="houseNumber"
          defaultValue={addresses[editAddressIndex].houseNumber}
          onChange={(e) => setHouseNumber(e.target.value)} required 
        />
      </div>
      <div className="form-group">
        <label>Kod pocztowy:</label>
        <input
          type="text"
          name="postalCode"
          pattern="\d{2}-\d{3}" maxLength="6" placeholder="00-000"
          defaultValue={addresses[editAddressIndex].postalCode}
          onChange={(e) => setPostalCode(e.target.value)} required 
        />
      </div>
      <div className="form-group">
        <label>Miasto:</label>
        <input
          type="text"
          name="city"
          defaultValue={addresses[editAddressIndex].city}
          onChange={(e) => setCity(e.target.value)} required 
        />
      </div>
      {housingType === "mieszkanie" && (
        <>
          <div className="form-group">
            <label>Numer mieszkania:</label>
            <input
              type="text"
              name="apartmentNumber"
              value={apartmentNumber}
              id="apartmentNumber"
              onChange={(e) => setApartmentNumber(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Piętro:</label>
            <input
              type="text"
              name="floor"
              value={floor}
              id="floor"
              onChange={(e) => setFloor(e.target.value)} required 
            />
          </div>
        </>
      )}
              </form>
            )}
          </AdminAdressesEdit>
        </div>
      </div>
    </div>
  );
}
 
  