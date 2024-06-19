import React, { useState } from "react";
import ReactDom from "react-dom";
import { useAuth } from "../../AuthContext";
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

export default function CateringMealModal({ open, children, onClose }) {
    const [formMode, setFormMode] = useState(null);

    const {
      description, setDescription,
      name, setName,
      carbs, setCarbs,
      fat, setFat,
      protein, setProtein,
      calories, setCalories,
      dietId, setDietId,  
      typeId, setTypeId
  } = useAuth();

    const handleSave = async (e) => {

      console.log("Diet ID:", dietId);  
      console.log("Type ID:", typeId); 

       const formData ={
        name,
        carbs,
        fat,
        protein,
        calories,
        description
      }

      try {
        const getCookieValue = (name) => {
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) return parts.pop().split(';').shift();
          return null;
        };
        const authToken = getCookieValue("authToken");

    
        const response = await axios.post(
          `http://localhost:8080/addMeal?dietId=${dietId}&typeId=${typeId}`, formData,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching Confirmations:", error);
      }
      console.log(formData);
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
