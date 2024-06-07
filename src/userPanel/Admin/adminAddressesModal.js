import React, { useState } from "react";
import ReactDom from "react-dom";
import { useAuth } from '../../AuthContext';
import axios from "axios";


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

export default function AdminAdressesModal({ open, children, onClose }) {

  const { 
      street, setStreet,
      housingType, houseNumber,
      setHousingType,
      floor, setFloor,
      postalCode, setPostalCode,
      city, setCity,
    currentEdit, setCurrentEdit, onEdit,
    editAddressIndex, setEditAddressIndex} = useAuth();
    const [formMode, setFormMode] = useState(null);
   

    const handleSave = async () => {
      await handleEdit();
      onClose();
      window.location.reload();
    }

    const handleEdit = async (e) => {

        e?.preventDefault();  
  
        const formData = {
        housingType: "firma",
        street,
        houseNumber,
        floor,
        postalCode,
        city,
        };
    
        const getCookieValue = (name) =>
        document.cookie
          .split("; ")
          .find((row) => row.startsWith(name + "="))
          ?.split("=")[1];
      const authToken = getCookieValue("authToken");
      console.log(currentEdit); 
    
      try {
        const response = await axios.post(
          `http://localhost:8080/editAddress?id=${currentEdit}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        console.log("Update Response:", response);
        onClose();
        window.location.reload();
      } catch (error) {
        console.error("Failed to update address:", error);
      }
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
