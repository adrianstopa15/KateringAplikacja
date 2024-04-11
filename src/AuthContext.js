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
  const handleLogin = (success) => {
    setIsLoggedIn(true);
    fetchUserData();
  };

  //Pobieranie danych uzytkownika nie wiem czy dobrze czy do zmiany:
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
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};
