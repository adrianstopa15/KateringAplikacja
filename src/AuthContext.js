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
      value={{ isLoggedIn, userData, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
