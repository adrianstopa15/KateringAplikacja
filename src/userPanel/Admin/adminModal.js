import ReactDom from "react-dom";
import { useAuth } from '../../AuthContext';
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();


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

export default function AdminModal({ open, children, onClose }) {

  const { modalMode, handleSubmit, handleEdit } = useAuth();
  const [formMode, setFormMode] = useState(null);
  
  const { 
      firstName, setFirstName,
      lastName, setLastName,
      phone, setPhone,
    } = useAuth();
    
    const handleSave = async () => {
        await handleEdit();
        onClose();
        window.location.reload();
      }
      
      
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <form onSubmit={handleSave} className="form1">
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
          <div className="flex-c mt-sm">
            <button className="button-27-save" type="submit">
              Zapisz dane
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