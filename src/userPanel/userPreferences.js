import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext"; 
import axios from "axios";
import "../profilePages.css";
import Modal from "react-modal";
import PanelModal from "./panelModal";

const UserPreferences = () => {
  const { userData, fetchUserData } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [preferences, setPreferences] = useState({
    weight: "",
    height: "",
    age: "",
    gender: "",
    bmi: "",
    selected_goal: "",
  });

  

  //przerobic na endpoint z preferencjami
  // useEffect(() => {
  //   const fetchAddresses = async () => {
  //     try {
  //       const getCookieValue = (name) =>
  //         document.cookie
  //           .split("; ")
  //           .find((row) => row.startsWith(name + "="))
  //           ?.split("=")[1];
  //       const authToken = getCookieValue("authToken");
  //       console.log(authToken);

  //       // const login = decodedToken.sub;

  //       const response = await axios.get(
  //         `http://localhost:8080/showCustomerAddresses?login=${}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${authToken}`,
  //           },
  //         }
  //       );

  //       setPreferences(response.data);
  //     } catch (error) {
  //       console.error("Error fetching addresses:", error);
  //     }
  //   };

  

  //   fetchAddresses();
  // }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const getCookieValue = (name) =>
        document.cookie
          .split("; ")
          .find((row) => row.startsWith(name + "="))
          ?.split("=")[1];
      const authToken = getCookieValue("authToken");

      await axios.post("http://localhost:8080/editPreference", preferences, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setIsOpen(false);
      fetchUserData(); 
    } catch (error) {
      console.error("Error updating preferences:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="user-data-display ml-s mt-s">
        <h1 className="h1-regular mb-m">Preferencje</h1>
        <div className="preferences-info">
          <p className="preference-item">Waga: {preferences.weight || "Brak danych"}</p>
          <p className="preference-item">Wzrost: {preferences.height || "Brak danych"}</p>
          <p className="preference-item">Wiek: {preferences.age || "Brak danych"}</p>
          <p className="preference-item">Płeć: {preferences.gender || "Brak danych"}</p>
          <p className="preference-item">BMI: {preferences.bmi || "Brak danych"}</p>
          <p className="preference-item">Wybrany cel: {preferences.selected_goal || "Brak danych"}</p>
          <button className="button-27-e" onClick={() => setIsOpen(true)}>Edytuj preferencje</button>
        </div>
        <PanelModal open={isOpen} onClose={() => setIsOpen(false)}>
          <form onSubmit={handleSubmit} className="form1">
            <label>
              Waga:
              <input type="text" name="weight" value={preferences.weight} onChange={handleChange} />
            </label>
            <label>
              Wzrost:
              <input type="text" name="height" value={preferences.height} onChange={handleChange} />
            </label>
            <label>
              Wiek:
              <input type="text" name="age" value={preferences.age} onChange={handleChange} />
            </label>
            <label>
              Płeć:
              <select name="gender" value={preferences.gender} onChange={handleChange}>
                <option value="">Wybierz</option>
                <option value="male">Mężczyzna</option>
                <option value="female">Kobieta</option>
              </select>
            </label>
            <label>
              BMI:
              <input type="text" name="bmi" value={preferences.bmi} onChange={handleChange} />
            </label>
            <label>
              Wybrany cel:
              <select name="selected_goal" value={preferences.selected_goal} onChange={handleChange}>
                <option value="">Wybierz</option>
                <option value="lose">lose</option>
                <option value="maintain">maintain</option>
                <option value="gain">gain</option>
              </select>
            </label>
            
          </form>
        </PanelModal>
      </div>
    </div>
  );
};

export default UserPreferences;
