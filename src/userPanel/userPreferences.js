import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext"; 
import axios from "axios";
import "../profilePages.css";
import { jwtDecode } from "jwt-decode";
import UserPreferencesModal from "./userPreferencesModal";

const UserPreferences = () => {
  const { userDataCurrent, fetchUserData } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState(null);
  const [preferences, setPreferences] = useState([]);

  
  useEffect(() => {
    const fetchPreferences = async () => {
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
          `http://localhost:8080/showCustomerPreferences?login=${login}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        setPreferences(response.data);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };
    fetchPreferences();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
          <p className="preference-item">Wybrany cel: {preferences.selectedGoal || "Brak danych"}</p>
          <button className="button-27-e" onClick={() => setIsOpen(true)}>Edytuj preferencje</button>
        </div>
        <UserPreferencesModal open={isOpen} onClose={() => setIsOpen(false)}>
  <form onSubmit={handleSubmit} className="form1">
    <div className="form-group">
      <label>Waga:</label>
      <input
        type="text"
        name="weight"
        value={preferences.weight}
        onChange={handleChange}
      />
    </div>
    <div className="form-group">
      <label>Wzrost:</label>
      <input
        type="text"
        name="height"
        value={preferences.height}
        onChange={handleChange}
      />
    </div>
    <div className="form-group">
      <label>Wiek:</label>
      <input
        type="text"
        name="age"
        value={preferences.age}
        onChange={handleChange}
      />
    </div>
    <div className="form-group">
      <label>Płeć:</label>
      <select
        name="gender"
        value={preferences.gender}
        onChange={handleChange}
      >
        <option value="">Wybierz</option>
        <option value="male">Mężczyzna</option>
        <option value="female">Kobieta</option>
      </select>
    </div>
    <div className="form-group">
      <label>BMI:</label>
      <input
        type="text"
        name="bmi"
        value={preferences.bmi}
        onChange={handleChange}
      />
    </div>
    <div className="form-group">
      <label>Wybrany cel:</label>
      <select
        name="selectedGoal"
        value={preferences.selectedGoal}
        onChange={handleChange}
      >
        <option value="">Wybierz</option>
        <option value="lose">Lose</option>
        <option value="maintain">Maintain</option>
        <option value="gain">Gain</option>
      </select>
    </div>
  </form>
</UserPreferencesModal>
      </div>
    </div>
  );
};

export default UserPreferences;
