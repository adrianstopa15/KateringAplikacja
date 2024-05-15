import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";

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
  const [houseNumber, setHouseNumber] = useState();
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


  const handleEdit = async () => {

    const formData = {
      street,
      apartmentNumber,
      floor,
      postalCode,
      city,
      housingType,
      houseNumber
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
      editAddressIndex, setEditAddressIndex,
      handleDelete, houseNumber, setHouseNumber,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};
