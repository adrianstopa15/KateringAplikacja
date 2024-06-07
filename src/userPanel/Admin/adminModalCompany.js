import React, { useEffect, useState } from "react";
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

export default function AdminModalCompany({ open, currentCompany, children, onSave, onClose }) {
    const [editedCompany, setEditedCompany] = useState(currentCompany || {});
    const [companies, setCompanies] = useState([]);
    const [setCurrentCompany] = useState({});
    const [editCompanyIndex, setEditCompanyIndex] = useState(null);

    useEffect(() => {
        if (currentCompany) {
          console.log("Modal initialized with company:", currentCompany);
          setEditedCompany(currentCompany);
        }
      }, [currentCompany]);

      const handleEditCompany = (index) => {
        setCurrentCompany(companies[index]);
        setEditCompanyIndex(index);
        console.log("Selected company for editing:", companies[index]);  
      }

    const handleSave = async (e) => {
        e.preventDefault();
        const getCookieValue = (name) => {
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) return parts.pop().split(';').shift();
          return null;
        };
        const authToken = getCookieValue("authToken");
    
        try {
            const response = await axios.post(`http://localhost:8080/editCompany?id=${editCompanyIndex}`, editedCompany, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
    
          if (response.status === 200) {
            console.log('Company update successful', response.data);
            alert("Firma została zaktualizowana.");
            window.location.reload();
          } else {
            console.error('Unexpected server response when updating company:', response);
            alert("Nie udało się zaktualizować firmy. Status: " + response.status);
          }
        } catch (error) {
          console.error("Error updating company:", error);
          alert("Nie udało się zaktualizować firmy: " + error.message);
        }
    };

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
