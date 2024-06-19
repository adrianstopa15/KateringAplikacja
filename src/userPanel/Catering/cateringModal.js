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
            <button onClick={onRequestClose} className="close-button">&#x274C;</button>
            {meals
                .filter(meal => meal.mealType.typeId === mealType) 
                .map(meal => (
                    <ol key={meal.mealId} className="diet-container">
                        <p>Nazwa: {meal.name}</p>
                        <p>Opis: {meal.description}</p>
                        <p>Dieta: {meal.diet.dietName}</p>
                        <p>Białko: {meal.macro.protein} g</p>
                        <p>Tłuszcze: {meal.macro.fat} g</p>
                        <p>Węglowodany: {meal.macro.carbs} g</p>
                        <p>Kalorie: {meal.macro.calories} kcal</p>
                    </ol>
            ))}
        </Modal>
    );
};

export default CateringModal;
