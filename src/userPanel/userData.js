import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import axios from "axios";
import "../profilePages.css";
import Modal from "react-modal";
import { jwtDecode } from "jwt-decode";

const UserData = () => {
  const { userData, fetchUserData } = useAuth();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState("UserData");
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const getCookieValue = (name) =>
          document.cookie
            .split("; ")
            .find((row) => row.startsWith(name + "="))
            ?.split("=")[1];
        const authToken = getCookieValue("authToken");
        const decodedToken = jwtDecode(authToken);
        console.log(authToken);

        const login = decodedToken.sub;

        const response = await axios.get(
          `http://localhost:8080/showCustomerAddresses?login=${login}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        setAddresses(response.data);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, []);

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

  const ulica = addresses.map((address) => address.street);
  const kodPocztowy = addresses.map((address) => address.postal_code);
  const Miasto = addresses.map((address) => address.city);

  return (
    <div>
      <div className="user-da   ta-display ml-s mt-s">
        <h1 className="h1-regular mb-m">Adresy</h1>
        <div className="address-info">
          <p>{ulica || "Ulica"}</p>
          <p>{kodPocztowy || "Kod pocztowy"}</p>
          <p>{Miasto || "Miasto"}</p>
          <button className="button-27-s" onClick={openModal}>
            Zaktualizuj adres
          </button>
        </div>
      </div>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <form onSubmit={handleSubmit} className="form1">
          <label>
            Nazwa ulicy i numer:
            <input type="text" defaultValue={ulica} />
          </label>
          <label>
            Kod pocztowy:
            <input type="text" defaultValue={kodPocztowy} />
          </label>
          <label>
            Miasto:
            <input type="text" defaultValue={Miasto} />
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
