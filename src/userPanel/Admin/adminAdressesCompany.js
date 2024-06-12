import React, { useState, useEffect } from "react";
import { useAuth } from '../../AuthContext';
import axios from "axios";
import AdminAdressesModal from "./adminAddressesModal";
import AdminAdressesModalAdd from "./adminAddressesModalAdd";


export default function AdminAdressesCompany() {

  const { userData, fetchUserData} = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState("UserData");
  const [modalMode, setModalMode] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [companies, setCompanies] = useState([]);

  const {
    housingType, setHousingType,
    companyName, companyId,
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
              `http://localhost:8080/showCompanies`,
              {
                headers: {
                  Authorization: `Bearer ${authToken}`,
                },
              }
            );
            setCompanies(response.data);
            
            const addressesResponse = await axios.get('http://localhost:8080/showCompanyAddresses', {
              headers: { Authorization: `Bearer ${authToken}` },
            });
            setAddresses(addressesResponse.data); 
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchAddresses();
      }, []);

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
        <h1 className="h1-regular mb-m">Adresy firm:</h1>
        <div className="address-info">
        {addresses.map((address, index) => {
            // const company = companies.find(c => c.id === address.companyId) || {};
            return (
          <div key={index} className="address-display--element" style={{ marginBottom: "1rem", borderColor: "#c7c7c7" }}>
            <p>Nazwa firmy: {address.company.companyName}</p>
            <p className="ulica">Ulica: {(address.street && address.houseNumber) ? `${address.street} ${address.houseNumber}` : "Ulica"}</p>
            <p className="k-pocztowy">Kod pocztowy: {address.postalCode}</p>
            <p className="miasto">Miasto: {address.city}</p>
            <button className="button-27-e " onClick={() => {setIsOpen(true); handleOpenModal('edit'); setEditAddressIndex(index); onEdit(address.addressId)}}>
            Zaktualizuj adres
            </button>
            <button className={`button-27-d ml-s`}
             onClick={() => handleDelete(address.addressId)}
            >Usuń adres
            </button>
          </div>
        );
      })}
  <AdminAdressesModal open={isOpen && modalMode === 'edit'} onClose={() => {handleCloseModal(); setEditAddressIndex(null); }}>
      {editAddressIndex !== null && (
        <form onSubmit={handleSubmit} className="form1">
          <div className="form-group">
            <label>Położenie firmy:</label>
            <input
            type="text"
            value="Firma"
            name="housingType"
            id="housingType"
            readOnly
            />
      </div>
      <div className="form-group">
        <label>Nazwa ulicy:</label>
        <input
          type="text"
          name="street"
          defaultValue={addresses[editAddressIndex]?.street}
          onChange={(e) => setStreet(e.target.value)} required 
        />
      </div>
      <div className="form-group">
        <label>Numer ulicy</label>
        <input
          type="text"
          name="houseNumber"
          defaultValue={addresses[editAddressIndex]?.houseNumber}
          onChange={(e) => setHouseNumber(e.target.value)} required 
        />
      </div>
      <div className="form-group">
        <label>Kod pocztowy:</label>
        <input
        type="text"
        name="postalCode"
        pattern="\d{2}-\d{3}"
        maxLength="6"
        placeholder="00-000"
        defaultValue={addresses[editAddressIndex]?.postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
        required
        />
      </div>
      <div className="form-group">
        <label>Miasto:</label>
        <input
        type="text"
        name="city"
        defaultValue={addresses[editAddressIndex]?.city}
        onChange={(e) => setCity(e.target.value)}
        required
        />
      </div>
    </form>
  )}
  </AdminAdressesModal>
      </div>
    </div>
  </div>
  );
};
 
