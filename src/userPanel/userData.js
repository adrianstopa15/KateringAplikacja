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
  const { 
    housing_type, setHousing_type,
      first_name, setFirst_name,
      last_name, setLast_name,
      phone, setPhone,
      street, setStreet,
      apartment_number, setApartment_number,
      floor, setFloor,
      postal_code, setPostal_code,
      city, setCity,
    currentEdit, setCurrentEdit, handleEdit, onEdit,
    editAddressIndex, setEditAddressIndex, handleDelete} = useAuth();
    const [modalMode, setModalMode] = useState(null);
  // const [housingType, setHousingType] = useState("dom");
  // const [apartmentNumber, setApartmentNumber] = useState("");
  // const [floor, setFloor] = useState("");
  // const [postalCode, setPostalCode] = useState("");
  // const [editAddressIndex, setEditAddressIndex] = useState(null);
  // const [currentEdit, setCurrentEdit] = useState();



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

  // const handleEdit = async () => {

  //   const formData = {
  //     street,
  //     apartment_number: +apartment_number, 
  //     floor: +floor, 
  //     postal_code,
  //     city,
  //     housing_type,
  //   };


  //   const getCookieValue = (name) =>
  //   document.cookie
  //     .split("; ")
  //     .find((row) => row.startsWith(name + "="))
  //     ?.split("=")[1];
  // const authToken = getCookieValue("authToken");


  // const response = await axios.post(
  //   `http://localhost:8080/editAddress?id=${currentEdit}`,
  //   formData,
    
  //   {
  //     headers: {
  //       Authorization: `Bearer ${authToken}`,
  //     },
  //   }
  // );
  // }

  // const onEdit = (x) => {
  //  setCurrentEdit(x);
  // };


  const ulica =
    addresses.map((address) => `${address.street}`).join(", ") || "Narutowicza 14";
  const kodPocztowy =
    addresses.map((address) => address.postal_code).join(", ") || "20-248";
  const Miasto =
    addresses.map((address) => address.city).join(", ") || "Lublin";

    useEffect(() => {
      if (addresses.length > 0 && editAddressIndex != null) {
        const address = addresses[editAddressIndex];
        setStreet(address.street);
        setApartment_number(address.apartment_number);
        setPostal_code(address.postal_code);
        setCity(address.city);
        
      }
    }, [addresses, editAddressIndex]);


  return (
    <div>
      <div className="user-da   ta-display ml-s mt-s">
        <h1 className="h1-regular mb-m">Adresy</h1>
        <div className="address-info">
       
          
          {/* <div className="">
            <p className="ulica">{ulica ?? "Ulica"}</p>
            <p className="k-pocztowy">{kodPocztowy}</p>
            <p className="miasto">{Miasto || "Lublin"}</p>
          </div>
          <button className="button-27-e " onClick={() => setIsOpen(true)}>
            Zaktualizuj adres
          </button>
          <button className="button-27-d ml-s">Usuń adres</button> */}
          {addresses.map((address, index) => (
          
            <div key={index} className="address-display--element" style={{marginBottom:"1rem"}}>
            
              
            <p className="ulica">{address.street || "Ulica"}</p>
            <p className="k-pocztowy">{address.postal_code}</p>
            <p className="miasto">{address.city || "Lublin"}</p>
           
            <button className="button-27-e " onClick={() => {setIsOpen(true); setEditAddressIndex(index); onEdit(address.address_id)}}>
              Zaktualizuj adres
            </button>
            <button className="button-27-d ml-s"
             onClick={() => handleDelete(address.address_id)}
            >Usuń adres</button>
          </div>
        
        ))}
          <PanelModal open={isOpen} onClose={() => {setIsOpen(false); setEditAddressIndex(null);}}>
            {editAddressIndex !== null && (
            <form onSubmit={handleSubmit} className="form1">
              <label>
                Mieszkam w:
              <select
                  value={housing_type}
                  onChange={(e) => setHousing_type(e.target.value)}
                  name="housing_type"
                  id="housing_type"
                >
                  <option value="dom">Domu</option>
                  <option value="mieszkanie">Mieszkaniu</option>
                </select><br/>
                Nazwa ulicy i numer:
                <input
        type="text"
        name="street"
        defaultValue={addresses[editAddressIndex].street}
        onChange={(e) => setStreet(e.target.value)}
      />
              </label>
              <label>
                Kod pocztowy:
                <input
        type="text"
        name="postal_code"
        defaultValue={addresses[editAddressIndex].postal_code}
        onChange={(e) => setPostal_code(e.target.value)}
      />
              </label>
              <label>
                Miasto:
                <input type="text" name="city" defaultValue={addresses[editAddressIndex].city} onChange={(e) => setCity(e.target.value)} />
                </label>
                {housing_type === "mieszkanie" && (
                <>
                  
                  <label>Numer mieszkania: 
                    <input
                      type="text"
                      name="apartment_number"
                      value={apartment_number}
                      id="apartment_number"
                      onChange={(e) => setApartment_number(e.target.value)}
                      required
                      />
                      </label>
                   
                 

                  <label>
                    Piętro:
                    <input
                      type="text"
                      name="floor"
                      value={floor}
                      id="floor"
                      onChange={(e) => setFloor(e.target.value)}
                    />
                  </label>
                </>
              
              )}
              
            </form>
            )}
          </PanelModal>
          <button className="button-27-save ml-s">dodaj adres</button>
        </div>
      </div>
    </div>
  );
};

export default UserData;
