import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import { useAuth } from '../../AuthContext';
import axios from "axios";
import { jwtDecode } from "jwt-decode";


const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  padding: "50px",
  zIndex: 1000,
  width: "60%",
  maxWidth: "600px",
  borderRadius: "20px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0, .7",
  zIndex: 1000,
};

export default function AdminAdressesModalAdd({ open, children, onClose }) {
  const { modalMode, handleEdit } = useAuth();
  const [formMode, setFormMode] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  

  const { 
      companyName, companyId, housingType, setHousingType,
      street, setStreet, houseNumber,
      apartmentNumber, setApartmentNumber,
      floor, setFloor,
      postalCode, setPostalCode,
      city, setCity,
      setModalMode, setHouseNumber,
    currentEdit, setCurrentEdit, onEdit,
    editAddressIndex, setEditAddressIndex} = useAuth();

    const handleCloseModal = () => {
        setIsOpen(false);
        setModalMode(null);
        setEditAddressIndex(null);
      }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const addressData = {
          housingType: "firma",
          street,
          houseNumber,
          postalCode,
          floor,
          city,
        };
    
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
          
          if (!authToken) {
            console.error("JWT token is missing");
            return;
          }
    
          const response = await axios.post(
            `http://localhost:8080/addAddressCompany?login=${login}`,
            addressData,
            {
              headers: {
                Authorization: `Bearer ${authToken}`
              },
            }
          );
          setAddresses(prevAddresses => [...prevAddresses, response.data]);
          handleCloseModal();
          window.location.reload();
        } catch (error) {
          console.error('Error adding address:', error.response?.data || error.message);
        }
      };
      
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
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
            <input type="text" name="street" onChange={(e) => setStreet(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Numer ulicy:</label>
            <input type="text" name="houseNumber" onChange={(e) => setHouseNumber(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Kod pocztowy:</label>
            <input type="text" name="postalCode" onChange={(e) => setPostalCode(e.target.value)} required 
             pattern="\d{2}-\d{3}" maxLength="6" placeholder="00-000"
            />
          </div>
          <div className="form-group">
            <label>Miasto:</label>
            <input type="text" name="city" onChange={(e) => setCity(e.target.value)} required />
          </div>
          <div className="flex-c mt-sm">
            <button className="button-27-save" type="submit">
              Zapisz adres
            </button>
            <button onClick={onClose} className="button-27-d ml-s">
              Anuluj
            </button>
          </div>
        </form>
      </div>
    </>,
    document.getElementById("portal")
  );
}