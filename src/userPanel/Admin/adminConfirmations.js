import { useAuth } from "../../AuthContext";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

export default function AdminConfirmations() {
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
    currentEdit, setCurrentEdit,  onEdit,
    editAddressIndex, setEditAddressIndex, handleDelete, houseNumber, setHouseNumber, companyName, setCompanyName, login, setLogin
    , description, setDescription, dietType, setDietType,email, setEmail, nip, setNip, companyStatus, setCompanyStatus} = useAuth();
    const [confirmations, setConfirmations] = useState([]);
  useEffect(() => {
    const fetchConfirmations = async () => {
      try {
        const getCookieValue = (name) => {
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) return parts.pop().split(';').shift();
          return null;
        };
        const authToken = getCookieValue("authToken");
    
 
       
 
        const response = await axios.get(
          `http://localhost:8080/showCompaniesToAccept`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
      
        setConfirmations(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching Confirmations:", error);
      }
    };
 
    fetchConfirmations();
  }, []);

  useEffect(() => {
    if (confirmations.length > 0 && editAddressIndex != null) {
      const confirmation = confirmations[editAddressIndex];
      setCompanyName(confirmation.companyName);
      setDescription(confirmation.description);
      setLogin(confirmation.login);
      setDietType(confirmation.dietType);
      setNip(confirmation.nip);
      setPhone(confirmation.phone);
      setCompanyStatus(confirmation.status);
    }
  }, [confirmations, editAddressIndex]);

  const handleEdit = async (x) => {
  
   
    const getCookieValue = (name) =>
    document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="))
      ?.split("=")[1];
  const authToken = getCookieValue("authToken");
  console.log(x); 


  const response = await axios.post(
    `http://localhost:8080/acceptCompany?id=${x}`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
  }




    return (
      <div>
        <div className="ml-s mt-s">
          <h1 className="h1-regular mb-m">Zatwierdzenia:</h1>
          <div className="address-info">
          {confirmations.map((confirmation, index) => (
            <div key={index}  className="address-display--element " style={{marginBottom:"1rem" ,  borderColor: "#c7c7c7"}}>            
            <p className="ulica">Nazwa Firmy: {  confirmation.companyName}</p>
            <p className="k-pocztowy">Opis: {confirmation.description}</p>
            <p className="miasto">Login: {confirmation.login }</p>
            <p className="miasto">Typ diety: {confirmation.dietType }</p>
            <p className="miasto">Nip: {confirmation.nip }</p>
            <p className="miasto">Numer Telefonu: {confirmation.phone }</p>
            <p className="miasto"> Status: {confirmation.status }</p>
            <button id={index}  className="button-27-save" onClick={() => {onEdit(confirmation.companyId); console.log(confirmation.companyId); handleEdit(confirmation.companyId)
            }}>akceptuj</button>
            {/* <button className="button-27-e " onClick={() => {setIsOpen(true); handleOpenModal('edit'); setEditconfirmationIndex(index); onEdit(confirmation.confirmationId)}}>
              Zaktualizuj adres
            </button> */}
          </div>
    ))}
            </div>
        </div>
      </div>
    );
  }
  