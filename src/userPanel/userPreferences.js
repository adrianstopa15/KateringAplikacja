import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext"; 
import axios from "axios";
import "../profilePages.css";
import { jwtDecode } from "jwt-decode";
import UserPreferencesModal from "./userPreferencesModal";

const UserPreferences = () => {
  const [preferences, setPreferences] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState(null);
  const {editPreferenceIndex, setPreferenceIndex, onEditPreferences, currentPreference } = useAuth();

  const { weight, setWeight,
    height, setHeight,
    age, setAge,
    selectedGoal, setSelectedGoal } = useAuth();
    
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

  useEffect(() => {
    if (currentPreference !== null) {
      const preference = preferences.find(c => c.preferenceId === currentPreference );
      if (preference ) {
        setWeight(preference.weight);
        setHeight(preference.height);
        setAge(preference.age);
        setSelectedGoal(preference.selectedGoal);
      }
    }
  }, [currentPreference , preferences , setWeight, setHeight, setAge, setSelectedGoal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleOpenModal = (mode) => {
    setModalMode(mode);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setModalMode(null);
    setPreferenceIndex(null);

  };

  return (
    <div>
      <div className="user-data-display ml-s mt-s">
        <h1 className="h1-regular mb-m">Preferencje</h1>
        {preferences.map((preference, index) => (
          <div key={index} className="preferences-info" >
          <p className="preference-item">Waga: {preference.weight || "Brak danych"}</p>
          <p className="preference-item">Wzrost: {preference.height || "Brak danych"}</p>
          <p className="preference-item">Wiek: {preference.age || "Brak danych"}</p>
          <p className="preference-item">Płeć: {preference.gender || "Brak danych"}</p>
          <p className="preference-item">BMI: {preference.bmi || "Brak danych"}</p>
          <p className="preference-item">Wybrany cel: {preference.selectedGoal || "Brak danych"}</p>
          <button className="button-27-e" onClick={() => { setIsOpen(true); handleOpenModal('edit'); setPreferenceIndex(index); onEditPreferences(preference.preferenceId)}}>Edytuj preferencje</button>
        </div>
        ))}
  <UserPreferencesModal open={isOpen && modalMode === 'edit'} onClose={() => handleCloseModal()}>
  {editPreferenceIndex !== null && (
    <form onSubmit={handleSubmit} className="form1">
    <div className="form-group">
      <label>Waga:</label>
      <input
        type="text"
        name="weight"
        id="weight"
        value={weight} onChange={(e) => setWeight(e.target.value)} required
      />
    </div>
    <div className="form-group">
      <label>Wzrost:</label>
      <input
        type="text"
        name="height"
        id="height"
        value={height} onChange={(e) => setHeight(e.target.value)} required
      />
    </div>
    <div className="form-group">
      <label>Wiek:</label>
      <input
        type="text"
        name="age"
        id="age"
        value={age} onChange={(e) => setAge(e.target.value)} required
      />
    </div>
    {/* <div className="form-group">
      <label>Płeć:</label>
      <select
        name="gender" id="gender" value={gender}
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
        id="bmi"
        value={bmi}
      />
    </div> */}
    <div className="form-group">
      <label>Wybierz nowy cel:</label>
      <select
        name="selectedGoal"
        id="selectedGoal"
        value={selectedGoal} onChange={(e) => setSelectedGoal(e.target.value)} required
      >
        <option value="">Wybierz</option>
        <option value="lose">Lose</option>
        <option value="maintain">Maintain</option>
        <option value="gain">Gain</option>
      </select>
    </div>
  </form>
  )}
</UserPreferencesModal>
      </div>
    </div>
  );
};

export default UserPreferences;
