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
  const [housing_type, setHousing_type] = useState("dom");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [apartment_number, setApartment_number] = useState("");
  const [floor, setFloor] = useState("");
  const [postal_code, setPostal_code] = useState("");
  const [city, setCity] = useState("");
  const [currentEdit, setCurrentEdit] = useState();
  const [editAddressIndex, setEditAddressIndex] = useState(null);
  const [house_number, setHouse_number] = useState();
  const [newAddress, setNewAddress] = useState({
    street: '',
    apartment_number: '',
    floor: '',
    postal_code: '',
    city: '',
    housing_type: '',
    house_number: '',
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
      apartment_number,
      floor,
      postal_code,
      city,
      housing_type,
      house_number
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
     
      housing_type, setHousing_type,
      first_name, setFirst_name,
      last_name, setLast_name,
      phone, setPhone,
      street, setStreet,
      apartment_number, setApartment_number,
      floor, setFloor,
      postal_code, setPostal_code,
      city, setCity,
      currentEdit, setCurrentEdit,
      handleEdit, onEdit,
      editAddressIndex, setEditAddressIndex,
      handleDelete, house_number, setHouse_number
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};
