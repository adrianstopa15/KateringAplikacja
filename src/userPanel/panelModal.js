import React, { useState } from "react";
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

export default function PanelModal({ open, children, onClose }) {


  const { 
    housing_type, setHousing_type,
      first_name, setFirst_name,
      last_name, setLast_name,
      phone, setPhone,
      street, setStreet,
      apartment_number, setApartment_number,
      floor, setFloor,
      postal_code, setPostal_code,
      city, setCity,
    currentEdit, setCurrentEdit, handleEdit, onEdit,
    editAddressIndex, setEditAddressIndex} = useAuth();
    const [formMode, setFormMode] = useState(null);
   

    const handleSave = async () => {
      await handleEdit();
      onClose();
    }

  if (!open) return null;
  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        {children}
        <div className="flex-c mt-sm">
          <button onClick={handleSave} className="button-27-save" type="button">
            Zapisz
          </button>
          <button onClick={onClose} className="button-27-d ml-s">
            Anuluj
          </button>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}
