import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import axios from "axios";
import "../profilePages.css";
import Modal from "react-modal";
import { jwtDecode } from "jwt-decode";
import PanelModal from "./panelModal";
const UserData = () => {
  const { userData, fetchUserData } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const ulica =
    addresses.map((address) => address.street).join(", ") || "Narutowicza 14";
  const kodPocztowy =
    addresses.map((address) => address.postal_code).join(", ") || "20-248";
  const Miasto =
    addresses.map((address) => address.city).join(", ") || "Lublin";

  return (
    <div>
      <div className="user-da   ta-display ml-s mt-s">
        <h1 className="h1-regular mb-m">Adresy</h1>
        <div className="address-info">
          <div className="">
            <p className="ulica">{ulica ?? "Ulica"}</p>
            <p className="k-pocztowy">{kodPocztowy}</p>
            <p className="miasto">{Miasto || "Lublin"}</p>
          </div>
          <button className="button-27-e " onClick={() => setIsOpen(true)}>
            Zaktualizuj adres
          </button>
          <button className="button-27-d ml-s">Usuń adres</button>
          <PanelModal open={isOpen} onClose={() => setIsOpen(false)}>
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
          </PanelModal>
        </div>
      </div>
    </div>
  );
};

export default UserData;
