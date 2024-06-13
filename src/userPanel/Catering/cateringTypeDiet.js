import React, { useState, useEffect } from "react";
import { useAuth } from '../../AuthContext';
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function CateringTypeDiet() {

    const [diets, setDiets] = useState([]);

    useEffect(() => {
        const handleShowDietCompany = async () => {
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
              `http://localhost:8080/showCompanyDiets?login=${login}`,
              {
                headers: {
                  Authorization: `Bearer ${authToken}`,
                },
              }
            );
            setDiets(response.data);
          } catch (error) {
            console.error("Error fetching company:", error);
          }
        };
        handleShowDietCompany();
      }, []);

      const handleDelete = async (id) => {

        const confirmDelete = window.confirm("Czy na pewno chcesz usunąć dietę?");
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
        await axios.post(`http://localhost:8080/deleteDietType?id=${id}`, {},   {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        console.log("Dieta została usunieta.");
      } catch (error) {
        console.error("Błąd przy usuwaniu diety", error);
      }}
      
    return (
      <div>
        <div className="ml-s mt-s">
          <h1 className="h1-regular mb-m">Diety: </h1>
          <div className="address-info">
          {diets.map((diet, index) => (
        <div key={`${diet.dietId} ${index}`} className="address-display--element" style={{ marginBottom: "1rem", borderColor: "#c7c7c7" }}>
          <p>Nazwa: {diet.dietName}</p>
          <p>Opis: {diet.dietDescription}</p>
          <p>Cena za dzień: {diet.priceForDay}</p>
          <p>Status: {diet.status}</p>
          <button className="button-27-d ml-s" onClick={() => handleDelete (diet.dietId)}>Usuń</button>
        </div>
      ))}
        </div>
      </div>
      </div>
    );
  }
