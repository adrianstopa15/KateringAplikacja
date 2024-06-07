import React, { useState } from 'react';
import Modal from '../../modalbutton/ModalGlobal'; 
import ModalGlobal from '../../modalbutton/ModalGlobal';
import { useAuth } from '../../AuthContext';


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
          <form className='form-modal'>
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
              <option>typ diety 1</option>
              <option>typ diety 2</option>
              <option>typ diety 3</option>
              <option>typ diety 4</option>
              <option>typ diety 5</option>
            </select>
            <div className='buttons-container' style={{marginTop:"10px"}}>
              <button type="submit" onClick={() => setModalOpen(false)} className="button-27-save" style={{marginRight:"15px"}}>Wyślij</button>
              <button type="button" onClick={() => setModalOpen(false)} className="button-27-e">Anuluj</button>
            </div>
          </form>
         
        </div>
      </ModalGlobal>
    </div>
  );
}
