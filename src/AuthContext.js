import React, { createContext, useContext, useState} from "react";
import axios from "axios";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { BorderAll, Style } from "@mui/icons-material";
import UserStats from "./userPanel/userStats";


const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [housingType, setHousingType] = useState("dom");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [apartmentNumber, setApartmentNumber] = useState("");
  const [floor, setFloor] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [currentEdit, setCurrentEdit] = useState();
  const [editAddressIndex, setEditAddressIndex] = useState(null);
  const [editCustomerIndex, setCustomerIndex] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [houseNumber, setHouseNumber] = useState();
  const [companyName, setCompanyName] = useState("");
  const [company_id] = useState("");
  const [email, setEmail] = useState('');
  const [dietType, setDietType] = useState('');
  const [comments, setComments] = useState('');
  const [description, setDescription] = useState('');
  const [nip, setNip] = useState("");
  const [popupType, setPopupType] = useState("none");
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState(null);
  const [login, setLogin] = useState("");
  const [companyStatus, setCompanyStatus] = useState("");
  const [dietName, setDietName] = useState("");
  const [dietDescription, setDietDescription] = useState("");
  const [dietTypeReq, setDietTypeReq] = useState("");
  
  const [newAddress, setNewAddress] = useState({
    street: '',
    apartmentNumber: '',
    floor: '',
    postalCode: '',
    city: '',
    housingType: '',
    houseNumber: '',
  });

  const handleLogin = (success) => {
    setIsLoggedIn(true);
    fetchUserData();
  };

  const handleEditCompany = (index) => {
    setEditCompanyIndex(index);
  };

  const togglePopup = (type) => setPopupType(type === popupType ? "none" : type);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/user/info", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data);
    } catch (error) {
      console.error("Nie udało się pobrać danych użytkownika", error);
    }
  };

  const onEdit = (x) => {
    setCurrentEdit(x);
   };

   const handleCloseModal = () => {
    setIsOpen(false);
    setModalMode(null);
    setEditAddressIndex(null);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const addressData = {
      city,
      street,
      houseNumber,
      postalCode,
      apartmentNumber,
      floor,
      housingType,
    };

    try {
      const getCookieValue = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null; 
      };
      const authToken = getCookieValue("authToken");
      const decodedToken = jwtDecode(authToken);
      const login = decodedToken.sub;
      
      if (!authToken) {
        console.error("JWT token is missing");
        return;
      }

      const response = await axios.post(
        `http://localhost:8080/addAddress?login=${login}`,
        addressData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`
          },
        }
      );
      setAddresses(prevAddresses => [...prevAddresses, response.data]);
      handleCloseModal();
      window.location.reload();
    } catch (error) {
      console.error('Error adding address:', error.response?.data || error.message);
    }
  };


  
  



  const handleEdit = async (e) => {
  
    const formData = {
      street,
      apartmentNumber,
      floor,
      postalCode,
      city,
      housingType,
      houseNumber,
    };

    const getCookieValue = (name) =>
    document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="))
      ?.split("=")[1];
  const authToken = getCookieValue("authToken");
  console.log(currentEdit); 


  const response = await axios.post(
    `http://localhost:8080/editAddress?id=${currentEdit}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
  }
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm("Czy na pewno chcesz usunąć adres?");
    if(!confirmDelete){
      return;
    }

    const getCookieValue = (name) =>
    document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="))
      ?.split("=")[1];
  const authToken = getCookieValue("authToken");
  try {
    await axios.post(`http://localhost:8080/deleteAddress?id=${id}`, {}, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    console.log("Adres został usunięty.");
    window.location.reload();
  } catch (error) {
    console.error("Błąd przy usuwaniu adresu:", error);
  }}


  const handleSetDefaultAddress = async (addressId) => {
    const getCookieValue = (name) =>
      document.cookie
        .split("; ")
        .find((row) => row.startsWith(name + "="))
        ?.split("=")[1];
    const authToken = getCookieValue("authToken");
    const decodedToken = jwtDecode(authToken);
    const login = decodedToken.sub;

    try {
      await axios.post(
        `http://localhost:8080/setDefaultAddress?id=${addressId}&login=${login}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      fetchUserData();
      window.location.reload();
      const addressElements = document.querySelectorAll('.address-display--element');
      addressElements.style.borderColor = 'green';
    } catch (error) {
      console.error("Błąd przy ustawianiu domyślnego adresu:", error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    document.cookie =
      "authToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    setUserData({});
    window.location.reload();
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserData();
    }
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider
    value={{
      isLoggedIn, userData, handleLogin, handleLogout,
      housingType, setHousingType,
      firstName, setFirstName,
      lastName, setLastName,
      phone, setPhone,
      street, setStreet,
      apartmentNumber, setApartmentNumber,
      floor, setFloor,
      postalCode, setPostalCode,
      city, setCity,
      currentEdit, setCurrentEdit,
      handleEdit, onEdit, 
      isOpen, setIsOpen,
      handleSubmit, handleSetDefaultAddress,
      modalMode, setModalMode, 
      login, setLogin,
      editAddressIndex, setEditAddressIndex,
      handleDelete, houseNumber, setHouseNumber,
      companyName, setCompanyName,email, setEmail,
      dietType, setDietType, description, setDescription, nip, setNip, togglePopup, popupType, setPopupType, companyStatus, setCompanyStatus,
      dietName, setDietName, dietDescription, setDietDescription, dietTypeReq, setDietTypeReq
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};
