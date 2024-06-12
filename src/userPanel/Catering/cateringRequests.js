import React, { useState, useEffect } from 'react';
import Modal from '../../modalbutton/ModalGlobal'; 
import ModalGlobal from '../../modalbutton/ModalGlobal';
import { useAuth } from '../../AuthContext';
import axios from "axios";
import { jwtDecode } from "jwt-decode";




export default function CateringRequests() {
  const [isModalOpen, setModalOpen] = useState(false);
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
    editAddressIndex, setEditAddressIndex, dietName, setDietName, dietDescription, setDietDescription, dietTypeReq, setDietTypeReq} = useAuth();



      const applyDiet = async (x) => {
        x.preventDefault(); 

        const getCookieValue = (name) => {
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) return parts.pop().split(';').shift();
          return null;
        };
        const authToken = getCookieValue("authToken");
        const decodedToken = jwtDecode(authToken);
        const login = decodedToken.sub;

        const formData = {
        dietName,
        dietDescription,
        };
  
        try {
          const apply = await axios.post(`http://localhost:8080/addDiet?login=${login}&dietTypeName=${dietTypeReq}`
          ,formData,{
            headers: { Authorization: `Bearer ${authToken}` },
          });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      
    return (
    <div>
      <div className="ml-s mt-s">
        <h1 className="h1-regular mb-m">Requesty</h1>
        <div className="catering-display--element" style={{marginBottom: "1rem"}}>
          Brak oczekujących wniosków.
        </div>
        <button className="button-27-e" onClick={() => setModalOpen(true)}>utwórz wniosek</button>
      </div>
      <ModalGlobal isOpen={isModalOpen}>
        <div className='flex-modal'>
          <h2 style={{marginBottom:"25px"}}>Tworzenie nowego wniosku</h2>
          <form onSubmit={applyDiet} className='form-modal'>
            <label>Nazwa diety: <input type="text"
                    value={dietName}
                    name="dietName"
                    id="dietName"
                    onChange={(e) => setDietName(e.target.value)}
            /></label>
            <label>Opis: <textarea 
            value={dietDescription}
            name="dietDescription"
            id="dietDescription"
            onChange={(e) => setDietDescription(e.target.value)}
            /></label>
            Typ diety:
            <select
               value={dietTypeReq}
               name="dietTypeReq"
               id="dietTypeReq"
               onChange={(e) => setDietTypeReq(e.target.value)}
            >
              <option>studencka</option>
              <option>ketogeniczna</option>
              {/* <option>typ diety 3</option>
              <option>typ diety 4</option>
              <option>typ diety 5</option> */}
            </select>
            <div className='buttons-container' style={{marginTop:"10px"}}>
              <button type="submit" className="button-27-save" style={{marginRight:"15px"}}>Wyślij</button>
              <button type="button" onClick={() => setModalOpen(false)} className="button-27-e">Anuluj</button>
            </div>
          </form>
         
        </div>
      </ModalGlobal>
    </div>
  );
}
