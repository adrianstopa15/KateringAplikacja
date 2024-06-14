import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import axios from "axios";
import "../profilePages.css";
import { jwtDecode } from "jwt-decode";
import PanelModal from "./panelModal";
import PanelModalAdd from "./panelModalAdd";
import { useAlertModal } from "../modalbutton/AlertModalContext";

const UserData = () => {
  const { userData, fetchUserData, handleSetDefaultAddress } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState("UserData");
  const [modalMode, setModalMode] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const { showAlertModal } = useAlertModal();
 const {
    housingType, setHousingType,
      firstName, setFirstName,
      lastName, setLastName,
      phone, setPhone,
      street, setStreet,
      apartmentNumber, setApartmentNumber,
      floor, setFloor,
      postalCode, setPostalCode,
      city, setCity, addressId,
      currentEdit, setCurrentEdit, handleEdit, onEdit,
      editAddressIndex, setEditAddressIndex, handleDelete, houseNumber, setHouseNumber} = useAuth(); 
 
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const getCookieValue = (name) => {
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) return parts.pop().split(';').shift();
          return null;
        };
        const authToken = getCookieValue("authToken");
        const decodedToken = jwtDecode(authToken);
        const userRole = decodedToken.role;

        // if (userRole !== 'ADMIN') {
        //   console.log("Access denied: insufficient permissions");
        //   return;
        // }
 
        const login = decodedToken.sub;

        const response = await axios.get(
          `http://localhost:8080/showCustomerAddresses?login=${login}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        const sortedAddresses = response.data.sort((a,b) => b.default - a.default);
        setAddresses(response.data);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };
 
    fetchAddresses();
  }, []);
 
  const handleOpenModal = (mode) => {
    setModalMode(mode);
    setIsOpen(true);
  };
 
  const handleCloseModal = () => {
    setIsOpen(false);
    setModalMode(null);
    setEditAddressIndex(null);
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
 
    useEffect(() => {
      if (addresses.length > 0 && editAddressIndex != null) {
        const address = addresses[editAddressIndex];
        setStreet(address.street);
        setApartmentNumber(address.apartmentNumber);
        setPostalCode(address.postalCode);
        setCity(address.city);
        setHouseNumber(address.houseNumber);
      }
    }, [addresses, editAddressIndex]);
   
  return (
    <div>
      <div className="user-da   ta-display ml-s mt-s">
        <h1 className="h1-regular mb-m">Moje Adresy:</h1>
        <div className="address-info">
          {addresses.slice()
          .sort((a,b) => b.default - a.default)
          .map((address, index) => (
            <div key={index} className="address-display--element " style={{marginBottom:"1rem" ,  borderColor: address.default ? "green" : "#c7c7c7"}}>            
            <p className="ulica">Ulica: {(address.street && address.houseNumber) ? `${address.street} ${address.houseNumber}` : "Ulica"}</p>
            <p className="k-pocztowy">Kod pocztowy: {address.postalCode}</p>
            <p className="miasto">Miasto: {address.city || "Lublin"}</p>
            <button className="button-27-e " onClick={() => {setIsOpen(true); handleOpenModal('edit'); setEditAddressIndex(index); onEdit(address.addressId)}}>
              Zaktualizuj adres
            </button>
            <button className={`button-27-d ml-s ${address.default ? "button-disabled" : ""}`}
             onClick={() => handleDelete(address.addressId)}
             disabled={address.default}
            >Usuń adres
            </button>
              {address.default === false && (
                <button className="button-27-c" onClick={() => handleSetDefaultAddress(address.addressId)}>
                  Ustaw jako domyślny
                </button>
              )}
          </div>
    ))}
  <PanelModal open={isOpen && modalMode === 'edit'} onClose={() => {handleCloseModal(); setEditAddressIndex(null); }}>
      {editAddressIndex !== null && (
        <form onSubmit={handleSubmit} className="form1">
          <div className="form-group">
            <label>Mieszkam w:</label>
            <select
            value={housingType}
            onChange={(e) => setHousingType(e.target.value)}
            name="housingType"
            id="housingType"
            >
          <option value="dom">Domu</option>
          <option value="mieszkanie">Mieszkaniu</option>
        </select>
      </div>
      <div className="form-group">
        <label>Nazwa ulicy:</label>
        <input
          type="text"
          name="street"
          defaultValue={addresses[editAddressIndex].street}
          onChange={(e) => setStreet(e.target.value)} required 
        />
      </div>
      <div className="form-group">
        <label>Numer ulicy/domu:</label>
        <input
          type="text"
          name="houseNumber"
          defaultValue={addresses[editAddressIndex].houseNumber}
          onChange={(e) => setHouseNumber(e.target.value)} required 
        />
      </div>
      <div className="form-group">
        <label>Kod pocztowy:</label>
        <input
          type="text"
          name="postalCode"
          pattern="\d{2}-\d{3}" maxLength="6" placeholder="00-000"
          defaultValue={addresses[editAddressIndex].postalCode}
          onChange={(e) => setPostalCode(e.target.value)} required 
        />
      </div>
      <div className="form-group">
        <label>Miasto:</label>
        <input
          type="text"
          name="city"
          defaultValue={addresses[editAddressIndex].city}
          onChange={(e) => setCity(e.target.value)} required 
        />
      </div>
      {housingType === "mieszkanie" && (
        <>
          <div className="form-group">
            <label>Numer mieszkania:</label>
            <input
              type="text"
              name="apartmentNumber"
              value={apartmentNumber}
              id="apartmentNumber"
              onChange={(e) => setApartmentNumber(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Piętro:</label>
            <input
              type="text"
              name="floor"
              value={floor}
              id="floor"
              onChange={(e) => setFloor(e.target.value)} required 
            />
          </div>
        </>
      )}
    </form>
  )}
  </PanelModal>
      <button className="button-27-save ml-s" onClick={() => {setIsOpen(true); handleOpenModal('add')}}>Dodaj adres</button>
      <PanelModalAdd open={isOpen && modalMode === 'add'} onClose={handleCloseModal} />
      </div>
    </div>
  </div>
  );
};
 
export default UserData;