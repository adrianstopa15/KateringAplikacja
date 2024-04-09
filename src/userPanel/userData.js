import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import axios from "axios";
import "../profilePages.css";
import Modal from "react-modal";

const UserData = () => {
  const { userData, fetchUserData } = useAuth();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    closeModal();
  };

  return (
    <div>
      <div className="user-data-display ml-s mt-s">
        <h1 className="h1-regular mb-m">Adresy</h1>
        <div className="address-info">
          <p>
            {userData.street || "Ulica"} {userData.apartmentNumber || "Numer"}
          </p>
          <p>{userData.postalCode || "Kod pocztowy"}</p>
          <p>{userData.city || "Miasto"}</p>
          <button className="button-27-s" onClick={openModal}>
            Zaktualizuj adres
          </button>
        </div>
      </div>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <form onSubmit={handleSubmit} className="form1">
          <label>
            Nazwa ulicy i numer:
            <input type="text" defaultValue={userData.street} />
          </label>
          <label>
            Kod pocztowy:
            <input type="text" defaultValue={userData.postalCode} />
          </label>
          <label>
            Miasto:
            <input type="text" defaultValue={userData.city} />
          </label>
        </form>
        <button className="button-27-s" type="submit">
          Zapisz
        </button>
        <button className="button-27-s ml-s" onClick={closeModal}>
          Anuluj
        </button>
      </Modal>
    </div>
  );
};

export default UserData;
