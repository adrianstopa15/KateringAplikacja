import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

Modal.setAppElement('#root');

const CateringModal = ({ isOpen, onRequestClose, mealName, mealType }) => {
    const [meals, setMeals] = useState([]);



    useEffect(() => {
        const fetchMeals = async () => {
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
            
              const response = await axios.get(
              `http://localhost:8080/showCompanyMeals?login=${login}`,
              {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
              }
            );
            setMeals(response.data);
          } catch (error) {
            console.error("Error fetching Diets:", error);
          }
        };
     
        fetchMeals();
    }, []);

    return (
      <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="catering-modal-content"
      overlayClassName="catering-modal-overlay"
  >
      <h2>Twoje {mealName}</h2>
      <button onClick={onRequestClose} className="close-button"></button>
      {meals
          .filter(meal => meal.mealType.typeId === mealType).length === 0 ? (
            <h2 className="no-meals-message">Brak dostępnych posiłków</h2>
          ) : (
            meals
            .filter(meal => meal.mealType.typeId === mealType)
            .map(meal => (
              <div key={meal.mealId} className="meal-card">
                  <div className="meal-info">
                      <h3 className="meal-name">{meal.name}</h3>
                      <p className="meal-description">{meal.description}</p>
                      <p className="meal-diet">Dieta: {meal.diet.dietName}</p>
                  </div>
                  <div className="meal-macros">
                      <p className="macro protein">Białko: {meal.macro.protein} g</p>
                      <p className="macro fat">Tłuszcze: {meal.macro.fat} g</p>
                      <p className="macro carbs">Węglowodany: {meal.macro.carbs} g</p>
                      <p className="macro calories">Kalorie: {meal.macro.calories} kcal</p>
                  </div>
              </div>
      )))}
  </Modal>
    );
};

export default CateringModal;
