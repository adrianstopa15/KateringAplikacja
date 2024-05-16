import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import { useAuth } from "../AuthContext";


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

export default function PanelModalAdd({ open, children, onClose }) {
  const { modalMode, handleSubmit, handleEdit } = useAuth();
  const [formMode, setFormMode] = useState(null);
  
  
  const { 
    housingType, setHousingType,
      firstName, setFirstName,
      lastName, setLastName,
      phone, setPhone,
      street, setStreet,
      apartmentNumber, setApartmentNumber,
      floor, setFloor,
      postalCode, setPostalCode,
      city, setCity,
      setModalMode, setHouseNumber,
    currentEdit, setCurrentEdit, onEdit,
    editAddressIndex, setEditAddressIndex} = useAuth();
    
    const handleSubmitAdd = async (e) => {
        e.preventDefault();
        await handleSubmit(e);
        onClose();
      };
      
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <form onSubmit={handleSubmitAdd} className="form1">
          <div className="form-group">
            <label>Mieszkam w:</label>
            <select value={housingType} onChange={(e) => setHousingType(e.target.value)} name="housingType">
              <option value="dom">Domu</option>
              <option value="mieszkanie">Mieszkaniu</option>
            </select>
          </div>
          <div className="form-group">
            <label>Nazwa ulicy</label>
            <input type="text" name="street" onChange={(e) => setStreet(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Numer:</label>
            <input type="text" name="houseNumber" onChange={(e) => setHouseNumber(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Kod pocztowy:</label>
            <input type="text" name="postalCode" onChange={(e) => setPostalCode(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Miasto:</label>
            <input type="text" name="city" onChange={(e) => setCity(e.target.value)} />
          </div>
          {housingType === "mieszkanie" && (
            <>
              <div className="form-group">
                <label>Numer mieszkania:</label>
                <input type="text" name="apartmentNumber" onChange={(e) => setApartmentNumber(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Piętro:</label>
                <input type="text" name="floor" onChange={(e) => setFloor(e.target.value)} />
              </div>
            </>
          )}
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